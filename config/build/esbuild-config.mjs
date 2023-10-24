import ESBuild from 'esbuild';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

ESBuild.build({
  outdir: path.resolve(__dirname, '..', '..', 'build'),
  entryPoints: [path.resolve(__dirname, '..', '..', 'src', 'index.tsx')],
  entryNames: 'index',
  bundle: true,
  minify: false,
  loader: {
    '.js': 'jsx',
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
    '.webp': 'file',
  },
  sourcemap: true,
})
