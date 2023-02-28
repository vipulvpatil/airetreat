const { Typography } = require("@mui/material")
import { convertMessagesToChatList } from "@/common/chat_formatter"
import styles from "@/styles/Home.module.css"
import ChatList from "@/components/chat_list"

const ChatBox = ({bot, addPadding}) => {
  let styleJsx
  let botColor
  let botName

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
        <ChatList chatList={bot && convertMessagesToChatList(bot.botMessages)}/>
      </div>
      <Typography variant="h4" sx={{backgroundColor: botColor, p: "5px"}}>
        {botName}
      </Typography>
    </div>
  )
}

export default ChatBox
