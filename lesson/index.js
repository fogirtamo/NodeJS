// import chalk from 'chalk'
// import text from './data.js'

// console.log(chalk.blue(text))




// Создание собственного веб-сервера
import http from 'http'
import fs, { fstat } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const server = http.createServer((req, res) => {

    // console.log(req.url)     // адрес страницы на которую делаем запрос

    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //         if (err) {
    //             throw err
    //         }

    //         res.writeHead(200, {
    //             'Content-Type': 'text/html' // если вместо html указать plain то хром не будет парсить и выведет просто текст
    //         })
    //         res.end(data)
    //     })
    // } else if (req.url === '/chlemodan') {
    //     fs.readFile(path.join(__dirname, 'public', 'chlemodan.html'), (err, data) => {
    //         if (err) {
    //             throw err
    //         }

    //         res.writeHead(200, {
    //             'Content-Type': 'text/html' // если вместо html указать plain то хром не будет парсить и выведет просто текст
    //         })
    //         res.end(data)
    //     })
    // }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    const ext = path.extname(filePath) // присваиваем расширение файла
    let contentType = 'text/html'
    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType =  'text/javascript'
            break
        default:
            contentType = 'text/html'
    }
    if (!ext) filePath += '.html'       // если нет, то добавляем (чтобы не было ошибки)

    console.log(filePath)

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data)
                }
            })
        } else {
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content)
        }
    })
})

const PORT = process.env.PORT || 3000     //считывает текущий порт

server.listen(3000, () => {                 // 1-ый аргумент - порт
    console.log(`Server has been started on ${PORT}...`)
})