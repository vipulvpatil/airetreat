import { Stack, Button } from "@mui/material"
import styles from "@/styles/Home.module.css"
import { useState } from "react"
import SelectedBotBox from "@/components/selected_bot_box"
import { convertMessagesToChatList } from "@/common/chat_formatter"
import ChatList from "@/components/chat_list"
import BotSelector from "@/components/bot_selector"

const UserBox = ({bots, playerBot, gameId}) => {
  const [selectedBot, setSelectedBot] = useState(null)
  let selectedBotJsx

  if(selectedBot){
    selectedBotJsx = <SelectedBotBox bot={selectedBot} gameId={gameId}/>
  } else {
    selectedBotJsx = null
  }

  return (
    <div className={styles.userBox}>
      {selectedBotJsx}
      <BotSelector bots={bots} setSelectedBot={setSelectedBot} playerBot={playerBot}/>
      <div className={styles.userConversation}>
        <ChatList chatList={playerBot && convertMessagesToChatList(playerBot.botMessages)}/>
      </div>
    </div>
  )
}

export default UserBox
