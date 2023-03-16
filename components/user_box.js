import styles from "@/styles/Home.module.css"
import SelectedBotBox from "@/components/selected_bot_box"
import { createConversationForBot } from "@/common/chat_formatter"
import Conversation from "./conversation"
import { Button, Stack, Typography } from "@mui/material"
import { useState } from "react"

const UserBox = ({playerBot, fullConversation}) => {
  let botName
  let botColor

  const [showAllChat, setShowAllChat] = useState(false)

  if(playerBot) {
    botName = playerBot.name
    botColor = playerBot.style.color
  }

  return (
    <div className={styles.userBox}>
      <div className={styles.userConversation} style={{border: `5px solid ${botColor}`}}>
        {!showAllChat && <Conversation conversation={playerBot && createConversationForBot(playerBot)}/>}
        {showAllChat && <Conversation conversation={fullConversation}/>}
      </div>
      <Typography variant="h4" sx={{backgroundColor: botColor, textAlign: "center"}}>
        {botName} (self)
      </Typography>
      <Stack direction="row" justifyContent="space-around" sx={{backgroundColor: botColor, p: "5px"}}>
        <Button
          variant="contained"
          onClick={()=>{setShowAllChat(false)}}
          >
          my chat
        </Button>
        <Button
          variant="contained"
          onClick={()=>{setShowAllChat(true)}}
        >
          all chat
        </Button>
        <Button
          variant="contained"
        >
          Help
        </Button>
      </Stack>
    </div>
  )
}

export default UserBox
