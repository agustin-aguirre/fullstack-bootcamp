/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from 'fs'
import { input, select } from '@inquirer/prompts';
import qr from 'qr-image'

const url = await input({ message: 'Enter an url:' });
const format = await select({ message: "Pick the output type:", choices: ["png", "svg", "eps", "pdf"]})
const outputName = `${url}.${format}`;
const qrImage = qr.image(url, { type: format });
qrImage.pipe(fs.createWriteStream(outputName));

console.log(`Outputed file @ ./${outputName}`);