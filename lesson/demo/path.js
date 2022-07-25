// ОБХОД ТРАБЛОВ c __filename и __dirname  В ESM
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {__filename, __dirname}
// 

import path from 'path'

// Получение информации
console.log('Имя файла:', path.basename(__filename))
console.log('Имя дирректории:', path.dirname(__filename))
console.log('Расширение файла:', path.extname(__filename))
console.log('Parse:', path.parse(__filename))
console.log('Parse:', path.parse(__filename).name)
console.log(path.join(__dirname, 'server', 'index.html'))