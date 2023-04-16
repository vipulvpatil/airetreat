import "animate.css"
import {useEffect, useRef} from "react"
import {Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Conversation = ({gameMessages, playerBot, processingMessage}) => {
  const bottomDiv = useRef()
  useEffect(() => {
    bottomDiv.current.scrollIntoView({block: "nearest", inline: "nearest"})
  })

  return (
    <div className={styles.conversationContainer}>
      {
        gameMessages &&
        gameMessages.map((gameMessage, index) => {
          if (gameMessage.sourceBotId === playerBot.id) {
            return <Sending key={index} gameMessage={gameMessage}/>
          } else {
            return <Receiving key={index} gameMessage={gameMessage}/>
          }
        })
      }
      <Processing processingMessage={processingMessage}/>
      <div ref={bottomDiv} style={{paddingTop:"6px"}}></div>
    </div>
  )
}

const Receiving = ({gameMessage}) => {
    let messageTypeClass, messageLabel, labelColor
    if (gameMessage.type === "question") {
      messageTypeClass = styles.questionMessage
      messageLabel = "Question"
    } else if (gameMessage.type === "answer") {
      messageTypeClass = styles.answerMessage
      messageLabel = gameMessage.targetBot.name
      labelColor = gameMessage.targetBot.style.color
    } else {
      return <></>
    }

    return (
      <div className={`${styles.receivedMessage} ${messageTypeClass}`}>
        <MessageLabel labelText={messageLabel} labelColor={labelColor}/>
        <div className={styles.receivedMessageText}>
          <Typography variant="messageText">
            {gameMessage.text}
          </Typography>
        </div>
      </div>
    )
}

const Sending = ({gameMessage}) => {
  let messageTypeClass, messageLabel
  if (gameMessage.type === "question") {
    messageTypeClass = styles.questionMessage
    messageLabel = "Question"
  } else if (gameMessage.type === "answer") {
    messageTypeClass = styles.answerMessage
  } else {
    return <></>
  }

  return (
    <div className={`${styles.sentMessage} ${messageTypeClass}`}>
      {messageLabel && <MessageLabel labelText={messageLabel} themedColor="secondary"/>}
      <div className={styles.sentMessageText}>
        <Typography variant="messageText">
          {gameMessage.text}
        </Typography>
      </div>
    </div>
  )
}

const Processing = ({processingMessage}) => {
  if (!processingMessage) return <></>
  return (
    <div className={`${styles.receivedMessage} ${processingMessage.style} animate__animated animate__shakeX animate__infinite animate__slower`}>
      <div className={styles.receivedMessageText}>
        <Typography variant="messageTextResponding">
          {processingMessage.message}
        </Typography>
      </div>
    </div>
  )
}

const MessageLabel = ({labelText, labelColor, themedColor}) => {
  return (
    <div className={styles.messageLabel} style={labelColor && {color: labelColor}}>
      <Typography variant="messageLabel" color={themedColor}>
        {labelText}
      </Typography>
    </div>
  )
}

export default Conversation
