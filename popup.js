console.log("loaded script");

let fontButton = document.getElementById("fontButton");
let container = document.getElementById("fontContainer");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (container.childNodes) {
    container.childNodes.forEach((child) => {
      console.container.removeChild(child);
    });
  }
});

fontButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse,
  ) {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension",
      request,
      sender,
    );
    if (container.childNodes) {
      container.childNodes.forEach((child) => {
        console.container.removeChild(child);
      });
    }
    if (request.fonts) {
      request.fonts.forEach((fontElement) => {
        let key = Object.keys(fontElement)[0];
        let font = fontElement[key];
        let fontItem = document.createElement("div");
        fontItem.style.color = "white";
        fontItem.classList.add("fontItem");
        fontItem.innerHTML = `<h3 class="htmlElement">&lt;${key}&gt;</h3> <p class="retrievedFont">${font}</p>`;
        container.appendChild(fontItem);
      });
    } else {
      console.error("Amazingly, no associated fonts were found...");
    }
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getFonts,
  });
});

function getFonts() {
  let elementsToCheck = [
    "html",
    "body",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "label",
    "button",
    "a",
    "input",
    "span",
    "div",
  ];

  let fonts = [];

  elementsToCheck.forEach((element) => {
    let elementInstance = document.querySelector(element);
    if (elementInstance) {
      let fontElement = {
        [element]: getComputedStyle(elementInstance).fontFamily,
      };
      fonts.push(fontElement);
    }
  });

  chrome.runtime.sendMessage({ fonts: fonts }, function (response) {
    if (response) {
      console.log("thanks");
    }
  });
}
