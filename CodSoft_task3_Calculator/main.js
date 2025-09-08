let input = document.querySelector('input');
let buttons = document.querySelectorAll("button:not(#history-btn,#ui-change-btn)");
let historyBtn = document.querySelector("#history-btn")
let historyDialog = document.querySelector("#history-dialog")
let closeDialog = document.querySelector("#close-dialog");
let historyList = document.querySelector("#history-list")
let string = "";
let btnarr = Array.from(buttons);



btnarr.forEach(function(btn){
  btn.addEventListener("click", function(){
    if(btn.innerHTML=="AC"){
      string="";
      input.value=string;
    }
    else if (btn.querySelector(".fa-delete-left")) {
      string = string.substring(0,string.length-1);
      input.value=string;
    }
    else if (btn.innerHTML === "()") {
      // auto-insert bracket
      let open = (string.match(/\(/g) || []).length;
      let close = (string.match(/\)/g) || []).length;

      if (open === close || string.slice(-1) === "(") {
        string += "(";
      } else if (open > close && string.slice(-1) !== "(") {
        string += ")";
      }
      input.value = string;
    }
    else if (btn.innerHTML === "=") {
    try {
    let expression = string.replace(/%/g, "/100")
    .replace(/×/g,"*")
    .replace(/÷/g,"/");
    result = eval(expression).toString();
    
    let li = document.createElement("li");
    li.textContent = string + "=" + result;
    historyList.appendChild(li);
    string = result;
    input.value = string;
  } catch (err) {
    input.value = "Error";
    string = "";
  }
}
    
    else {
      string = string + btn.innerHTML;
    input.value = string;
    }
  });
});

historyBtn.addEventListener("click",function() {
  historyDialog.style.display = "block";
});

closeDialog.addEventListener("click",function () {
  historyDialog.style.display = "none";
});

window.addEventListener("click",function(e){
  if (e.target === historyDialog) {
    historyDialog.style.display = "none";
  }
});



let uiChangeBtn = document.querySelector("#ui-change-btn");
let body = document.querySelector("body");
let currentMode = "dark";

uiChangeBtn.addEventListener("click", function () {
  if (currentMode === "dark") {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    currentMode = "light";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    currentMode = "dark";
  }
});
