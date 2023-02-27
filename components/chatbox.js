const { TextField, Typography } = require("@mui/material")
import styles from "@/styles/Home.module.css"

const ChatBox = ({bot, addPadding}) => {
  let chatListJsx
  let styleJsx
  let botColor
  let botName

  if (bot) {
    const messages = bot.botMessages
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

    chatListJsx = chatList.map((chat, index) => {
      return (
        <div className={styles.qna} key={index}>
          <Typography variant="question">Q: {chat.question}</Typography>
          <div/>
          <Typography variant="answer">A: {chat.answer}</Typography>
        </div>
      )
    })
  }

  if (bot) {
    botName = bot.name
    botColor = bot.style.color
  }

  if (addPadding === "top") {
    styleJsx = {paddingTop: "250px"}
  } else {
    styleJsx = {paddingTop: "20px"}
  }

  return (
    <div className={styles.chatBox} style={styleJsx}>
      <div className={styles.conversation} style={{border: `5px solid ${botColor}`}}>
        {chatListJsx}
      </div>
      <Typography variant="h4" sx={{backgroundColor: botColor, p: "5px"}}>
        {botName}
      </Typography>
    </div>
  )
}

export default ChatBox
