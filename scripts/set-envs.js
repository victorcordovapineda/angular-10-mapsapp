const { writeFileSync, mkdirSync } = require('fs');
require('dotenv').config();

const target_path = 'src/environments/environment.ts';

const envFileContent = `

    export const environment = {
        mapbox_key:"${process.env['MAPBOX_KEY']}",
        otra:"PROPIEDAD",
    }

`;


mkdirSync('./src/environments', { recursive: true });
writeFileSync(target_path, envFileContent);

