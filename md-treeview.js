

var fs = require('fs');
var path = require('path');

var SOURCE_DIR = './src/app/docs';
var TARGET_FILE_PATH = './src/assets/data/tree-view.json';
var CODE_SNIPPETS_PATH = './src/app/code-snippets.ts';

fs.writeFile('helloworld.txt', 'Hello World!', (err) => {
    if (err) return console.log(err);
    console.log('Cleaning up before writing to file...'); 
});

var snippetsMap = {};
var logger = fs.createWriteStream(CODE_SNIPPETS_PATH, {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

logger.write('declare var require:any;\n');
logger.write('export const CODE_SNIPPETS=\{\n');

function dirTree(filename) {

    var stats = fs.lstatSync(filename),
        info = {
            path: filename.replace(/^\.\/src\/app/, '.'),
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename)
            .filter( child => !/\.(css|spec.ts)$/.test(child))
            .map((child) => dirTree(filename + '/' + child));
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";  
        let codeSnippetPath = info.path.replace(/\.ts$/, '');
        logger.write('"'+info.path+'"'+':'+"require('"+codeSnippetPath+"'),\n");
    }

    return info;
}

var jsonView = dirTree(SOURCE_DIR);
    logger.end('}');

var treeView = JSON.stringify(jsonView, null, 2);

fs.writeFile(TARGET_FILE_PATH, treeView, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("Json is created for the directory: ", SOURCE_DIR);
});