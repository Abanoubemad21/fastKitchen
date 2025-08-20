const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['js/homescript.ts', 'js/favorites.ts'],
  bundle: true,
  platform: 'node',
  target: 'node16',
  outdir: 'js/dist',
  format: 'cjs',
  external: [
    'express',
    'body-parser',
    'cookie-signature',
    'etag',
    'iconv-lite',
    'mime-types',
    'router',
    'safe-buffer',
    'safer-buffer',
    'send',
    'serve-static',
    'content-disposition'
  ]
};

if (isWatch) {
  // Watch mode
  esbuild.context(buildOptions).then(context => {
    context.watch();
    console.log('Watching for changes...');
  }).catch(() => process.exit(1));
} else {
  // Single build
  esbuild.build(buildOptions).catch(() => process.exit(1));
}