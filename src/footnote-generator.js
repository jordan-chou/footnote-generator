/**
 * Generate WET Style footnotes from inputted HTML code 
 * that was produced from a Word document to Dreamweaver.
 * 
 * Author: Jordan Chou
 */

/* HTML elements */
const inputText = document.getElementById('inputText');
const generateBtn = document.getElementById('submitBtn');
const outputSection = document.getElementById('outputSection');
const outputText = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');
const preview = document.getElementById('preview');
const langBtn = document.getElementById('langBtn');
const fullPrevBtn = document.getElementById('fullPrevBtn');

// Local HTML for input
const inputHTML = document.createElement('div');

// global vars
var showFullPreview = false;
var isEngLang = true;
var langStrings = engStrings;

// Main
inputText.value = inputDefault2;
createListeners();


/* Functions */

/**
 * Attaches click listeners to page's buttons
 */
function createListeners() {
    generateBtn.addEventListener('click', handleGenerateButton);
    copyBtn.addEventListener('click', () => {
        copyToClipboard(outputText);
    });
    langBtn.addEventListener('click', toggleLanguage);
    fullPrevBtn.addEventListener('click', toggleFullPreview);
}

/**
 * Toggles the switch and language
 */
function toggleLanguage() {
    isEngLang = !isEngLang;
    langStrings = isEngLang ? engStrings : frStrings;
    langBtn.textContent = langStrings[0];
    if (!outputSection.classList.contains("hidden")) {
        handleGenerateButton();
    }
}

/**
 * Toggles full preview and reloads the it.
 */
function toggleFullPreview() {
    showFullPreview = !showFullPreview;
    displayPreview(showFullPreview);
}

/**
 * When Generate button is clicked, show output and scroll to it
 */
function handleGenerateButton() {
    // reveal output section
    outputSection.classList.remove('hidden');
    
    generateFootnotes();
    scrollSmoothTo(outputSection);
}

/**
 * Converts the input text into HTML components (for better JavaScript compatibility)
 */
function convertInputToHTML() {
    removeImgSrc();
    inputHTML.innerHTML = inputText.value.trim();
}

function removeImgSrc() {
    const imgs = inputHTML.querySelectorAll('img[src^="file:"');
    for (var img of imgs) {
        img.setAttribute('src', '');
    }
}

/**
 * Gets all paragraph anchors where 'name' starts with '_ftnref' and converts it to WET Style
 * Note: uses each footnote's numerical value
 */
function createBodyFtnTags() {
    const superscripts = inputHTML.querySelectorAll('a[name^="_ftnref"]');
    
    for (var s of superscripts) {
        const sup = document.createElement('sup');
        const a = document.createElement('a');
        const span = document.createElement('span');

        // get footnote number from <div id="ftn###">
        let matches = s.getAttribute('href').match(/(\d+)/);
        const fnNum = matches[0];
        
        // set up attributes
        sup.id = `fn${fnNum}-rf`;
        a.classList.add('fn-lnk');
        a.setAttribute('href', `#fn${fnNum}`);
        span.classList.add('wb-inv');
        
        // append all nodes
        span.appendChild(createTextNode(`${langStrings[2]} `));
        a.appendChild(span);
        a.appendChild(createTextNode(`${fnNum}`));
        sup.appendChild(a);

        s.parentNode.replaceChild(sup, s);
    }
}

/**
 * Creates an HTML Text Node component from input text
 * @param {*} text string
 * @returns HTML text node component
 */
function createTextNode(text) {
    return document.createTextNode(text);
}

/**
 * Converts all divs with 'id' starting with 'ftn' into a WET Style 'aside' component 
 * @returns aside component
 */
function createFootnoteSection() {
    // set up 'aside' element
    const footnotes = inputHTML.querySelectorAll('div[id^="ftn"]');
    const aside = document.createElement('aside');
    aside.classList.add('wb-fnote');
    aside.setAttribute('role', 'note');

    // set up Footnotes heading
    const footnotesHeading = document.createElement('h2');
    footnotesHeading.appendChild(createTextNode(langStrings[1]));
    footnotesHeading.id = 'fn';

    // set up 'dl' element
    const dl = document.createElement('dl');

    for (var f of footnotes) {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        const p  = document.createElement('p');
        const a  = document.createElement('a');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');

        // get footnote number from <div id="ftn###">
        let matches = f.id.match(/(\d+)/);
        const fnNum = matches[0];

        // TODO: French
        dt.textContent = `${langStrings[2]} ${fnNum}`;
        
        // remove unwanted br tag 

        for (var n of f.childNodes) {
            console.log(n.nodeName);
            if (n.nodeName === "BR") {
                console.log("removing br");
                console.log(f);
                f.removeChild(n);
                console.log(f);

                // copy div contents into new p tag
                const pTemp = document.createElement('p');
                pTemp.innerHTML = trimNBSP(f.innerHTML);
                
                // clear div contents
                while (f.firstChild) f.removeChild(f.firstChild);

                // append copied contents
                f.appendChild(pTemp);
            }
        }


        // get footnote text content
        const fnContent = f.querySelector('p');
        fnContent.removeChild(fnContent.firstChild); // remove 'a' tag
        fnContent.innerHTML = trimNBSP(fnContent.innerHTML);

        // TODO: Multiple paragraphs in footnote

        // set superscript attributes
        p.classList.add('fn-rtn');
        a.setAttribute('href', `#fn${fnNum}-rf`);
        span1.classList.add('wb-inv');
        span1.appendChild(createTextNode(langStrings[3]));
        if (isEngLang) {
            span2.classList.add('wb-inv');
            span2.appendChild(createTextNode(langStrings[4]));
        }
        dd.id = `fn${fnNum}`;

        // append all nodes
        a.appendChild(span1);
        a.appendChild(createTextNode(fnNum));
        if (isEngLang) {
            a.appendChild(span2);
        }

        p.appendChild(a);

        dd.appendChild(createTextNode('\n\t\t\t'));
        dd.appendChild(fnContent);
        dd.appendChild(createTextNode('\n\t\t\t'));
        dd.appendChild(p);
        dd.appendChild(createTextNode('\n\t\t'));
        dl.appendChild(createTextNode('\n\t\t'));
        dl.appendChild(dt);
        dl.appendChild(createTextNode('\n\t\t'));
        dl.appendChild(dd);
        dl.appendChild(createTextNode('\n\t'));
    }

    // add child nodes
    aside.appendChild(createTextNode('\n\t'));
    aside.appendChild(footnotesHeading);
    aside.appendChild(createTextNode('\n\t'));
    aside.appendChild(dl);
    aside.appendChild(createTextNode('\n'));

    return aside;
}

/**
 * Removes all &nbsp; from the start of the string
 * 
 * @param {string} s input string
 * @returns string with all &nbsp; removed from the start
 */
function trimNBSP(s) {
    s = s.trim();
    while (s.startsWith('&nbsp;')) s = s.replace('&nbsp;', '');

    return s;
}

/**
 * Replaces input footnotes section with WET Style footnotes section
 */
function replaceFootnoteSection() {
    const footnoteDiv = inputHTML.querySelector('div[id^="ftn"]');
    console.log(footnoteDiv.parentNode);
    footnoteDiv.parentNode.parentNode.replaceChild(createFootnoteSection(), footnoteDiv.parentNode);
}

/**
 * Displays input HTML into output HTML textbox
 */
function displayOutputText() {
    // TODO: output text needs to display parsed input
    outputText.innerText = inputHTML.innerHTML.trim();
}

/**
 * Display Preview of input HTML
 * @param {*} showAll boolean to show full input HTML or only aside component
 */
function displayPreview(showAll) {
    while (preview.firstChild) preview.removeChild(preview.firstChild); // clear

    if (showAll) {
        preview.appendChild(inputHTML.cloneNode(true));
    } else {
        preview.appendChild(inputHTML.querySelector('aside[role="note"]').cloneNode(true)); 
    }
}

/**
 * Core function stack of generating footnotes
 */
function generateFootnotes() {
    convertInputToHTML();
    createBodyFtnTags();
    replaceFootnoteSection();
    displayOutputText();
    displayPreview(showFullPreview);
}
