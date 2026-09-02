/**
 * @file src/app.js
 * @description This file contains the main application logic for a simple command-line interface that prompts the user for their name and greets them.
 * @author Isabella Luther <il223at@student.lnu.se>
 * @license MIT
 */

import readline from 'node:readline'

// Create a readline interface to read input from the command line
const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Prompt the user for their name and greet them
inputInterface.question('Vad heter du? ', (userName) => {
  console.log(`Hej ${userName}!`)

  inputInterface.close()
})
