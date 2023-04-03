import {Button, Stack, Typography} from "@mui/material"
import Conversation from "./conversation"
import {createConversationForBot} from "@/common/chat_formatter"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

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
