import { TextField, Typography, Stack, Button } from "@mui/material"
import styles from "@/styles/Home.module.css"
import { useEffect, useState } from "react"
import SelectedBotBox from "@/components/selected_bot_box"
import { convertMessagesToChatList } from "@/common/chat_formatter"
import ChatList from "@/components/chat_list"

const UserBox = ({bots, playerBot, gameId}) => {
  const [selectedBot, setSelectedBot] = useState(null)
  let botsJsx
  let selectedBotJsx

  const botSelected = (bot) => () => {
    setSelectedBot(bot)
  }

  if (bots && bots.length > 0) {
    botsJsx = bots.map((bot, i) => {
      return (
        <Button
          variant="contained"
          className={styles.botButton}
          color={bot.style.theme}
          key={i}
          onClick={botSelected(bot)}
        >
          {bot.name}
        </Button>
      )
    })
  }

  if(selectedBot){
    selectedBotJsx = <SelectedBotBox bot={selectedBot} gameId={gameId}/>
  } else {
    selectedBotJsx = null
  }

  return (
    <div className={styles.userBox}>
      {selectedBotJsx}
      <Stack direction="row" justifyContent="space-around">
        {botsJsx}
      </Stack>
      <div className={styles.userConversation}>
        <ChatList chatList={playerBot && convertMessagesToChatList(playerBot.botMessages)}/>
      </div>
    </div>
  )
}

export default UserBox
