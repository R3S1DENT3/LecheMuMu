import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const outDir = path.join(rootDir, 'standalone');

if (!fs.existsSync(distDir)) {
  console.error('Error: primero ejecuta "npm run build" para generar los estilos compilados en dist/.');
  process.exit(1);
}

// Find compiled Tailwind CSS in dist/assets
const distAssetsDir = path.join(distDir, 'assets');
const cssFile = fs.readdirSync(distAssetsDir).find((f) => f.endsWith('.css'));
if (!cssFile) {
  console.error('Error: no se encontró archivo CSS compilado en dist/assets.');
  process.exit(1);
}
const compiledCss = fs.readFileSync(path.join(distAssetsDir, cssFile), 'utf8');

// Helper to convert asset files to base64 data URIs
function fileToDataUri(filePath, mimeType) {
  const buf = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

const faviconPath = path.join(rootDir, 'public', 'favicon.ico');
const faviconDataUri = fs.existsSync(faviconPath)
  ? fileToDataUri(faviconPath, 'image/jpeg')
  : '';

// Bundle React app as a single IIFE script (works on file:// without CORS errors)
const result = await build({
  entryPoints: [path.join(rootDir, 'src', 'main.tsx')],
  bundle: true,
  write: false,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  loader: {
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl',
    '.jfif': 'dataurl',
    '.png': 'dataurl',
    '.svg': 'dataurl',
  },
  plugins: [
    {
      name: 'ignore-css-imports',
      setup(pluginBuild) {
        pluginBuild.onResolve({ filter: /\.css$/ }, (args) => ({
          path: args.path,
          namespace: 'empty-css',
        }));
        pluginBuild.onLoad({ filter: /.*/, namespace: 'empty-css' }, () => ({
          contents: '',
          loader: 'js',
        }));
      },
    },
  ],
});

let jsCode = result.outputFiles[0].text;

// Inline public/assets/aistudio/* references (images and PDFs) into data URIs
const publicAistudioDir = path.join(rootDir, 'public', 'assets', 'aistudio');
const assetMap = {
  './assets/aistudio/Gemini_Generated_Image_pb5cb0pb5cb0pb5c_48055192.jfif': 'image/jpeg',
  './assets/aistudio/Gemini_Generated_Image_qaebvhqaebvhqaeb_5816d2d2.jfif': 'image/jpeg',
  './assets/aistudio/Gemini_Generated_Image_skdgfskdgfskdgfs_8e80508e.jfif': 'image/jpeg',
  './assets/aistudio/Gemini_Generated_Image_b9crz8b9crz8b9cr_129b4594.jfif': 'image/jpeg',
  './assets/aistudio/Fichas_T_cnicas_MU-MU_9eb3afcc.pdf': 'application/pdf',
  './assets/aistudio/Ventas_a_Mayoreo_y_Log_stica_MU-MU_6147501a.pdf': 'application/pdf',
};

for (const [relPath, mime] of Object.entries(assetMap)) {
  const fileName = path.basename(relPath);
  const absPath = path.join(publicAistudioDir, fileName);
  if (fs.existsSync(absPath)) {
    const dataUri = fileToDataUri(absPath, mime);
    // Replace exact path (and with #page=N fragments handled seamlessly on Blob click helper)
    jsCode = jsCode.split(relPath).join(dataUri);
  }
}

// Escape </script> inside bundled JS just in case
const safeJsCode = jsCode.replace(/<\/script>/gi, '<\\/script>');

// Helper script so data:application/pdf links also open cleanly in a new tab on Chrome/Edge over file://
const pdfBlobHelper = `
(function(){
  document.addEventListener('click', function(e) {
    var link = e.target && e.target.closest ? e.target.closest('a[href^="data:application/pdf"]') : null;
    if (!link) return;
    if (link.hasAttribute('download')) return;
    e.preventDefault();
    try {
      var href = link.getAttribute('href') || '';
      var parts = href.split('#');
      var hash = parts[1] ? '#' + parts[1] : '';
      var base64 = parts[0].split(',')[1];
      var bin = atob(base64);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      var blobUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })) + hash;
      link.setAttribute('data-blob-converted', '1');
      var temp = document.createElement('a');
      temp.href = blobUrl;
      temp.target = '_blank';
      temp.rel = 'noopener noreferrer';
      document.body.appendChild(temp);
      temp.click();
      document.body.removeChild(temp);
    } catch (err) {
      console.error(err);
    }
  });
})();
`;

const html = `<!doctype html>
<html lang="es" class="h-full scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mu-Mu Lácteos | Lácteos Puros del Campo para Toda la Familia</title>
    <meta name="description" content="En Mu-Mu elaboramos con dedicación leche entera pasteurizada 100% de vaca, cremoso yogurt bebible con fresas naturales y auténtico queso panela fresco en Celaya, Guanajuato." />
    ${faviconDataUri ? `<link rel="icon" href="${faviconDataUri}" />` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>${compiledCss}</style>
  </head>
  <body class="min-h-full bg-white text-slate-900 antialiased selection:bg-[#f06282] selection:text-white">
    <div id="root" class="min-h-full"></div>
    <script>${safeJsCode}</script>
    <script>${pdfBlobHelper}</script>
  </body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'mumu-autocontenido.html');
fs.writeFileSync(outFile, html, 'utf8');
const sizeMB = (fs.statSync(outFile).size / (1024 * 1024)).toFixed(2);
console.log(`Versión autocontenida generada en ${outFile} (${sizeMB} MB)`);
