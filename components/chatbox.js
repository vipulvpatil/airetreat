const { TextField, Typography } = require("@mui/material")
import styles from "@/styles/Home.module.css"

const ChatBox = ({chatList, botColor, botName}) => {
  let chatListJsx
  
  if (chatList) {
    chatListJsx = chatList.map((chat) => {
      return (
        <div className={styles.qna} key={chat.id}>
          <Typography variant="question">Q: {chat.question}</Typography>
          <div/>
          <Typography variant="answer">A: {chat.answer}</Typography>
        </div>
      )
    })
  }

  return (
    <>
      <div className={styles.chatBox} style={{border: `5px solid ${botColor}`}}>
        {chatListJsx}
      </div>
      <Typography variant="h4" sx={{backgroundColor: botColor, p: "5px"}}>
        {botName}
      </Typography>
    </>
  )
}

export default ChatBox
