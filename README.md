<div align="center">

# Font Viewer

[![License][license.io]][license-url]

<p align="left">
This Font Viewer application offers a unique and innovative approach to font selection by integrating a hand tracking feature built using TensorFlow. Users can interact with the application through hand gestures, enabling them to navigate and browse through an extensive collection of fonts, as well as view them in different sizes and styles.
</p>

[About](#about) •
[Setup](#setup) •
[Running the App](#running-the-app) •
[Technologies](#technologies) •
[Credits](#credits) •
[License](#license)

</div>

## About

<div align="center">

<img max-height=320 alt="demo of Font Viewer App" src="https://raw.githubusercontent.com/rparin/Font-Viewer/main/preview/demo.gif">

</div>

### Features

- Hand tracking feature built using TensorFlow for hands-free navigation and browsing of fonts
- Ability to save favorite fonts to a personal list for easy access
- View fonts in different sizes and styles, including bold, italic, and strikethrough
- User-friendly interface with intuitive gesture controls for scrolling, zooming, and selecting fonts

## Setup

### Overview

To get started, simply clone the repository and follow the instructions in the [Installation](#installation) section below. The app requires a Firebase account for database storage, so you will need to [set up a Firebase project](#setting-up-firebase) and configure the app accordingly.

### Installation

1. Clone the repository to your machine using `git clone`.
2. Navigate to the `fontviewer` folder in your terminal
3. Install dependencies by running the command

```
npm install
```

4. You should see a `node_modules` folder once all dependencies has been installed

### Setting up Firebase

1. Create a [Firebase Project][firebase-setup-url] with `Firestore Database`
   - Get started > Add project > 'projectName'
   - On the left there is a navigation tab select 'All Products'
     - Cloud Firestore > Create database > Start in test mode > 'yourSelectedLocation' > Enable
2. Add a firebase `webapp` to your recently created Project
   - On the left there is a navigation tab, on the right of Project Overview select the gear icon
     - Gear icon > Project settings
   - Scroll to the bottom, in the 'Your apps' section select the icon '</>' to create a web app
3. Copy the Firebase configuration code `const firebaseConfig = { ... }`
4. Paste this config into the file `fontviewer/src/environments.ts`

## Running the App

⚠️ **Note:** Before you are able to run the app, ensure you have installed all required dependencies by following the [Installation](#installation) section above

1. To run the app navigate to the `fontviewer` folder in your terminal
2. Enter the command

```
ng serve --open
```

## Technologies

<div align="center">

[![Angular][angular.io]][angular-url]
&nbsp;&nbsp;
[![Firebase][firebase.io]][firebase-url]
&nbsp;&nbsp;
[![tensorflow][tensorflow.io]][tensorflow-url]

</div>

## Credits

I made this program as a learning exercise with my friend, [Yen][yen-url].

## License

This project is licensed under the MIT License - see the [LICENSE][git-license-url] file for details.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://github.com/simple-icons/simple-icons/blob/develop/slugs.md -->

[license.io]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://opensource.org/licenses/MIT
[git-license-url]: https://github.com/rparin/Font-Viewer/blob/main/LICENSE
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[yen-url]: https://github.com/yen-lei
[firebase.io]: https://img.shields.io/badge/Firebase-039BE6?style=for-the-badge&logo=firebase
[firebase-url]: https://firebase.google.com/
[tensorflow.io]: https://img.shields.io/badge/TensorFlow-FFFFFF?style=for-the-badge&logo=tensorflow
[tensorflow-url]: https://www.tensorflow.org/js
[firebase-setup-url]: https://firebase.google.com/
