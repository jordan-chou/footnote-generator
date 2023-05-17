/**
 * General utility functions to use in web publishing tools.
 * 
 * Author: Jordan Chou
 */

/**
 * Clicking on the input element will copy its contents, present a message
 * and highlight the element.
 * 
 * Ensure that you have the following HTML elements:
 *  - <textarea class='wb-inv' id='copyArea'></textarea>
 *  - <span id="copiedLabel" class='wb-inv label label-success'>Copied</span>
 * 
 * @param {*} outputText DOM element containing the innerText to copy
 */
 function copyToClipboard(outputText) {
    const copyArea = document.getElementById('copyArea');
    const copiedLabel = document.getElementById('copiedLabel');

    outputText.style.boxShadow = "0px 0px 5px green";
    
    copyArea.textContent = outputText.innerText;

    copyArea.select();
    document.execCommand('copy');

    copiedLabel.classList.remove('wb-inv');
    
    // return to default label after 2000ms
    setTimeout(() => {
        outputText.style.boxShadow = null;
        copiedLabel.classList.add('wb-inv');
    }, 2000);
}

/**
 * Scrolls window to DOM element
 * @param {*} element DOM element to put into view
 */
function scrollSmoothTo(element) {
    if (element) {
        element.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        });
    }
}