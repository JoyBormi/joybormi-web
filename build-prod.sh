#!/usr/bin/env bash
set -e

APP_NAME="joybormi"
ARCHIVE="$APP_NAME.tar.gz"

echo "▶ Installing deps"
bun install --frozen-lockfile

echo "▶ Building Next.js"
bun run build

echo "▶ Creating production archive"
rm -f "$ARCHIVE"

# macOS-safe tar (no xattrs)
COPYFILE_DISABLE=1 tar -czf "$ARCHIVE" \
  .next \
  public \
  package.json \
  bun.lock \
  next.config.ts \
  ecosystem.config.cjs

echo "✅ Build complete: $ARCHIVE"
