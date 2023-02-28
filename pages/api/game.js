import GrpcService from "@/lib/grpc_service"

const createGame = async (params) => {
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
    await GrpcService.joinGame(params.gameId, params.playerId)
    return {result: {gameId: params.gameId}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err: `unable to join game: ${err}`}
  }
}

const sendMessage = async (params) => {
  if(!params.playerId || !params.botId || !params.text){
    return {result: null, err: "playerId, botId and text is required"}
  }
  try {
    await GrpcService.sendMessage(params.playerId, params.botId, params.text)
    return {result: null, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err: `unable to send message: ${err}`}
  }
}

const getGameIds = async (params) => {
  if(!params.playerId){
    return {result: null, err: "playerId is required"}
  }
  try {
    const gameIds = ["dummy_id1", "dummy_id2", "dummy_id3"]
    return {result: {gameIds}, err:null}
  } catch (err) {
    console.log(err)
    return {result: null, err: `unable to get games: ${err}`}
  }
}

const functionMap = {
  "createGame": createGame,
  "joinGame": joinGame,
  "getGame": getGame,
  "sendMessage": sendMessage,
  "getGameIds": getGameIds,
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
