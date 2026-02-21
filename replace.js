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

            // Backgrounds
            content = content.replace(/\bbg-white\b/g, 'bg-[#0f0916]');
            content = content.replace(/\bbg-slate-50\b/g, 'bg-[#150d1e]');
            content = content.replace(/\bbg-gray-50\b/g, 'bg-[#150d1e]');
            content = content.replace(/\bbg-\[\#0F2B46\]/g, 'bg-[#1a0f26]');
            content = content.replace(/\bbg-\[\#0F2B46\]\/5\b/g, 'bg-[#1a0f26]/50');
            content = content.replace(/\bbg-white\/95\b/g, 'bg-[#0f0916]/95');

            // Text colors
            content = content.replace(/\btext-slate-600\b/g, 'text-slate-300');
            content = content.replace(/\btext-slate-800\b/g, 'text-slate-100');
            content = content.replace(/\btext-slate-500\b/g, 'text-slate-400');
            content = content.replace(/\btext-\[\#0F2B46\]/g, 'text-white');
            content = content.replace(/\berr/g, 'err'); // no-op

            if (content !== original) {
                writeFileSync(fullPath, content);
                console.log('Updated:', fullPath);
            }
        }
    }
}

processDir(join(__dirname, 'src'));
console.log('Done');
