const { Typography, Button, Stack } = require("@mui/material")
import { convertMessagesToChatList } from "@/common/chat_formatter"
import styles from "@/styles/Home.module.css"
import ChatList from "@/components/chat_list"

const BotBox = ({bot, addPadding, selectBot}) => {
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
