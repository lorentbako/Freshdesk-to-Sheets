function getAgentRoles(agentId) {
  let rolesData = []
  const url = `https://${companyDomain}.freshdesk.com/api/v2/agents/` + agentId
  const rolesUrl = `https://${companyDomain}.freshdesk.com/api/v2/roles`
  const response = UrlFetchApp.fetch(url, options);
  const jsonData = JSON.parse(response)

  if (rolesData.length === 0) {
    const rolesResponse = UrlFetchApp.fetch(rolesUrl, options);
    const jsonRoles = JSON.parse(rolesResponse)
    rolesData = jsonRoles
  }

  const allRoles = []
  jsonData.role_ids.map(role => allRoles.push(rolesData.find(roles => roles.id === role).name))

  Utilities.sleep(100)
  return allRoles.join(', ')
}
