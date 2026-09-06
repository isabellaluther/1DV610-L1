/**
 * @file src/app.js
 * @description This file contains the main application logic for a simple
 * command-line interface that prompts the user for their name and greets them.
 * @author Isabella Luther <il223at@student.lnu.se>
 * @license MIT
 */

import readline from 'node:readline'

/**
 * Fetches Swedish calendar data for the current year.
 *
 * @returns {Promise<object>} The calendar data returned by the API.
 */
const getNameDayData = async () => {
  const currentYear = new Date().getFullYear()

  const response = await fetch(
    `https://sholiday.faboul.se/dagar/v2.1/${currentYear}`
  )

  const nameDayData = await response.json()

  return nameDayData
}

/**
 * Searches the name day data for a specific name.
 *
 * @param {object} nameDayData - The calendar data returned by the API.
 * @param {string} userName - The name to search for.
 * @returns {string|null} The date of the name day, or null if no match is found.
 */
const findNameDay = (nameDayData, userName) => {
  const normalizedUserName = userName.toLowerCase()

  for (const day of nameDayData.dagar) {
    const matchingName = day.namnsdag.find(
      (name) => name.toLowerCase() === normalizedUserName
    )

    if (matchingName) {
      return day.datum
    }
  }

  return null
}

/**
 * Formats a name day date from YYYY-MM-DD to a Swedish readable date.
 *
 * @param {string} nameDayDate - The name day date in YYYY-MM-DD format.
 * @returns {string} The formatted date.
 */
const formatNameDayDate = (nameDayDate) => {
  const months = [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december'
  ]

  const [, month, day] = nameDayDate.split('-')

  const monthName = months[Number(month) - 1]

  return `${Number(day)} ${monthName}`
}

// Create a readline interface for user input and output.
const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Prompt the user for their name and handle the response.
inputInterface.question('Vad heter du? ', async (userName) => {
  const trimmedUserName = userName.trim()

  if (trimmedUserName === '') {
    console.log('Du måste skriva in ett namn.')
  } else {
    console.log(`Hej ${trimmedUserName}!`)

    const nameDayData = await getNameDayData()
    const nameDayDate = findNameDay(nameDayData, trimmedUserName)

    if (nameDayDate) {
      const formattedNameDayDate = formatNameDayDate(nameDayDate)

      console.log(
        `Du har namnsdag den ${formattedNameDayDate}.`
      )
    } else {
      console.log(
        `Kunde inte hitta ${trimmedUserName} i namnsdagslistan.`
      )
    }
  }

  inputInterface.close()
})
