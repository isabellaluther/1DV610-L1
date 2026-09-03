/**
 * @file src/app.js
 * @description This file contains the main application logic for a simple
 * command-line interface that prompts the user for their name and greets them.
 * @author Isabella Luther <il223at@student.lnu.se>
 * @license MIT
 */

import readline from 'node:readline'

/**
 * Fetches and parses the Swedish name day data.
 *
 * @returns {Promise<object>} The parsed name day data.
 */
const getNameDayData = async () => {
  // Fetch the JavaScript file containing the Swedish name day data.
  const response = await fetch('https://workgroup.se/namnsdagar.js')

  // Read the response as plain text.
  const responseText = await response.text()

  // Find where the name day object starts and ends.
  const objectStart = responseText.indexOf('{')
  const objectEnd = responseText.lastIndexOf('}') + 1

  // Extract only the object from the JavaScript file.
  const nameDayDataText = responseText.slice(objectStart, objectEnd)

  // Remove JavaScript line comments because JSON does not allow comments.
  const nameDayDataWithoutComments = nameDayDataText.replace(/\/\/.*$/gm, '')

  // Convert the cleaned JSON text into a JavaScript object.
  const nameDayData = JSON.parse(nameDayDataWithoutComments)

  return nameDayData
}

/**
 * Searches the name day data for a specific name.
 *
 * @param {object} nameDayData - The parsed name day data.
 * @param {string} userName - The name to search for.
 * @returns {string|null} The date of the name day, or null if no match is found.
 */
const findNameDay = (nameDayData, userName) => {
  const normalizedUserName = userName.toLowerCase()

  for (const [date, names] of Object.entries(nameDayData)) {
    const matchingName = names.find(
      (name) => name.toLowerCase() === normalizedUserName
    )

    if (matchingName) {
      return date
    }
  }

  return null
}

// Create a readline interface to read input from the command line.
const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Prompt the user for their name.
inputInterface.question('Vad heter du? ', async (userName) => {
  const trimmedUserName = userName.trim()

  if (trimmedUserName === '') {
    console.log('Du måste skriva in ett namn.')
  } else {
    console.log(`Hej ${trimmedUserName}!`)

    const nameDayData = await getNameDayData()
    const nameDayDate = findNameDay(nameDayData, trimmedUserName)

    console.log(nameDayDate)
  }

  inputInterface.close()
})
