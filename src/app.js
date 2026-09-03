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

// Prompt the user for their name
inputInterface.question('Vad heter du? ', (userName) => {
  const trimmedUserName = userName.trim()

  if (trimmedUserName === '') {
    console.log('Du måste skriva in ett namn.')
  } else {
    console.log(`Hej ${trimmedUserName}!`)
  }

  inputInterface.close()
})
