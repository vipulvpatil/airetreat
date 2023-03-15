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

export {convertMessagesToChatList, createConversationForBot}
