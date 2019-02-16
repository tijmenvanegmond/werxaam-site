const pug = require('pug');
const fs = require('fs');
const setupData = JSON.parse(fs.readFileSync('setup-data.json', 'utf8'));
const inputPath = setupData.inputPath;
const outputPath = setupData.outputPath;

fs.readdir(inputPath, (err, files) => {
    if(files === undefined)    
        throw(`Could not find any files in${inputPath}`);

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

        console.log(`A file was saved in ${outputPath}${pageName}.html`);

    })
};