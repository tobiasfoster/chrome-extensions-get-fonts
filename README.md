# chrome-extensions-get-fonts

An extension that retrieves the fonts for the following HTML elements:

   1. "html",
   2. "body",
   3. "h1",
   4. "h2",
   5. "h3",
   6. "h4",
   7. "h5",
   8. "h6",
   9. "p",
   10. "label",
   11. "button",
   12. "a",
   13. "span",
   14. "div",
   15. "input",

It only captures the first instance of the aforementioned elements, so if, for any reason, there are differentiates across the web page, they won't be captured. I'm relying on the fact that this would be **bad practice**.

I'm awaiting approval from Google for it to be added to the Google Chrome Web Store; in the meantime, you can clone this repo and install locally. Follow the instructions [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked).
