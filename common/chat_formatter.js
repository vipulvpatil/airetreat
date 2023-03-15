const convertMessagesToChatList = (messages) => {
  const chatList = []
  let lastChat = null
  for(let i = 0; i < messages.length; i++) {
    if(i%2==0) {
      lastChat = {
        question: messages[i].text
      }
    } else {
      lastChat.answer = messages[i].text
      chatList.push(lastChat)
      lastChat = null
    }
  }
  if(lastChat) {
    chatList.push(lastChat)
    lastChat = null
  }
  return chatList
}

const createConversationForBot = (bot) => {
  return convertMessagesToChatList(bot.botMessages).map((chat) => {
    return Object.assign(chat, {bot: bot})
  })
}

const createFullConversationForGame = (conversation, bots, playerBot) => {
  const botMap = {}
  bots.forEach(bot => {
    botMap[bot.id] = bot
  })
  botMap[playerBot.id] = playerBot
  const chatList = []
  let lastChat = null
  for(let i = 0; i < conversation.length; i++) {
    const conversationElement = conversation[i]
    if(conversationElement.isQuestion) {
      lastChat = {
        bot: botMap[conversationElement.botId],
        question: conversationElement.text
      }
    } else {
      lastChat.answer = conversationElement.text
      chatList.push(lastChat)
      lastChat = null
    }
  }
  if(lastChat) {
    chatList.push(lastChat)
    lastChat = null
  }
  return chatList
}

export {convertMessagesToChatList, createConversationForBot, createFullConversationForGame}
