import Conversation from "@/components/conversation"
import styles from "@/styles/Home.module.css"

const ChatContainer = ({playerBot, gameMessages, hasProcessingMessage}) => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBackground}>
        <div className={styles.filterBackgroundImage}>
          <Conversation playerBot={playerBot} gameMessages={gameMessages} hasProcessingMessage={hasProcessingMessage}/>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer
