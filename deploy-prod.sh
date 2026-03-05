#!/usr/bin/env bash
set -e

APP_NAME="joybormi"
ARCHIVE="$APP_NAME.tar.gz"

SSH_USER="momenti"
SSH_HOST="16.184.0.25"
APP_DIR="/home/momenti/web"

if [ ! -f "$ARCHIVE" ]; then
  echo "❌ Archive not found: $ARCHIVE"
  exit 1
fi

echo "▶ Removing old archive"
ssh "$SSH_USER@$SSH_HOST" "rm -f $APP_DIR/$ARCHIVE"

echo "▶ Uploading archive"
scp "$ARCHIVE" "$SSH_USER@$SSH_HOST:$APP_DIR/"

echo "▶ Deploying on server"
ssh -tt "$SSH_USER@$SSH_HOST" << EOF
set -e
cd $APP_DIR

echo "▶ Stopping app"
pm2 stop $APP_NAME || true

echo "▶ Cleaning old files"
rm -rf .next public package.json bun.lockb

echo "▶ Extracting new build"
tar -xzf $ARCHIVE

echo "▶ Installing production deps"
bun install

echo "▶ Starting app"
pm2 start ecosystem.config.cjs || pm2 restart ecosystem.config.cjs
pm2 save
EOF

echo "✅ Deploy finished"
