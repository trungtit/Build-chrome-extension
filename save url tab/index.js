let inputText = [];

const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");
const saveTab = document.getElementById("save-tab-btn")
const savedUrl = document.getElementById("saved-url");

const savedList = JSON.parse(localStorage.getItem("urlItems"));
if (savedList) {
  inputText = savedList;
  renderList(inputText);
}



function renderList(array) {
  let list = "";
  for (let i = 0; i < array.length; i++) {
    list += `
          <li>
              <a target='_blank' href='${array[i]}'>
                  ${array[i]}
               </a>
          </li>
          `;
  }
  savedUrl.innerHTML = list;
}

function reload() {
  setInterval(function () {
    window.location.reload(1);
  }, 100);
}

saveTab.addEventListener("click", function () { 
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) { 
        inputText.push(tabs[0].url)
        localStorage.setItem("urlItems", JSON.stringify(inputText))
        renderList(inputText)
    })
})


saveBtn.addEventListener("click", function () {
  inputText.push(inputEl.value);
  renderList(inputText);
  // console.log(inputText);
  localStorage.setItem("urlItems", JSON.stringify(inputText));
  reload();
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  reload();
});
