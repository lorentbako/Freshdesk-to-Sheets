function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("Update")
  .addItem("Update Agents", "fetchAgentData")
  .addToUi();
}
