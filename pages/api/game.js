import {NewGame} from "@/model/game"
import {CreateGameInStorage, GetGameFromStorage} from "@/db/game"

const allBotNames = ["C-3PO", "R2-D2", "Data", "Ultron", "Gort", "Sonny", "HAL 9000", "Ava", "KITT", "Kasumi", "EDI", "ED-209", "T-800", "Robocop", "Maria", "David", "TARS", "EVE", "B.O.B.", "Skynet", "The Machine", "V.I.K.I.", "GLaDOS", "Jarvis", "The Hive", "The Borg",
"The T-1000"]

const parodyBotNames = ["C-21PO", "R4-D4", "Gart", "HAL 9999", "Avis", "ED-I", "T-5000", "Davide", "B.O.B.Z", "The Machy-ne", "GLaDOODLES", "JARV-EESE", "The Hivey-five", "T-3PO", "InfoData", "Sort", "Electronic Device-209", "T-800X", "RoboCupp", "EVE-a-L", "GLaDOSE"]

const games = {
  "123":{
    id: "123",
    bots: [
      {
        id: "bot1",
        name: "C-3PO",
        messages: ["What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name? And please answer this honestly", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO", "What is your name?", "My name is C-3PO"]
      },
      {
        id: "bot2",
        name: "Ultron",
        messages: ["What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name? And please answer this honestly", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron", "What is your name?", "My name is Ultron"]
      },
      {
        id: "bot3",
        name: "Sonny",
        messages: ["What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name? And please answer this honestly", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny", "What is your name?", "My name is Sonny"]
      },
      {
        id: "bot4",
        name: "GLaDOS",
        messages: ["What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name? And please answer this honestly", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS", "What is your name?", "My name is GLaDOS"]
      }
    ],
    player: {
      id: "player",
      name: "The T-1000",
      messages: ["What is your name?", "My name is T-1000"],
    },
    currentState: {
      timeElapsed: 0,
      totalTime: 60
    },
  }
}

const addMessage = (id, name, message) => {
  const game = games[params.id]

  game.bots = game.bots.map(bot => {
    if(bot.name === name){
      bot.messages = bots.messages.push(message)
    }
    return bot
  });
}

const newGame = async (params) => {
  const game = NewGame(params.playerId)
  const gameId = await CreateGameInStorage(game)
  return [{gameId}, null]
}

const getStatus = async (params) => {
  console.log(params)
  const game = await GetGameFromStorage(params.id)
  return [{game}, null]
}

const sendMessage = async (params) => {
  if(!params.name || !params.message || !req.body.params.id){
    return [null, "name and message is required"]
  }

  const bot = addMessage(id, params.name, params.message)

  return [{game: games[params.id]}, null]
}

const functionMap = {
  "newGame": newGame,
  "gameStatus": getStatus,
  "sendMessage": sendMessage,
}

const Game = async (req, res) => {
  console.log(req.method)
  console.log(req.url)
  console.log(req.body)

  if(req.method !== "POST") {
    res.status(404).json({error: "only POST is allowed"})
    return
  }

  if(req.body && req.body["action"]) {
    const action = req.body.action
    const actionFunc = functionMap[action]
    if(!actionFunc) {
      res.status(400).json({error: "unknown action requested"})
      return
    }
    if(!req.body.params) {
      res.status(400).json({error: "empty params not allowed"})
      return
    }
    if(!req.body.params.playerId) {
      res.status(400).json({error: "valid player id is required"})
      return
    }
    const [result, err] = await actionFunc(req.body.params)
    res.status(200).json({result: result, error: err})
  } else {
    res.status(400).json({error: "improper request"})
  }
}

export default Game
