#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${CF_PAGES_PROJECT_NAME:-erpmvp}"
DIST_DIR="${CF_PAGES_DIST_DIR:-out}"

echo "Building static site..."
npm run build

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Error: build output directory '$DIST_DIR' not found."
  echo "Expected Next.js static export output in '$DIST_DIR'."
  exit 1
fi

echo "Deploying '$DIST_DIR' to Cloudflare Pages project '$PROJECT_NAME'..."
npx wrangler pages deploy "$DIST_DIR" --project-name "$PROJECT_NAME"

echo "Deploy complete."
