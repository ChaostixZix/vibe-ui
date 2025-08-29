#!/usr/bin/env bash
set -euo pipefail

# Always run from repo root
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

echo "Setting up @vibe-kanban/ui-kit (single worktree)..."

# --- Package manager detection ---
if command -v pnpm >/dev/null 2>&1; then
  if [ -f pnpm-lock.yaml ]; then
    INSTALL_CMD=(pnpm install --frozen-lockfile)
  else
    INSTALL_CMD=(pnpm install)
  fi
  RUN_CMD=(pnpm)
  echo "Using pnpm ($(pnpm -v))"
elif command -v npm >/dev/null 2>&1; then
  INSTALL_CMD=(npm install)
  RUN_CMD=(npm run)
  echo "pnpm not found; falling back to npm ($(npm -v))"
else
  echo "Error: please install pnpm (preferred) or npm to continue." >&2
  exit 1
fi

# --- Root dependencies ---
echo "Installing root dependencies..."
"${INSTALL_CMD[@]}"

# --- Build library ---
if grep -q '"build"' package.json; then
  echo "Building library..."
  "${RUN_CMD[@]}" build
else
  echo "No build script found; skipping build."
fi

# --- Example app (if present) ---
if [ -f "example/package.json" ]; then
  echo "Installing example app dependencies..."
  pushd example >/dev/null
  if command -v pnpm >/dev/null 2>&1; then
    if [ -f pnpm-lock.yaml ]; then
      pnpm install --frozen-lockfile
    else
      pnpm install
    fi
  else
    npm install
  fi
  popd >/dev/null
else
  echo "No example app detected; skipping example install."
fi

echo "Setup complete."
echo "- To run the example: cd example && pnpm dev (or npm run dev)"
