# Laboration 1 – Welcome Application

A simple command-line application written in JavaScript with Node.js. The program asks the user for their name and looks up their Swedish name day using an external calendar API.

## Getting started

Make sure Node.js is installed. Clone the repository and run the application:

```bash
git clone git@github.com:isabellaluther/1DV610-L1.git
cd 1DV610-L1
npm start
```

The application uses Node.js built-in functionality and does not require any additional npm dependencies.

## Features

- Prompts the user for their name.
- Validates empty input.
- Fetches Swedish name day information from an external calendar API.
- Searches for the entered name.
- Displays the name day in a readable date format.
- Handles errors if the API request fails.

## Example

```text
Vad heter du? Isabella
Hej Isabella!
Du har namnsdag den 30 oktober.
```

## Screenshot

![Screenshot of the application](images/demo.png)

## Data source

Name day information is retrieved from the Swedish calendar API provided by Faboul:

https://sholiday.faboul.se/

The application fetches calendar data for the current year and searches for the entered name.