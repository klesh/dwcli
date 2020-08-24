#!/usr/bin/env node

const dw = require('digital-watermarking');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

require('yargs').command(
    'encode <text> <origin> <encoded> [size]',
    'encode hidden text into a image',
    yargs => {
        yargs.positional('text', {
            describe: 'text to be hidden' 
        }).positional('origin', {
            describe: 'path to origin image file(s), glob supported (*.jpg)'
        }).positional('encoded', {
            describe: 'saving location of the encoded image(s), can be a directory'
        }).option('size', {
            default: 2.0,
            type: 'number',
            describe: 'font size of the text'
        })
    },
    async argv => {
        const se = await fs.promises.lstat(argv.encoded);
        glob(argv.origin, async (err, files) => {
            if (err) {
                return console.error(err);
            }
            for (const file of files) {
                let encoded = argv.encoded;
                if (se.isDirectory()) {
                    encoded = path.join(encoded, path.basename(file))
                }
                await dw.transformImageWithText(file, argv.text, argv.size, encoded);
                console.log(`${file} is encoded and saved to ${encoded}`);
            }
        })
    }
).command(
    'decode <encoded> <decoded>',
    'decode an encoded image',
    yargs => {
        yargs.positional('encoded', {
            describe: 'path to encoded image(s), glob supported (*.jpg)' 
        }).positional('decoded', {
            describe: 'saving location of the decoded image, can be a directory'
        });
    },
    async argv => {
        const se = await fs.promises.lstat(argv.decoded);
        glob(argv.encoded, async (err, files) => {
            if (err) {
                return console.error(err);
            }
            for (const file of files) {
                let decoded = argv.decoded;
                if (se.isDirectory()) {
                    decoded = path.join(decoded, path.basename(file))
                }
                await dw.getTextFormImage(file, decoded);
                console.log(`${file} is decoded and saved to ${decoded}`);
            }
        })
    }
).demandCommand(1).argv