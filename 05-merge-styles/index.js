import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readdir, copyFile, constants } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirPath = path.join(__dirname, 'styles');

// Обьединяет все css файлы в папке styles в новый файл bundle.css в папке project-dist
const files = await readdir(dirPath, {withFileTypes: true});
const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
   
fs.writeFile(bundle, '', (err) => {  
    if (err) {                     
        throw err                 
    }
})

for (const file of files) {
    const filePath = path.join(__dirname, 'styles', `${file.name}`);
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (path.extname(filePath) == '.css') {
            fs.appendFile(bundle, `${content}\n`, err => {  
                if (err) {
                    throw err
                }
            })
        }

        if (err) {
            throw err
        }
    })
} 
