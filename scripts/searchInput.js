let input = document.querySelector(".searchInput");
let browserWindow = document.querySelector("#browser-window");
const webview = document.querySelector("webview");

//when the input is blured, change the small size accordingly to the content
input.addEventListener("blur", () => {
  input.setAttribute("size", input.value.length + 1);
});

function checkIfWebsite(string) {
  if (string.startsWith("http://") || string.startsWith("https://")) {
    // If it does, remove the http:// or https:// prefix
    string = string.slice(string.indexOf("//") + 2);
  }
  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;
  var regex = new RegExp(expression);
  return regex.test(string);
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && document.activeElement === input) {
    if (checkIfWebsite(input.value)) {
      browserWindow.setAttribute("src", "http://" + input.value);
    } else {
      browserWindow.setAttribute(
        "src",
        "http://google.com/search?q=" + input.value
      );
    }
    input.blur();
  }
});

webview.addEventListener("did-fail-load", () => {
  browserWindow.setAttribute("src", "html/test.html");
});

const config = { attributes: true };

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
      input.value = webview.getAttribute("src");
      input.setAttribute("size", input.value.length + 1);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(webview, config);
