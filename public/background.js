chrome.runtime.onInstalled.addListener(() => {
  // Clicking the toolbar icon opens the side panel
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
