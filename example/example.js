const fs = require('fs')
const {join} = require('path')
const separate = require('../')

const exampleText = fs.readFileSync(join(__dirname, 'example.md')).toString()

console.log(separate(exampleText))
