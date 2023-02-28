import styles from "@/styles/Home.module.css"
import { Typography } from "@mui/material"

const ChatList = ({chatList}) => {
  if (!chatList) {
    return null
  }
  return (
    chatList.map((chat, index) => {
      return (
        <div className={styles.qna} key={index}>
          <Typography variant="question">Q: {chat.question}</Typography>
          <div/>
          <Typography variant="answer">A: {chat.answer}</Typography>
        </div>
      )
    })
  )
}

export default ChatList
