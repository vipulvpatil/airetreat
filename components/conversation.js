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
                <Typography variant="question">
                  {conversationElement.question}
                </Typography>
              </div>
              <div/>
              {
                conversationElement.answer &&
                (
                  conversationElement.bot === playerBot &&
                  (
                    <div className={`${styles.sentMessage} ${styles.answerMessage}`}>
                      <Typography variant="answer">
                        {conversationElement.answer}
                      </Typography>
                    </div>
                  ) ||
                  (
                    <div className={`${styles.receivedMessage} ${styles.answerMessage}`}>
                      <Typography variant="answer">
                        {conversationElement.answer}
                      </Typography>
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
