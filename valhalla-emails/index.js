const fs = require('fs/promises');
const path = require('path');
const mjml = require('mjml');

async function destinationExists() {
    try {
        await fs.access(path.resolve('target/classes/templates'));
    } catch (err) {
        await fs.mkdir(path.resolve('target/classes/templates'), { recursive: true });
    }
}

async function convertMjml() {
    const files = await fs.readdir(path.resolve('src'), { encoding: 'utf-8' });
    for (const file of files) {
        const template = await fs.readFile(path.resolve(`src/${file}`), {
            encoding: 'utf-8',
        });
        const { html } = mjml(template);
        const filename = file.replace('.mjml', '.ftlh');
        await fs.writeFile(path.resolve(`target/classes/templates/${filename}`), html, { encoding: 'utf-8' });
    }
}

(async function() {
    await destinationExists();
    await convertMjml();
    process.exit(0);
})()
