// utils/createDemoUsers.mjs
import fs from 'fs';
import path from 'path';
import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Clerk client with environment variable
const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

// Path to demo users JSON file
const demoUsersFile = path.join(process.cwd(), 'json-output', 'users.json');

/**
 * Interface for demo users (for reference)
 * 
 * interface DemoUser {
 *   email: string;
 *   password: string;
 *   privateMetadata: Record<string, any>;
 *   roles: string[];
 * }
 */

async function createDemoUsers() {
  try {
    const usersData = JSON.parse(fs.readFileSync(demoUsersFile, 'utf-8'));

    for (const user of usersData) {
      // Check if user already exists
      const existingUsers = await clerk.users.getUserList({
        emailAddress: [user.email],
        limit: 1,
      });

      if (existingUsers.length > 0) {
        console.log(`ℹ️  User "${user.email}" already exists. Skipping.`);
        continue;
      }

      // Create user
      const newUser = await clerk.users.createUser({
        emailAddress: [user.email],
        password: user.password,
        privateMetadata: user.privateMetadata,
        publicMetadata: {},
        roles: user.roles,
      });

      console.log(`✅ Created user: "${user.email}" with userId: "${newUser.id}"`);
    }

    console.log('🎉 All demo users have been created successfully.');
  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  }
}

// Execute the script
createDemoUsers();
