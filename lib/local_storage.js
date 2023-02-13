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

const getRandomId = () => {
  var array = new Uint32Array(1)
  window.crypto.getRandomValues(array)
  return array[0]
}

export {savePlayerData, loadPlayerData}
