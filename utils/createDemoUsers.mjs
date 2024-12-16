// utils/createDemoUsers.mjs

import fs from 'fs';
import path from 'path';
import { Clerk } from '@clerk/clerk-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Clerk client with environment variable
const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

// Paths to demo users and organizations JSON files
const demoUsersFile = path.join(process.cwd(), 'json-output', 'users.json');
const demoOrgsFile = path.join(process.cwd(), 'json-output', 'organizations.json');

/**
 * Interface for demo users (for reference)
 * 
 * interface DemoUser {
 *   email: string;
 *   password: string;
 *   privateMetadata: Record<string, any>;
 *   publicMetadata: Record<string, any>;
 *   roles: string[]; // Example: ['admin', 'member']
 * }
 */

/**
 * Interface for demo organizations (for reference)
 * 
 * interface DemoOrganization {
 *   orgId: string;
 *   name: string;
 *   slug: string;
 *   description: string;
 *   privateMetadata: Record<string, any>;
 * }
 */

async function createDemoData() {
  try {
    // Read and parse organizations data
    const orgsData = JSON.parse(fs.readFileSync(demoOrgsFile, 'utf-8'));

    // Create organizations
    const orgsMap = {}; // Map to store created organizations by orgId
    for (const org of orgsData) {
      const newOrg = await clerk.organizations.createOrganization({
        name: org.name,
        slug: org.slug,
        publicMetadata: org.publicMetadata || {},
        privateMetadata: org.privateMetadata || {},
      });
      orgsMap[org.orgId] = newOrg;
      console.log(`✅ Created organization: "${org.name}" with orgId: "${newOrg.id}"`);
    }

    // Read and parse users data
    const usersData = JSON.parse(fs.readFileSync(demoUsersFile, 'utf-8'));

    for (const user of usersData) {
      // Check if user already exists
      const existingUsers = await clerk.users.getUserList({
        emailAddress: [user.email],
        limit: 1,
      });

      let userId;

      if (existingUsers.length > 0) {
        console.log(`ℹ️  User "${user.email}" already exists. Skipping creation.`);
        userId = existingUsers[0].id;
      } else {
        // Create user
        const newUser = await clerk.users.createUser({
          emailAddress: [user.email],
          password: user.password,
          privateMetadata: user.privateMetadata || {},
          publicMetadata: user.publicMetadata || {},
        });
        userId = newUser.id;
        console.log(`✅ Created user: "${user.email}" with userId: "${newUser.id}"`);
      }

      // Add user to organizations
      if (user.privateMetadata?.orgIds) {
        for (const orgId of user.privateMetadata.orgIds) {
          const org = orgsMap[orgId];
          if (org) {
            await clerk.organizations.addMember(org.id, {
              userId,
              role: user.roles?.includes('admin') ? 'admin' : 'member', // Assign role based on user's roles array
            });
            console.log(`👥 Added user "${user.email}" to organization "${org.name}" as "${user.roles?.includes('admin') ? 'admin' : 'member'}"`);
          } else {
            console.warn(`⚠️ Organization with orgId "${orgId}" not found. Cannot add user "${user.email}" to this organization.`);
          }
        }
      }
    }

    console.log('🎉 All demo data has been created successfully.');
  } catch (error) {
    console.error('❌ Error creating demo data:', error);
  }
}

// Execute the script
createDemoData();
