console.log("loaded script");
// (async () => {
//   let permissions = await chrome.permissions.getAll();
//   console.log(permissions);
// })();

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
        let fontPara = document.createElement("p");
        fontPara.style.color = "white";
        fontPara.classList.add("fontPara");
        fontPara.innerHTML = `<h3 class="htmlElement">${key}</h3> ${font}`;
        container.appendChild(fontPara);
      });
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
    "span",
    "div",
    "input",
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

// The body of this function will be executed as a content script inside the
// current page

// Deprecated... for now

// let changeColor = document.getElementById("changeColor");
// let speakButton = document.getElementById("speakButton");

// changeColor.style.color = "red";

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// changeColor.addEventListener("click", async () => {
//   console.log("clicked button");
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: highlightHeadings,
//   });
// });

// speakButton.addEventListener("click", async () => {
//   //   chrome.tts.speak("Hello, world.");

//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.runtime.onMessage.addListener(function (
//     request,
//     sender,
//     sendResponse,
//   ) {
//     console.log(
//       sender.tab
//         ? "from a content script:" + sender.tab.url
//         : "from the extension",
//       request,
//       sender,
//     );
//     if (request.greetings) {
//       chrome.tts.speak(request.greetings.join(" "));
//     }
//   });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: readHeadings,
//   });
// });

// function highlightHeadings() {
//     let headingsToFind = ["h1", "h2", "h3", "h4", "h5", "h6"];

//     headingsToFind.forEach((heading) => {
//       let specificHeading = document.querySelectorAll(heading);
//       specificHeading.forEach((heading) => {
//         heading.style.backgroundColor = "black";
//         heading.style.color = "yellow";
//       });
//     });
//   }

// function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({ color }) => {
//       document.body.style.backgroundColor = "red";
//     });
//   }

// function readHeadings() {
//     //   let headingsToFind = ["h1", "h2", "h3", "h4", "h5", "h6"];
//     //   headingsToFind.forEach((heading) => {
//     //     let specificHeading = document.querySelectorAll(heading);
//     //     specificHeading.forEach((heading) => {
//     //       chrome.tts.speak("hello", {}, function () {
//     //         if (chrome.runtime.lastError) {
//     //           console.log("Error: " + chrome.runtime.lastError.message);
//     //         }
//     //       });
//     //     });

//     chrome.runtime.sendMessage(
//       { greetings: ["hello", "there", "everyone"] },
//       function (response) {
//         if (response) {
//           console.log(response.farewell);
//         }
//       },
//     );
//   }