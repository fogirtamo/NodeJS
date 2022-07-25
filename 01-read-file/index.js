import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
//Вывод в консоль содержимого файла text

const filePath = path.join(__dirname, 'text.txt')

let stream = new fs.ReadStream(filePath, {encoding: 'utf-8'});
 
stream.on('readable', function(){
    let data = stream.read();
    if(data != null) console.log(data);
    
});
 
stream.on('error', function(err){
    if(err.code == 'ENOENT') {
        console.log('Файл не найден')
    } else console.error(err); 
    
});