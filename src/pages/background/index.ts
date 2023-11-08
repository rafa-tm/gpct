import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';

reloadOnUpdate('pages/background');
reloadOnUpdate('pages/content/style.scss');

// open options page on click of the extension icon
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
