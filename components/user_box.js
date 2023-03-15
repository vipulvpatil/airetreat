import styles from "@/styles/Home.module.css"
import SelectedBotBox from "@/components/selected_bot_box"
import { createConversationForBot } from "@/common/chat_formatter"
import Conversation from "./conversation"
import { Button, Stack, Typography } from "@mui/material"

const UserBox = ({playerBot, gameId, selectedBot, isAnswering}) => {
  let selectedBotJsx
  let botName
  let botColor

  if(selectedBot){
    selectedBotJsx =
      <SelectedBotBox
        bot={selectedBot}
        gameId={gameId}
        textFieldLabel={isAnswering?"answer":"question"}
      />
  } else {
    selectedBotJsx = null
  }

  if(playerBot) {
    botName = playerBot.name
    botColor = playerBot.style.color
  }

  return (
    <div className={styles.userBox}>
      {selectedBotJsx}
      <div className={styles.userConversation} style={{border: `5px solid ${botColor}`}}>
        <Conversation conversation={playerBot && createConversationForBot(playerBot)}/>
      </div>
      <Typography variant="h4" sx={{backgroundColor: botColor, textAlign: "center"}}>
        {botName} (self)
      </Typography>
      <Stack direction="row" justifyContent="space-around" sx={{backgroundColor: botColor, p: "5px"}}>
        <Button
          variant="contained"
        >
          my chat
        </Button>
        <Button
          variant="contained"
        >
          all chat
        </Button>
      </Stack>
    </div>
  )
}

export default UserBox
