import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readdir, copyFile, constants } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirPath = path.join(__dirname, 'files');

// Создает папку files-copy и копирует содержимое папки files в нее
const files = await readdir(dirPath, {withFileTypes: true});

(function copyDir() {
   
        fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {  
            if (err) {                     
                throw err                 
            }
        })
        
        for (const file of files) {
            const filePath = path.join(__dirname, 'files', `${file.name}`);
            const filePathCopy = path.join(__dirname, 'files-copy', `${file.name}`);
            if(file.isFile()) {
                fs.copyFile(filePath, filePathCopy, (err) => {
                    if(err) {
                        console.log(err);
                    }
                })
            }
        } 
        console.log('Copying completed')
})();