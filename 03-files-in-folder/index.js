import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readdir, copyFile, constants } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirPath = path.join(__dirname, 'secret-folder');

// Выводит информацию о файлах в папке secret-folder в формате (имя файла - расширение - размер)
try {
    const files = await readdir(dirPath, {withFileTypes: true});
    for (const file of files) {
        const filePath = path.join(__dirname, 'secret-folder', `${file.name}`);
        
        if(file.isFile()) {
            fs.stat(filePath, (err, stats) => {
                console.log(
                `${file.name.replace(/\.[^/.]+$/, "")} 
                - ${path.extname(filePath).slice(1)} 
                - ${(stats.size / 1024).toFixed(3)}kb`
                )
            });
        }
    } 
  } catch (err) {
    console.error(err);
  }