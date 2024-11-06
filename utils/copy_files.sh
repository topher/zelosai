#!/bin/bash

# Set source and destination directories
BLOG_SOURCE="../blog-nextjs-sanity"
DESTINATION="."

# Function to copy files and create directories if they don't exist
copy_files() {
  local src_dir="$1"
  local dest_dir="$2"

  mkdir -p "$dest_dir"
  cp -r "$src_dir"/* "$dest_dir"
}

# Copy lib files
copy_files "$BLOG_SOURCE/lib" "$DESTINATION/lib"

# Copy components to app/blog/components
copy_files "$BLOG_SOURCE/components" "$DESTINATION/app/blog/components"

# Copy schemas to root
copy_files "$BLOG_SOURCE/schemas" "$DESTINATION/schemas"

# Copy configuration files to root
cp "$BLOG_SOURCE/sanity.config.ts" "$DESTINATION/sanity.config.ts"
cp "$BLOG_SOURCE/sanity.cli.ts" "$DESTINATION/sanity.cli.ts"

# Copy public assets
copy_files "$BLOG_SOURCE/public" "$DESTINATION/public"

# Echo completion message
echo "Files have been successfully copied."