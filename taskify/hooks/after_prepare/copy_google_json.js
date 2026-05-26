const fs = require('fs');

const src = 'google-services.json';
const dest = 'platforms/android/app/google-services.json';

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('✔ google-services.json copiado');
}