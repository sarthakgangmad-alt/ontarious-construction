import { readFileSync, writeFileSync, statSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function processDir(dir) {
    const files = readdirSync(dir);
    for (const file of files) {
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = readFileSync(fullPath, 'utf8');
            let original = content;

            content = content.replace(/HT Duo Construction/gi, 'Ontarious Construction');
            content = content.replace(/HT Duo/gi, 'Ontarious Construction');
            // phone number clean up if any left
            content = content.replace(/416-555-0198/gi, '647-642-1281');
            content = content.replace(/\(416\) 555-0198/gi, '(647) 642-1281');
            content = content.replace(/4165550198/gi, '6476421281');

            if (content !== original) {
                writeFileSync(fullPath, content);
                console.log('Rebranded:', fullPath);
            }
        }
    }
}

processDir(join(__dirname, 'src'));
console.log('Rebranding complete');
