import {Metadata, credentials, loadPackageDefinition} from "@grpc/grpc-js"
import ErrorChecker from "@/common/error_checker"
import {loadSync} from "@grpc/proto-loader"
import path from "path"

const PROTO_PATH = path.resolve("./protos/server.proto")
const packageDefinition = loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const apiServer = loadPackageDefinition(packageDefinition).protos

const decodeFromBase64 = (str) => {
  const decoded = Buffer.from(str, "base64").toString("ascii")
  return Buffer.from(decoded)
}

const newGRPCClient = () => {
  const caCert = decodeFromBase64(process.env.CA_CERT_BASE64)
  const clientKey = decodeFromBase64(process.env.CLIENT_KEY_BASE64)
  const clientCert = decodeFromBase64(process.env.CLIENT_CERT_BASE64)

  const channelArgs = {}

  if (process.env.GRPC_SERVER_SSL_NAME_OVERRIDE){
    channelArgs["grpc.ssl_target_name_override"] = "airetreat"
  }

  const client = new apiServer.AiRetreatGo(
    process.env.GRPC_SERVER,
    credentials.createSsl(caCert, clientKey, clientCert),
    channelArgs
  )
  return client
}

const grpcClient = () => {
  if (!global.gprcClient || global.refreshGrpcClient) {
    global.refreshGrpcClient = false
    console.log("Creating new grpc client")
    global.gprcClient = newGRPCClient()
  }

  return global.gprcClient
}

const syncPlayerData = (userEmail, playerId) => {
  const client = grpcClient()
  const syncPlayerDataRequest = {playerId}

  return new Promise((resolve, reject) => {
    client.SyncPlayerData(syncPlayerDataRequest, metadataWithRequestingUserEmail(userEmail), (err, syncPlayerDataResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(syncPlayerDataResponse)
      }
    })
  })
}

const createGame = (userEmail, playerId, publicGame) => {
  const client = grpcClient()
  const createGameRequest = {playerId, public: publicGame}

  return new Promise((resolve, reject) => {
    client.CreateGame(createGameRequest, metadataWithRequestingUserEmail(userEmail), (err, createGameResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(createGameResponse)
      }
    })
  })
}

const joinGame = (userEmail, gameId, playerId) => {
  const client = grpcClient()
  const joinGameRequest = {gameId, playerId}

  return new Promise((resolve, reject) => {
    client.JoinGame(joinGameRequest, metadataWithRequestingUserEmail(userEmail), (err, joinGameResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(joinGameResponse)
      }
    })
  })
}

const autoJoinGame = (userEmail, playerId) => {
  const client = grpcClient()
  const joinGameRequest = {playerId}

  return new Promise((resolve, reject) => {
    client.JoinGame(joinGameRequest, metadataWithRequestingUserEmail(userEmail), (err, joinGameResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(joinGameResponse)
      }
    })
  })
}

const getGameForPlayer = (userEmail, gameId, playerId) => {
  const client = grpcClient()
  const getGameForPlayerRequest = {gameId, playerId}

  return new Promise((resolve, reject) => {
    client.GetGameForPlayer(getGameForPlayerRequest, metadataWithRequestingUserEmail(userEmail), (err, getGameForPlayerResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(getGameForPlayerResponse)
      }
    })
  })
}

const sendMessage = (userEmail, gameId, playerId, botId, text, type) => {
  const client = grpcClient()
  const sendMessageRequest = {gameId, playerId, botId, text, type}

  return new Promise((resolve, reject) => {
    client.SendMessage(sendMessageRequest, metadataWithRequestingUserEmail(userEmail), (err, sendMessageResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(sendMessageResponse)
      }
    })
  })
}

const tag = (userEmail, gameId, playerId, botId) => {
  const client = grpcClient()
  const sendMessageRequest = {gameId, playerId, botId}

  return new Promise((resolve, reject) => {
    client.Tag(sendMessageRequest, metadataWithRequestingUserEmail(userEmail), (err, sendMessageResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(sendMessageResponse)
      }
    })
  })
}

const help = (userEmail, gameId, playerId) => {
  const client = grpcClient()
  const helpRequest = {gameId, playerId}

  return new Promise((resolve, reject) => {
    client.help(helpRequest, metadataWithRequestingUserEmail(userEmail), (err, helpResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(helpResponse)
      }
    })
  })
}

const getGamesForPlayer = (userEmail, playerId) => {
  const client = grpcClient()
  const getGamesForPlayerRequest = {playerId}

  return new Promise((resolve, reject) => {
    client.GetGamesForPlayer(getGamesForPlayerRequest, metadataWithRequestingUserEmail(userEmail), (err, getGamesForPlayerResponse) => {
      if (err) {
        handleGrpcError(reject, err)
      } else {
        resolve(getGamesForPlayerResponse)
      }
    })
  })
}

const handleGrpcError = (reject, err) => {
  if(ErrorChecker.errorIsUnavailable(err)) {
    global.refreshGrpcClient = true
  }
  reject(err)
}

const metadataWithRequestingUserEmail = (userEmail) => {
  const metadata = new Metadata()
  if (userEmail) {
    metadata.add("requesting_user_email", userEmail)
  }
  return metadata
}

const GrpcService = {
  syncPlayerData,
  createGame,
  autoJoinGame,
  joinGame,
  getGameForPlayer,
  sendMessage,
  tag,
  help,
  getGamesForPlayer
}

export default GrpcService
