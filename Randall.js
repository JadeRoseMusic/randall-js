const phrases = require('./phrases.json')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const names = require('./names.json');

// names.filter(name => name.includes('banana'))

console.log('fishing from ' + names.length + ' packages...');

function randomValue(array){
    return array[Math.floor(Math.random() * array.length)];
}

const randomPackage = randomValue(names);

async function getSearch(command) {
    const output = await exec(command);
    if (output.stdout) {
    var trimmed = JSON.parse(output.stdout.trim());
    console.log();
    console.log("*You Caught* " + trimmed[0].name);
    console.log(randomValue(phrases));
    console.log()
    console.log(trimmed[0]);
    }
    else {
        console.log('couldnt locate package info, cast another line');
    }
    return output;  
}
getSearch('npm search --long --parseable --json ' + randomPackage);
