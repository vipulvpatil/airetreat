import {NewGame} from "@/model/game"
import {GetGameFromStorage, JoinGameInStorage} from "@/db/game"
import GrpcService from "@/lib/grpc_service"

const allBotNames = ["C-3PO", "R2-D2", "Data", "Ultron", "Gort", "Sonny", "HAL 9000", "Ava", "KITT", "Kasumi", "EDI", "ED-209", "T-800", "Robocop", "Maria", "David", "TARS", "EVE", "B.O.B.", "Skynet", "The Machine", "V.I.K.I.", "GLaDOS", "Jarvis", "The Hive", "The Borg",
"The T-1000"]

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
  if(!params.playerId){
    return {result: null, err: "playerId is required"}
  }
  try {
    const {gameId} = await GrpcService.createGame(params.playerId)
    return {result: {gameId}, err:null}
  } catch (err){
    console.log(err)
    return {result: null, err: `unable to create game: ${err}`}
  }
}

const getGame = async (params) => {
  if(!params.gameId){
    return {result: null, err: "gameId is required"}
  }
  try {
    const game = await GrpcService.getGameForPlayer(params.gameId, params.playerId)
    return {result: {game}, err:null}
  } catch (err){
    console.log(err)
    return {result: null, err: `unable to get game: ${err}`}
  }
}

const joinGame = async (params) => {
  if(!params.gameId){
    return {result: null, err: "gameId is required"}
  }
  try {
    const gameId = await GrpcService.joinGame(params.gameId, params.playerId)
    return {result: {gameId}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err: `unable to join game: ${err}`}
  }
}

const sendMessage = async (params) => {
  if(!params.name || !params.message || !params.gameId){
    return {result: null, err:"name and message is required"}
  }

  const bot = addMessage(params.gameId, params.name, params.message)
  return {result: {game: games[params.id]}, err: null}
}

const functionMap = {
  "newGame": newGame,
  "joinGame": joinGame,
  "getGame": getGame,
  "sendMessage": sendMessage,
}

const Game = async (req, res) => {
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
    const {result, err} = await actionFunc(req.body.params)
    res.status(200).json({result: result, error: err})
  } else {
    res.status(400).json({error: "improper request"})
  }
}

export default Game
