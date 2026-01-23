const pug = require('pug');
const fs = require('fs');
const ncp = require('ncp').ncp;
const config = {
    "inputPath": "./source/pages/",
    "resourcePath": "./source/recources",
    "outputPath": "./docs/"
}

// Load werxaam.json for site configuration including pricing
let werxaamConfig;
try {
    werxaamConfig = JSON.parse(fs.readFileSync('./source/werxaam.json', 'utf8'));
    if (!werxaamConfig.pricing) {
        console.warn('Warning: No pricing configuration found in werxaam.json, using defaults');
        werxaamConfig.pricing = { houtKuubPrice: 165, houtStapelenPrice: 20 };
    }
} catch (error) {
    console.error('Error loading werxaam.json:', error.message);
    console.warn('Using default pricing values');
    werxaamConfig = { pricing: { houtKuubPrice: 165, houtStapelenPrice: 20 } };
}

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
