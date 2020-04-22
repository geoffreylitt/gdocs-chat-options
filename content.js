console.log(chrome.runtime.getURL('chat.js'))

var scriptElement = document.createElement("script");
scriptElement.setAttribute('src', chrome.runtime.getURL('chat.js'));
document.head.appendChild(scriptElement);

