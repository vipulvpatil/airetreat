import {useEffect, useRef} from "react"
import {Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Conversation = ({playerBot, conversation}) => {
  const bottomDiv = useRef()
  useEffect(() => {
    bottomDiv.current.scrollIntoView({block: "nearest", inline: "nearest"})
  })

  return (
    <div className={styles.conversationContainer}>
      {
        conversation &&
        conversation.map((conversationElement, index) => {
          return (
            <div key={index}>
              <div className={`${styles.receivedMessage} ${styles.questionMessage}`}>
                <div className={styles.questionLabel}>
                  <Typography variant="questionLabel">
                    Question
                  </Typography>
                </div>
                <div className={styles.receivedMessageText}>
                  <Typography variant="messageText">
                    {conversationElement.question}
                  </Typography>
                </div>
              </div>
              <div/>
              {
                conversationElement.answer &&
                (
                  conversationElement.bot === playerBot &&
                  (
                    <div className={`${styles.sentMessage} ${styles.answerMessage}`}>
                      <div className={styles.sentMessageText}>
                        <Typography variant="messageText">
                          {conversationElement.answer}
                        </Typography>
                      </div>
                    </div>
                  ) ||
                  (
                    <div className={`${styles.receivedMessage} ${styles.answerMessage}`}>
                      <div className={styles.questionLabel} style={{color: conversationElement.bot.style.color}}>
                        <Typography variant="questionLabel">
                          {conversationElement.bot.name}
                        </Typography>
                      </div>
                      <div className={styles.receivedMessageText}>
                        <Typography variant="messageText">
                          {conversationElement.answer}
                        </Typography>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          )
        })
      }
      <div ref={bottomDiv}></div>
    </div>
  )
}

export default Conversation
