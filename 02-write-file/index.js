import fs from 'fs'
import path from 'path'
import rl from 'readline'
import process from 'process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'text.txt')

//  Сохранения текста пользовательского ввода в файл text

const read = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Waiting for input')
read.on('line', (line) => {
    if(line == 'exit') {
        console.log('Input completion') ;
        read.close()} 
    else fs.appendFile(filePath, line, err => {  
        if (err) {
            throw err
        }
    })
});

