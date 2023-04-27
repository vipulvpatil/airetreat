const savePlayerData = (playerData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("player", JSON.stringify(playerData))
  }
}

const loadPlayerData = async (session) => {
  if (typeof window !== "undefined") {
    let storedPlayerData = JSON.parse(localStorage.getItem("player"))
    if (!playerDataNeedsSyncing(storedPlayerData, session)) {
      return storedPlayerData
    }
    const {playerData} = await syncPlayerData()
    savePlayerData({id: playerData.playerId, connected: playerData.connected})
    return JSON.parse(localStorage.getItem("player"))
  }
  return null
}

const syncPlayerData = async () => {
  try {
    const res = await fetch("/api/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const resJson = await res.json()
    if (resJson.error) {
      console.log(resJson.error)
    }
    return resJson.result
  } catch (err) {
    console.log(err)
  }
  return null
}

const playerDataNeedsSyncing = (playerData, session) => {
  console.log("session -->")
  console.log(session)
  if(playerData && playerData.id) {
    return false
  }
  return true
}

export {savePlayerData, loadPlayerData}
