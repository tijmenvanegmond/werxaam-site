const pug = require('pug');
const fs = require('fs');
const ncp = require('ncp').ncp;
const setupData = JSON.parse(fs.readFileSync('setup-data.json', 'utf8'));
const inputPath = setupData.inputPath || 'pages/';
const resourcePath = setupData.recourcePath || './_recources/';
const outputPath = setupData.outputPath || './output/';

ncp.limit = 16;
ncp(resourcePath, outputPath, { clobber: true }, err => {
    if (err) {
        return console.error(err);
    }
    console.log('done!');
});

fs.readdir(inputPath, (err, files) => {
    if (files === undefined) throw `Could not find any files in${inputPath}`;

    files.forEach(fileName => {
        if (fileName.includes('.pug')) {
            let name = fileName.replace('.pug', '');
            renderPage(name);
        }
    });
});

function renderPage(pageName) {
    let options = {
        name: pageName
    };
    let htmlRender = pug.renderFile(inputPath + pageName + '.pug', options);

    fs.writeFile(outputPath + pageName + '.html', htmlRender, err => {
        if (err) {
            return console.log(err);
        }

        console.log(`A file was saved in ${outputPath + pageName}.html`);
    });
}
