function getTickets() {
  const priorityProp = {
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
  }
  const statusProp = {
    2: "Open",
    3: "Pending",
    4: "Resolved",
    5: "Closed"
  }
  const options = {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode(apiKey + ':X')
    }
  };

  try {
    response = UrlFetchApp.fetch(`https://${companyDomain}.freshdesk.com/api/v2/tickets`, options)
    const tickets = JSON.parse(response)

    const parsedTickets = tickets.map(t => {
      return [t.id, t.subject, t.type, priorityProp[t.priority], statusProp[t.status], t.created_at, t.due_by]
    })

    const headers = ["Ticket ID", "Subject", "Type", "Priority", "Status", "Created", "Due By"]
    parsedTickets.unshift(headers)

    ticketsTab.clearContents()
    ticketsTab.getRange(1, 1, parsedTickets.length, parsedTickets[0].length).setValues(parsedTickets)
  } catch (error) {
    Browser.msgBox(error)
  }
}

