const getStatus = (params) => {
  console.log("getting status")
  console.log(params)
  return ["success", null]
}

const sendMessage = (params) => {
  console.log("getting status")
  console.log(params)
  return ["success", null]
}

const functionMap = {
  "gameStatus": getStatus,
  "sendMessage": sendMessage,
}

const Game = (req, res) => {
  console.log(req.method)
  console.log(req.url)
  console.log(req.body)

  if(req.method !== "POST") {
    res.status(404)
    return
  }

  if(req.body && req.body["action"]) {
    const action = req.body.action
    console.log(action)
    const actionFunc = functionMap[action]
    if(!actionFunc) {
      res.status(400)
      return
    }
    const [result, err] = actionFunc(req.body.params)
    res.status(200).json({result: result, error: err})
  } else {
    res.status(500)
  }
}

export default Game
