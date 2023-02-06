const { TextField, Typography } = require("@mui/material")
import styles from "@/styles/Home.module.css"

const ChatBox = ({chatList}) => {
  let chatListJsx
  
  if (chatList) {
    chatListJsx = chatList.map((chat) => {
      return (
        <div>
          <Typography variant="question">{chat.question}</Typography>
          <div/>
          <Typography variant="answer">{chat.answer}</Typography>
        </div>
      )
    })
  }

  return (
    <div className={styles.chatBox}>
      {chatListJsx}
    </div>
  )
}

export default ChatBox
