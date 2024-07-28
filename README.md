
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

 
# Your App Name

## Getting Started

To use this app effectively, you need to pass specific properties (`props`) when initializing components. These props include `clientId`, `title`, `mainLogo`, and `secondaryLogo`. This guide will walk you through how to set up and pass these props to the app components.

### Prerequisites

Ensure you have Node.js installed on your machine to run the app. You can download it from [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.

### Passing Props

When using the main component of the app, you need to pass the required props as follows:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main'; // Adjust the import path according to your file structure

ReactDOM.render(
  <MamaramChatBot
    clientId="yourclientIdHere"
    title="Your App Title Here"
    mainLogo="path/to/your/mainLogo.png"
    secondaryLogo="path/to/your/secondaryLogo.png"
  />,
  document.getElementById('root')
);