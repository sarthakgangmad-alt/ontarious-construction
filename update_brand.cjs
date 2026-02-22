const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function updateFile(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.html') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Brand replacements
        content = content.replace(/Ontarious Construction/g, 'Catconstruction');
        content = content.replace(/Ontarious/g, 'Catconstruction');
        content = content.replace(/ontariousconstruction\.ca/g, 'catconstruction.ca');

        // Phone replacements
        content = content.replace(/\(647\) 642-1281/g, '+1 (478) 312-7259');
        content = content.replace(/647-642-1281/g, '478-312-7259');
        content = content.replace(/6476421281/g, '4783127259');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
}

walkDir('./src', updateFile);
updateFile('./index.html');
