let workspaceList = document.querySelector(".list");
let input = document.querySelector(".workspaceName");
let btnAdd = document.querySelector(".addWorkspace");

btnAdd.addEventListener("click", () => {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  workspaceList.appendChild(li);
});
