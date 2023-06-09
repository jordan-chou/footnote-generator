# Footnote Generator
Generate [Web Experience Toolkit (WET)](https://wet-boew.github.io/wet-boew/index-en.html) Style footnotes from inputted HTML code that was produced from Word. This tool is recommended to be used at the beginning of the HTML coding process.

**This tool is actively used to code footnotes in the [Federal Budget](https://www.canada.ca/en/department-finance/services/publications/federal-budget.html) and other Finance Canada publications.**

The footnote output complies with TBS guidance found here: https://wet-boew.github.io/v4.0-ci/demos/footnotes/footnotes-en.html

This project is regularly updated twice a year when performing critical analysis review for the Department of Finance's major reports: Federal Budget, and Economic and Fiscal Update (EFU) or Fall Economic Statement (FES).

## Features
* Footnote section
* Footnote references with two-way linking
* Toggle language selection (English/Français)
* Supports accessibility standards

## Instructions
1. Open `index.html`
2. Copy the **entire** HTML body source, paste it and overwrite the contents in the HTML Input box
3. Press the Generate button
4. Toggle the Full Preview to see and test the linking between the references and footnotes

## Requests and Issues
Please feel free to create in Issue [on Github](https://github.com/jordan-chou/footnote-generator/issues) to make a request or flag issues.

## Options
**Language button**: Select between _English_ and _Français_ so that headings and accessibility text are in the appropriate language.

## Known issues
* All footnote HTML must be grouped up into the same `div`

## About
### What was this project's initial purpose?
This tool was created to simplify the process of coding each individual footnote and footnote reference. 
Each footnote and its reference have multiple HTML elements and attributes where it could be tedious to perform when there are numerous footnotes in a document.

### When was it created?
This project started in mid-2022 when I first started as a Web Publisher with the Department of Finance. I am the sole developer on this project and I have been upgrading, expanding, and maintaining it since then.

### What was my experience at the time?
I have worked on several tools at Finance Canada at this point. I frequently used JavaScript, HTML, and JS DOM Node elements for my projects. This tool was used initially to efficiently publish reports and documents.

### Contact
Please feel free to reach out to me for feedback, issues, or requests at jordan.chou@fin.gc.ca.
