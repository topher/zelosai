'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { debugSecrets } from '@sanity/preview-url-secret/sanity-plugin-debug-secrets'
import { visionTool } from '@sanity/vision'
import {
  apiVersion,
  dataset,
  DRAFT_MODE_ROUTE,
  projectId,
} from '@/lib/sanity.api'
// import { locate } from 'plugins/locate'
// import { previewDocumentNode } from 'plugins/previewPane'
// import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { markdownSchema } from "sanity-plugin-markdown";
import authorType from '@/schemas/author'
import postType from '@/schemas/post'
import settingsType from '@/schemas/settings'

import {schemaTypes} from './schemas'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

console.log('Sanity Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Sanity Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    markdownSchema(),
    // structureTool({
    //   structure: settingsStructure(settingsType),
    //   // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
    //   defaultDocumentNode: previewDocumentNode(),
    // }),
    // presentationTool({
    //   locate,
    //   previewUrl: {
    //     draftMode: {
    //       enable: DRAFT_MODE_ROUTE,
    //     },
    //   },
    // }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    // settingsPlugin({ type: settingsType.name }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // The remaining plugins are only loaded in dev mode
    process.env.NODE_ENV !== 'production' && debugSecrets(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV !== 'production' &&
      visionTool({ defaultApiVersion: apiVersion }),
  ],
})
