import Conversation from "@/components/conversation"
import styles from "@/styles/Home.module.css"

const ChatContainer = ({playerBot, gameMessages}) => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBackground}>
        <div className={styles.filterBackgroundImage}>
          <Conversation playerBot={playerBot} gameMessages={gameMessages}/>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
