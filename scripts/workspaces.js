import Store from "../store";
import urls from "./currentUrls.json" assert { type: "json" };

let showWorkspaces = document.querySelector(".openWorkspaces");
let workspaceWrapper = document.querySelector(".workspaces");
let workspaceList = document.querySelector(".list");
const webview = document.querySelector("webview");

let workspaceOpened = false;

showWorkspaces.addEventListener("click", () => {
  if (workspaceOpened) {
    workspaceWrapper.classList.remove("workspacesOpen");
    workspaceWrapper.classList.add("workspacesClose");
    workspaceOpened = false;
  } else {
    workspaceWrapper.classList.remove("workspacesClose");
    workspaceWrapper.classList.add("workspacesOpen");
    workspaceOpened = true;
  }
});

//load workspaces from json to the list
for (let i = 0; i < urls.length; i++) {
  let li = document.createElement("li");
  let ul = document.createElement("ul");

  ul.setAttribute("class", "sublist");
  ul.style.display = "none";

  li.classList.add(i);
  li.appendChild(document.createTextNode(urls[i].name));
  workspaceList.appendChild(li);

  li.addEventListener("click", () => {
    if (ul.style.display == "none") {
      ul.style.display = "initial";
    } else {
      ul.style.display = "none";
    }
  });

  li.appendChild(ul);

  for (let j = 1; j < Object.keys(urls[i]).length; j++) {
    let subli = document.createElement("li");
    subli.setAttribute("class", "subli");
    subli.appendChild(document.createTextNode(Object.values(urls[i])[j]));
    subli.addEventListener("click", () => {
      webview.setAttribute("src", subli.innerHTML);
    });
    ul.appendChild(subli);
  }
}
