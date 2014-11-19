# Google Calendar Widget [![Build Status](http://devtools1.risevision.com:8080/view/Widgets%20and%20Components/job/Widget-Google-Calendar-Master-Build/badge/icon)](http://devtools1.risevision.com:8080/view/Widgets%20and%20Components/job/Widget-Google-Calendar-Master-Build/)

## Introduction

The Google Calendar Widget allows users to show a public Google calendar in a Presentation.

Widget Google Calendar works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Built With
- AngularJS
- npm
- Bower
- Gulp
- Karma and Mocha for testing

## Development

### Local Development Environment Setup and Installation

Before running the commands below, ensure you have installed Node and NPM
Install package available at: http://nodejs.org/

The Widget can be installed by executing the following commands:
```
git clone https://github.com/Rise-Vision/widget-google-calendar.git
cd widget-google-calendar
npm install
bower install
gulp build
```

### Run Local
To preview Widgets locally, you'll have to run the [Widget Preview](https://github.com/Rise-Vision/widget-preview) app available [here](http://192.254.220.36/~rvi/widget-preview/).

### Dependencies
* **Gulp** is a task runner. It lints, runs unit and E2E (end-to-end) tests, minimizes files, etc. Gulp tasks are defined in _gulpfile.js_.
* **Bower** is a package manager for Javascript libraries and frameworks. All third-party Javascript dependencies are listed in the _bower.json_ file.
* **npm** is the default package manager for Node.js. npm runs through the command line and manages dependencies for an application. These dependencies are listed in the _package.json_ file.

### Testing
Execute the following command to run both end-to-end and unit tests:
```
gulp test
```

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it

### Languages
If you would like translate the user interface for this product to another language please complete the following:
- Download the english translation file from this repository.
- Download and install POEdit. This is software that you can use to write translations into another language.
- Open the translation file in the [POEdit](http://www.poedit.net/) program and set the language for which you are writing a translation.
- In the Source text window, you will see the English word or phrase to be translated. You can provide a translation for it in the Translation window.
- When the translation is complete, save it with a .po extension and email the file to support@risevision.com. Please be sure to indicate the Widget or app the translation file is for, as well as the language that it has been translated into, and we will integrate it after the translation has been verified.

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Donna Peplinskie](https://github.com/donnapep "Donna Peplinskie")
