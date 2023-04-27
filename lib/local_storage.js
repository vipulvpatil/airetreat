import ErrorChecker from "@/common/error_checker"

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

    const playerData = await syncPlayerData()
    if (playerData) {
      savePlayerData({id: playerData.playerId, connected: playerData.connected})
    } else {
      resetPlayerData()
    }
    return JSON.parse(localStorage.getItem("player"))
  }
  return null
}

const resetPlayerData = () => {
  savePlayerData({id: ""})
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
      if(ErrorChecker.errorIsResetPlayerData(resJson.error)) {
        resetPlayerData()
      }
      console.log(resJson.error)
    } else {
      return resJson.result.playerData
    }
  } catch (err) {
    console.log(err)
  }
  return null
}

const playerDataNeedsSyncing = (playerData, session) => {
  if(!playerData || !playerData.id || playerData.connected == null) {
    return true
  }

  if (session && session.user) {
    return !playerData.connected
  } else {
    return playerData.connected
  }
}

export {savePlayerData, loadPlayerData, resetPlayerData}
