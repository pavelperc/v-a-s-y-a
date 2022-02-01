chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: 'v-a-s-y-a',
    id: 'vasya',
    contexts: ['selection'],
    documentUrlPatterns: ['http://ci.bookmate.services/*'],
  });
});

chrome.contextMenus.onClicked.addListener(function(itemData, tab) {
  if (itemData.menuItemId === 'vasya') {

    const fixedSelection = cutTimestamps(itemData.selectionText);
    console.log("selection:\n" + itemData.selectionText);
    console.log("fixed selection:\n" + fixedSelection);

    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: copy,
      args: [fixedSelection],
    });
  }
});

function cutTimestamps(selection) {
  return selection.replace(/\[[\d-T:.Z]+] /g, "\n");
}

function copy(text) {
  const ta = document.createElement('textarea');
  ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
  ta.value = text;
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  ta.remove();
}