const { Typography, Button, Stack } = require("@mui/material")
import { createConversationForBot } from "@/common/chat_formatter"
import styles from "@/styles/Home.module.css"
import Conversation from "@/components/conversation"

const BotBox = ({bot, addPadding, selectBot}) => {
  let styleJsx
  let botColor
  let botName
  let botMap = {}

  if (bot) {
    botName = bot.name
    botColor = bot.style.color
    botMap[bot.id] = bot
  }

  if (addPadding === "top") {
    styleJsx = {paddingTop: "250px"}
  } else {
    styleJsx = {paddingTop: "20px"}
  }

  return (
    <div className={styles.chatBox} style={styleJsx}>
      <div className={styles.conversation} style={{border: `5px solid ${botColor}`}}>
        <Conversation
          conversation={bot && createConversationForBot(bot)}
        />
      </div>
      <Typography variant="h4" sx={{backgroundColor: botColor, textAlign: "center"}}>
        {botName}
      </Typography>
      <Stack direction="row" justifyContent="space-around" sx={{backgroundColor: botColor, p: "5px"}}>
        <Button
          variant="contained"
          onClick={()=>{selectBot(bot)}}
        >
          Ask
        </Button>
        <Button
          variant="contained"
          onClick={()=>{selectBot(bot)}}
        >
          Tag
        </Button>
      </Stack>
    </div>
  )
}

export default BotBox
