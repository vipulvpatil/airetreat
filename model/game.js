const getGameStatus = (game, bots) => {
  if(game.state === "YOU_WON"){
    return {
      statusMessage: "You won",
      displayMessage: game.displayMessage,
      color: "var(--mui-palette-alternate-main)"
    }
  } else if(game.state === "YOU_LOST"){
    let color = null
    const winningBot = botWithId(bots, game.winningBotId)
    if (winningBot) {
      color = winningBot.style.color
    }
    return {
      statusMessage: "You lost",
      displayMessage: game.displayMessage,
      color: color
    }
  } else if (game.state === "TIME_UP") {
    return {
      statusMessage: "Time ran out",
      displayMessage: game.displayMessage,
      color: null
    }
  } else if(game.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION" || game.state === "WAITING_ON_YOU_TO_ANSWER") {
    return {
      statusMessage: "waiting on you",
      displayMessage: game.displayMessage,
      color: null
    }
  } else {
    return {
      statusMessage: "please wait",
      displayMessage: game.displayMessage,
      color: null
    }
  }
}

const getGameResult = (game, bots) => {
  if(game.state === "YOU_WON" || game.state === "YOU_LOST" || game.state === "TIME_UP") {
    return getGameStatus(game, bots)
  } else {
    return null
  }
}

const botWithId = (bots, botId) => {
  let botFound
  bots.forEach(bot => {
    console.log(bot.id === botId)
    if (bot.id === botId) {
      botFound = bot
    }
  })
  return botFound
}

export {
  getGameStatus,
  getGameResult
}
