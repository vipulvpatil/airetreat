import GrpcService from "@/lib/grpc_service"
import {getServerSession} from "next-auth"

const createGame = async (params) => {
  if(!params.playerId){
    return {result: null, err: "playerId is required"}
  }
  try {
    const {gameId} = await GrpcService.createGame(params.playerId)
    return {result: {gameId}, err:null}
  } catch (err){
    console.log(err)
    return {result: null, err}
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
    return {result: null, err}
  }
}

const joinGame = async (params) => {
  if(!params.gameId){
    return {result: null, err: "gameId is required"}
  }
  try {
    await GrpcService.joinGame(params.gameId, params.playerId)
    return {result: {gameId: params.gameId}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const sendMessage = async (params) => {
  if(!params.gameId || !params.playerId || !params.botId || !params.text || !params.type){
    return {result: null, err: "gameId, playerId, botId, text and type is required"}
  }
  try {
    await GrpcService.sendMessage(params.gameId, params.playerId, params.botId, params.text, params.type)
    return {result: null, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const getGameIds = async (params) => {
  if(!params.playerId){
    return {result: null, err: "playerId is required"}
  }
  try {
    const gameIds = await GrpcService.getGamesForPlayer(params.playerId)
    return {result: gameIds, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const tag = async (params) => {
  if(!params.gameId || !params.playerId || !params.botId){
    return {result: null, err: "gameId, playerId, botId is required"}
  }
  try {
    await GrpcService.tag(params.gameId, params.playerId, params.botId)
    return {result: null, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const help = async (params) => {
  if(!params.gameId || !params.playerId){
    return {result: null, err: "gameId, playerId is required"}
  }
  try {
    const helpText = await GrpcService.help(params.gameId, params.playerId)
    return {result: {text: helpText.text}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err}
  }
}

const functionMap = {
  "createGame": createGame,
  "joinGame": joinGame,
  "getGame": getGame,
  "sendMessage": sendMessage,
  "getGameIds": getGameIds,
  "tag": tag,
  "help": help,
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
    const session = await getServerSession(req, res)
    console.log(session)

    const {result, err} = await actionFunc(req.body.params)
    res.status(200).json({result: result, error: err})
  } else {
    res.status(400).json({error: "improper request"})
  }
}

export default Game
