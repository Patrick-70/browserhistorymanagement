/*=========================================

BROWSER HISTORY MANAGEMENT SYSTEM

STACK IMPLEMENTATION

=========================================*/

//=========================================
// DEFAULT BROWSING HISTORY (20 PAGES)
//=========================================

const defaultHistory = [
  "google.com",
  "youtube.com",
  "github.com",
  "stackoverflow.com",
  "wikipedia.org",
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "amazon.com",
  "netflix.com",
  "twitter.com",
  "reddit.com",
  "microsoft.com",
  "apple.com",
  "udemy.com",
  "coursera.org",
  "medium.com",
  "chat.openai.com",
  "canva.com",
  "ucc.edu.gh",
];

//=========================================
// STACKS
//=========================================

let historyStack = [...defaultHistory];
let forwardStack = [];

//=========================================
// HTML ELEMENTS
//=========================================

const websiteInput = document.getElementById("websiteInput");
const visitBtn = document.getElementById("visitBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
const currentPage = document.getElementById("currentPage");
const historyDisplay = document.getElementById("historyStack");
const forwardDisplay = document.getElementById("forwardStack");
const message = document.getElementById("message");

//=========================================
// VISIT WEBSITE - PUSH OPERATION
//=========================================

visitBtn.addEventListener("click", function () {
  let website = websiteInput.value.trim();

  if (website === "") {
    showMessage("⚠ Please enter a website first");
    return;
  }

  // Add page to stack
  historyStack.push(website);

  // Clear forward stack
  forwardStack = [];

  websiteInput.value = "";
  showMessage("✓ " + website + " added using PUSH");
  updateDisplay();
});

// Also trigger visit on Pressing Enter key inside Input
if (websiteInput) {
  websiteInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      visitBtn.click();
    }
  });
}

//=========================================
// BACK BUTTON - POP OPERATION
//=========================================

backBtn.addEventListener("click", function () {
  if (historyStack.length <= 1) {
    showMessage("⚠ No previous page available");
    return;
  }

  let removedPage = historyStack.pop();
  forwardStack.push(removedPage);

  showMessage("← " + removedPage + " moved to Forward Stack");
  updateDisplay();
});

//=========================================
// FORWARD BUTTON
//=========================================

forwardBtn.addEventListener("click", function () {
  if (forwardStack.length === 0) {
    showMessage("⚠ No forward page available");
    return;
  }

  let page = forwardStack.pop();
  historyStack.push(page);

  showMessage("→ Returned to " + page);
  updateDisplay();
});

//=========================================
// CLEAR HISTORY
//=========================================

clearBtn.addEventListener("click", function () {
  historyStack = [];
  forwardStack = [];

  showMessage("✓ Browser history cleared");
  updateDisplay();
});

//=========================================
// RESET DEMO
//=========================================

resetBtn.addEventListener("click", function () {
  historyStack = [...defaultHistory];
  forwardStack = [];

  showMessage("↻ Default history restored");
  updateDisplay();
});

//=========================================
// UPDATE SCREEN
//=========================================

function updateDisplay() {
  // Disable/Enable navigation controls based on stack sizes
  if (backBtn) backBtn.disabled = historyStack.length <= 1;
  if (forwardBtn) forwardBtn.disabled = forwardStack.length === 0;

  //=============================
  // PEEK OPERATION (Active Page)
  //=============================
  if (historyStack.length > 0) {
    let activeSite = historyStack[historyStack.length - 1];
    currentPage.innerHTML = `
      <div class="flex items-center space-x-2.5">
        ${getWebsiteLogo(activeSite)}
        <span class="font-medium text-blue-300 truncate">${activeSite}</span>
      </div>
    `;
  } else {
    currentPage.textContent = "No page visited yet";
  }

  //=============================
  // HISTORY STACK DISPLAY
  //=============================
  historyDisplay.innerHTML = "";

  if (historyStack.length === 0) {
    historyDisplay.innerHTML = `
      <div class="text-slate-500 text-xs text-center my-auto py-6 italic flex flex-col items-center space-y-1.5">
        <i class="fa-solid fa-box-open text-lg text-slate-600"></i>
        <span>No browsing history available</span>
      </div>
    `;
  } else {
    historyStack.forEach(function (page, index) {
      let item = document.createElement("div");
      let isTop = index === historyStack.length - 1;

      item.className = `stack-item p-2.5 rounded-xl border flex items-center justify-between transition-all duration-200 ${
        isTop
          ? "top-stack bg-blue-950/50 border-blue-500/60 text-blue-200 shadow-sm"
          : "bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700"
      }`;

      item.innerHTML = `
        <div class="flex items-center space-x-2.5 truncate">
          ${getWebsiteLogo(page)}
          <span class="truncate font-medium">${page}</span>
        </div>
        ${
          isTop
            ? `<span class="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shrink-0">TOP</span>`
            : `<span class="text-[10px] text-slate-500 font-sans shrink-0">#${index}</span>`
        }
      `;

      historyDisplay.appendChild(item);
    });
  }

  //=============================
  // FORWARD STACK DISPLAY
  //=============================
  forwardDisplay.innerHTML = "";

  if (forwardStack.length === 0) {
    forwardDisplay.innerHTML = `
      <div class="text-slate-500 text-xs text-center my-auto py-6 italic flex flex-col items-center space-y-1.5">
        <i class="fa-solid fa-inbox text-lg text-slate-600"></i>
        <span>No forward pages available</span>
      </div>
    `;
  } else {
    forwardStack.forEach(function (page, index) {
      let item = document.createElement("div");

      item.className =
        "stack-item p-2.5 rounded-xl border bg-slate-900/80 border-slate-800/80 text-slate-300 flex items-center justify-between transition-all duration-200 hover:border-slate-700";

      item.innerHTML = `
        <div class="flex items-center space-x-2.5 truncate">
          ${getWebsiteLogo(page)}
          <span class="truncate font-medium">${page}</span>
        </div>
        <span class="text-[10px] text-purple-400/80 font-sans shrink-0">#${index}</span>
      `;

      forwardDisplay.appendChild(item);
    });
  }
}

//=========================================
// STATUS MESSAGE
//=========================================

function showMessage(text) {
  if (message) {
    message.textContent = text;
  }
}

//=========================================
// REAL WEBSITE FAVICONS
//=========================================

function getWebsiteLogo(site) {
  let domain = site
    .replace("https://", "")
    .replace("http://", "")
    .split("/")[0];

  return `
    <img 
      class="site-icon w-4 h-4 rounded shrink-0 inline-block object-contain"
      src="https://www.google.com/s2/favicons?domain=${domain}&sz=64"
      alt="${domain} logo"
      onerror="this.src='https://www.google.com/s2/favicons?domain=example.com&sz=64'"
    >
  `;
}

//=========================================
// LOAD DEFAULT HISTORY
//=========================================

updateDisplay();