function fetchAgentData() {
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(apiKey + ':X')
    }
  };

  try {
    const url = `https://${companyDomain}.freshdesk.com/api/v2/agents?per_page=100`;
    console.log(url)
    const response = UrlFetchApp.fetch(url, options);
    console.log(response)

    let allAgents = [["Email", "Status"]]
    if (response.getResponseCode() === 200) {
      const data = response.getContentText();
      const jsonData = JSON.parse(data)

      jsonData.map(agent => {
        // let agentRoles = getAgentRoles(agent.id)
        let agentStatus = agent.contact.active ? "Active" : "Not Active"
        allAgents.push([agent.contact.email, agentStatus/*agentRoles*/])
      })

      agentsTab.clearContents()
      agentsTab.getRange(1, 1, allAgents.length, allAgents[0].length).setValues(allAgents)
      sheet.toast('Succesfully updated Agents.')
    }
  } catch (error) {
    Browser.msgBox(error)
  }
}
