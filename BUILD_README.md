# Build Configuration

This project uses esbuild to compile TypeScript files and resolve Node.js module dependencies.

## Problem Solved

The original error was caused by the bundler trying to bundle Node.js built-in modules (like `node:zlib`, `node:http`, `crypto`, `fs`, etc.) for the browser. These modules are built into Node.js and shouldn't be bundled.

## Solution

The `esbuild.config.js` file is configured with:
- `platform: 'node'` - Tells esbuild this is a Node.js application
- `external: [...]` - Lists packages that should not be bundled
- Proper entry points for TypeScript files

## Usage

### Install dependencies
```bash
npm install
```

### Build once
```bash
npm run build
```

### Build with watch mode (for development)
```bash
npm run dev
```

### Build with watch mode (alternative)
```bash
npm run build:watch
```

## Output

Compiled files are output to `js/dist/`:
- `homescript.js` - Compiled from `js/homescript.ts`
- `favorites.js` - Compiled from `js/favorites.ts`

## Configuration Files

- `esbuild.config.js` - Main build configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Key Settings

The build configuration includes:
- Platform set to 'node' to handle Node.js built-ins
- External packages excluded from bundling
- TypeScript support with proper target and format
- Watch mode for development