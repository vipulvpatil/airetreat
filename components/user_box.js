import styles from "@/styles/Home.module.css"
import SelectedBotBox from "@/components/selected_bot_box"
import { convertMessagesToChatList } from "@/common/chat_formatter"
import ChatList from "@/components/chat_list"
import BotSelector from "@/components/bot_selector"

const UserBox = ({bots, playerBot, gameId, selectedBot, selectBot, isAnswering}) => {
  let selectedBotJsx

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

  return (
    <div className={styles.userBox}>
      {selectedBotJsx}
      <BotSelector bots={bots} selectBot={selectBot} playerBot={playerBot}/>
      <div className={styles.userConversation}>
        <ChatList chatList={playerBot && convertMessagesToChatList(playerBot.botMessages)}/>
      </div>
    </div>
  )
}

export default UserBox
