const savePlayerData = (playerData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("player", JSON.stringify(playerData))
  }
}

const loadPlayerData = () => {
  if (typeof window !== "undefined") {
    let playerData = JSON.parse(localStorage.getItem("player"))
    if (playerData) {
      return playerData
    }
    savePlayerData({id: getRandomId()})
    return JSON.parse(localStorage.getItem("player"))
  }
  return null
}

const loadPlayerDataAsync = async () => {
  if (typeof window !== "undefined") {
    let playerData = JSON.parse(localStorage.getItem("player"))
    if (playerData) {
      return playerData
    }
    const playerId = await getPlayerId()
    savePlayerData({id: playerId})
    return JSON.parse(localStorage.getItem("player"))
  }
  return null
}

const getPlayerId = async () => {
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
    return resJson.result.playerId
  } catch (err) {
    console.log(err)
  }
  return null
}

const getRandomId = () => {
  var array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0]
}

export {savePlayerData, loadPlayerData, loadPlayerDataAsync}
