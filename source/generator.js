const pug = require('pug');
const fs = require('fs');
const ncp = require('ncp').ncp;
const config = {
    "inputPath": "./source/pages/",
    "resourcePath": "./source/recources",
    "outputPath": "./docs/"
}

// Load werxaam.json for site configuration including pricing
const werxaamConfig = JSON.parse(fs.readFileSync('./source/werxaam.json', 'utf8'));

if (!fs.existsSync(config.outputPath)){
    console.log(`${config.outputPath} directory doesn't exists, creating it`)
    fs.mkdirSync(config.outputPath);
}

ncp.limit = 16;
ncp(config.resourcePath, config.outputPath, { clobber: true }, err => {
    if (err) {
        return console.error(err);
    }
    console.log('Done copying resources !');
});

fs.readdir(config.inputPath, (err, files) => {
    if (files === undefined) throw `Could not find any files in${config.inputPath}`;

    files.forEach(fileName => {
        if (fileName.includes('.pug')) {
            let name = fileName.replace('.pug', '');
            let options = {
                name,
                pricing: werxaamConfig.pricing
            };
            let htmlRender = pug.renderFile(config.inputPath + name + '.pug', options);
        
            fs.writeFile(config.outputPath + name + '.html', htmlRender, err => {
                if (err) {
                    return console.log(err);
                }
        
                console.log(`A file was saved in ${config.outputPath + name}.html`);
            });
        }
    });
});
