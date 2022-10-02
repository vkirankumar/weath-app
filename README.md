# Weath-App

An application that lets you search for a place and view its current and the forecast weather for the next 5 days.

You can add multiple place weather as widgets.

It supports toggles between light and dark mode.

You can sort it based on the date and view weather readings in celsius and farenheit units.

The user settings like theme (dark or light), widgets and its places
are saved for continuity when you visit the next time.

The data shown are backed by open source web apis powered by weather api.

The open source weather apis are configurable at the backend config file ./config/api-config.json.

The application is containerized and can be orchestrated by any kubernetes platform 
with relevant deployment and service configs provided.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run doc-build`

Build docker image with node v17 platform exposing both frontend and backend ports.

### `npm run docRun`

To run the docker image built with the previous step.

NOTE: Prerequisite to have docker installed prior to running the command.

### `npm run sonar`

To run SONAR Qube static code analyzer.

NOTE: Prerequisite to have sonarqube setup locally or remote, prior to running the command.

### `npm run cover`

To run the tests in non watch mode and code coverage.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
