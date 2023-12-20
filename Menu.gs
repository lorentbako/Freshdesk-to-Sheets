function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("Update")
  .addItem("Update Agents", "fetchAgentData")
  .addItem("Update Tickets", "getTickets")
  .addToUi();
}
