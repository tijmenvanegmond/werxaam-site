const pug = require('pug');
//filesystem
const fs = require('fs');
const inputPath = "./pages/";
const outputPath = "../output/";


fs.readdir(inputPath, (err, files) => {
    files.forEach(fileName => {
        if (fileName.includes(".pug")) {
            let name = fileName.replace(".pug","")
            renderPage(name);
        }
    });
})

function renderPage(pageName) {
    let htmlRender = pug.renderFile(`${inputPath}${pageName}.pug`);

    fs.writeFile(`${outputPath}${pageName}.html`, htmlRender, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log(`A file was saved @${outputPath}${pageName}.html`);

    })
};