import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readdir, copyFile, constants } from 'fs/promises';
import fse from 'fs-extra'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsPath = path.join(__dirname, 'assets');
const htmlPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const mergeHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
const templatePath = path.join(__dirname, 'template.html');
const assetsProject = path.join(__dirname, 'project-dist', 'assets')
const style = path.join(__dirname, 'project-dist', 'style.css');

// Создает сборку проекта в папке project-dist
const htmlFiles = await readdir(htmlPath, {withFileTypes: true});
const stylesFiles = await readdir(stylesPath, {withFileTypes: true});

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {  
    if (err) {                     
        throw err                 
    }
})

fs.writeFile(mergeHtmlPath, '', (err) => {  
    if (err) {                     
        throw err                 
    }
})

fs.readFile(templatePath, 'utf-8', (err, content) => {
    let i = 0;
    let html = content;

    for (const file of htmlFiles) {
        const filePath = path.join(__dirname, 'components', `${file.name}`);
        fs.readFile(filePath, 'utf-8', (err, subContent) => {
            html = html.replace(`{{${file.name.replace(/\.[^/.]+$/, "")}}}`, subContent);
        i++;
        if(i == htmlFiles.length) {
            fs.appendFile(mergeHtmlPath, `${html}`, err => {  
                if (err) {
                    throw err
                }
            })
        }
        })
    }
})
   
fs.writeFile(style, '', (err) => {  
    if (err) {                     
        throw err                 
    }
})

for (const file of stylesFiles) {
    const filePath = path.join(__dirname, 'styles', `${file.name}`);
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (path.extname(filePath) == '.css') {
            fs.appendFile(style, `${content}\n`, err => {  
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

fs.mkdir(assetsProject, {recursive: true}, (err) => {  
    if (err) {                     
        throw err                 
    }
})

fse.copySync(assetsPath, assetsProject, {
    overwrite: true
  }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
});

