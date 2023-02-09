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

const getStatus = (params) => {
  return [{game: games[params.id]}, null]
}

const sendMessage = (params) => {
  if(!params.name || !params.message){
    return [null, "name and message is required"]
  }

  const bot = addMessage(id, params.name, params.message)

  return [{game: games[params.id]}, null]
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
    const actionFunc = functionMap[action]
    if(!actionFunc) {
      res.status(400)
      return
    }
    if(!req.body.params || !req.body.params.id) {
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
