import {Metadata, credentials, loadPackageDefinition} from "@grpc/grpc-js"
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
  const channelArgs = {"grpc.ssl_target_name_override": "airetreat"}

  const client = new apiServer.AiRetreatGo(
    process.env.GRPC_SERVER,
    credentials.createSsl(caCert, clientKey, clientCert),
    channelArgs
  )
  return client
}

const grpcClient = () => {
  if (!global.gprcClient) {
    console.log("Creating new grpc client")
    global.gprcClient = newGRPCClient()
  }

  return global.gprcClient
}

const testClient = (name) => {
  const client = grpcClient()

  const testRequest = {test: name}

  var meta = new Metadata()
  // TODO: Add loggedin user's email
  // meta.add("requesting_user_email", "logged-in-user@example.com")

  return new Promise((resolve, reject) => {
    client.Test(testRequest, meta, (err, testResponse) => {
      if (err) {
        reject(err)
      } else {
        resolve(testResponse)
      }
    })
  })
}

const createGame = (playerId) => {
  const client = grpcClient()

  const createGameRequest = {playerId}

  var meta = new Metadata()

  return new Promise((resolve, reject) => {
    client.CreateGame(createGameRequest, meta, (err, createGameResponse) => {
      if (err) {
        reject(err)
      } else {
        resolve(createGameResponse)
      }
    })
  })
}

const GrpcService = {
  testClient,
  createGame
}

export default GrpcService
