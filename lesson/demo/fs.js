import {__filename, __dirname} from './path.js'

import fs from 'fs'
import path from 'path'

// Создать папку
fs.mkdir(path.join(__dirname, 'test'), (err) => {   //всегда err - ошбика
    if (err) {                     
        throw err                 // если ошибка то выкидывает ее
    }
    console.log('Папка создана')
})

// Создать файл
const filePath = path.join(__dirname, 'test', 'text.txt')
fs.writeFile(filePath, 'Hello NodeJS', err => {  // при повторном использовании перезаписывает существующий файл, а для изменения использовать метод .appendFile
    if (err) {
        throw err
    }
    console.log('Файл создан')
})

// Чтение файл
fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        throw err
    }
   
    console.log('Content:', content)
})