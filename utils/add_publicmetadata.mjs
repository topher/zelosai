import { NextResponse } from 'next/server.js'
import { clerkClient } from '@clerk/nextjs/server.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .option('role', {
    alias: 'r',
    description: 'User role',
    type: 'string',
    default: 'default_role'
  })
  .option('userId', {
    alias: 'u',
    description: 'User ID',
    type: 'string',
    default: 'default_user_id'
  })
  .help()
  .alias('help', 'h')
  .parseSync()

export async function POST() {
  const { role, userId } = argv

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    })
    console.log(`Updated user ${userId} with role ${role}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user metadata:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// Execute the POST function if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  POST().then((response) => console.log(response))
}