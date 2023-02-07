const { TextField, Typography } = require("@mui/material")
import styles from "@/styles/Home.module.css"

const ChatBox = ({chatList, botColor, botName, addPadding}) => {
  let chatListJsx
  let styleJsx
  
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

  if (addPadding === "top") {
    styleJsx = {paddingTop: "300px"}
  } else {
    styleJsx = {paddingTop: "50px"}
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
