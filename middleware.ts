// middleware.ts

import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserAttributes } from '@/lib/auth';
import { evaluateAccess } from '@/lib/policyEvaluation';
import { checkFeatureLimit } from '@/lib/limits';
import { deductCreditsAndIncrementUsage } from '@/lib/credits';
import { logUserAction } from '@/lib/logging';
import { FeatureKey } from '@/config/featuresConfig';
import { featureRoutes, FeatureCategory } from '@/config/featureRoutes';
import { getFeatureKey } from '@/lib/resourceMapping'; // Ensure correct import path

// Helper function to map HTTP methods to actions
function getActionFromMethod(method: string): string {
    const actionMap: Record<string, string> = {
        GET: 'read',
        POST: 'create',
        PUT: 'update',
        PATCH: 'update',
        DELETE: 'delete',
    };
    return actionMap[method] || 'read';
}

// Function to determine if a route requires resource-based access control
function requiresResourceCheck(pathname: string): boolean {
    // Define routes that have associated resources
    const resourceRoutes = [
        '/api/resource/', // e.g., /api/resource/[resourceName]/[resourceId]
        '/api/profiles/', // e.g., /api/profiles/[type]/[id]
        // Add other routes that involve resources
    ];

    return resourceRoutes.some(route => pathname.startsWith(route));
}

// Extract resource details from the pathname
function extractResourceDetails(pathname: string): { resourceName: string; resourceId: string } | null {
    const resourceRegex = /^\/api\/resource\/([^\/]+)\/([^\/]+)$/;
    const match = pathname.match(resourceRegex);
    if (match) {
        return {
            resourceName: match[1],
            resourceId: match[2],
        };
    }
    return null;
}

// Middleware Configuration
export default withClerkMiddleware(async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const method = req.method;

    // Define public routes
    const publicRoutes = [
        '/',
        '/sign-in',
        '/sign-up',
        '/api/public/',
        // Add other public routes if any
    ];

    // Allow public routes without further authentication
    for (const route of publicRoutes) {
        if (pathname.startsWith(route)) {
            return NextResponse.next();
        }
    }

    // Fetch user attributes using Clerk's getAuth
    const { userId, sessionId, getToken } = getAuth(req);
    if (!userId) {
        // Redirect unauthenticated users to sign-in
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // You can fetch additional user attributes here if needed
    const userAttributes = await getUserAttributes(req);
    const { orgId, orgRole, subscription } = userAttributes;

    // Determine the action based on HTTP method
    const action = getActionFromMethod(method);

    // Determine if the route requires resource-based access control
    const isResourceRoute = requiresResourceCheck(pathname);
    let resourceName = '';
    let resourceId = '';

    if (isResourceRoute) {
        const resourceDetails = extractResourceDetails(pathname);
        if (resourceDetails) {
            resourceName = resourceDetails.resourceName;
            resourceId = resourceDetails.resourceId;
        }
    } else {
        // For non-resource routes, map to feature keys based on featureRoutes
        const featureKey = getFeatureKey(action, resourceName);
        if (!featureKey) {
          console.error(`No FeatureKey mapping found for action: ${action}, resourceType: ${resourceName}`);
          return NextResponse.json({ error: 'Invalid Feature' }, { status: 400 });
        }
        
        const creditsDeducted = await deductCredits({ 
          userId, 
          action, 
          resourceType: resourceName, 
          feature: featureKey, 
          subscriptionId: subscription.subscriptionId 
        });
        

            if (creditsDeducted === false) {
                return NextResponse.redirect(new URL('/insufficient-credits', req.url));
            }

            // Log user action
            await logUserAction({
                userId,
                action,
                resourceType: getResourceTypeFromFeatureKey(featureKey), // Ensure consistency
                resourceId: '', // No specific resource ID
                creditsUsed: creditsDeducted,
                timestamp: new Date(),
            });
    }

    // If it's a resource route, perform access control
    if (isResourceRoute && resourceName && resourceId) {
        // Check access based on policies
        const accessGranted = await evaluateAccess({
            userId,
            action,
            resourceId,
            resourceType: resourceName,
            userAttributes,
            subscription,
        });

        if (!accessGranted) {
            return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
        }

        // Map action and resourceType to FeatureKey
        const featureKey = getFeatureKey(action, resourceName);
        if (!featureKey) {
            console.error(`No FeatureKey mapping found for action: ${action}, resourceType: ${resourceName}`);
            return NextResponse.json({ error: 'Invalid Feature' }, { status: 400 });
        }

        // Check feature limit and deduct credits
        const canProceed = await checkFeatureLimit({ userId, feature: featureKey });
        if (!canProceed) {
            return NextResponse.json({ error: 'Feature limit reached' }, { status: 403 });
        }

        const creditsDeducted = await deductCredits({
            userId,
            action,
            resourceType: resourceName,
            feature: featureKey,
            subscriptionId: subscription.subscriptionId
        });

        if (creditsDeducted === false) {
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
        }

        // Log user action
        await logUserAction({
            userId,
            action,
            resourceType: resourceName,
            resourceId,
            creditsUsed: creditsDeducted,
            timestamp: new Date(),
        });
    }

    // Allow the request to proceed
    return NextResponse.next();
});


// Helper Function to Extract Resource Type from FeatureKey
function getResourceTypeFromFeatureKey(featureKey: FeatureKey): string {
    // Implement this based on your FeatureKey naming conventions
    // Example: 'read:profiles' -> 'profiles'
    const parts = featureKey.split(':');
    return parts.length > 1 ? parts[1] : '';
}

// Middleware Matcher Configuration
export const config = {
    matcher: [
        '/((?!api/public|_next/static|_next/image|favicon.ico).*)', // Frontend routes
        '/api/protected/(.*)', // Protected API routes
        '/api/resource/(.*)', // Resource API routes
        '/api/profiles/(.*)', // Profiles API routes
        '/api/predicates/(.*)', // Predicates API routes
        '/api/search', // Search API route
    ],
};
