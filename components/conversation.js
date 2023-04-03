import {useEffect, useRef} from "react"
import {Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Conversation = ({conversation}) => {
  const bottomDiv = useRef()
  useEffect(() => {
    bottomDiv.current.scrollIntoView({block: "nearest", inline: "nearest"})
  })

  return (
    <>
      {
        conversation &&
        conversation.map((conversationElement, index) => {
          return (
            <div className={styles.qna} key={index}>
              <div className={`${styles.messageBubble} ${styles.messageBubbleLeft}`}>
                <Typography variant="question">
                  {conversationElement.question}
                </Typography>
              </div>
              <div/>
              <div className={`${styles.messageBubble} ${styles.messageBubbleRight}`} style={{backgroundColor: conversationElement.bot.style.color}}>
                <Typography variant="answer">
                  {conversationElement.answer}
                </Typography>
              </div>
            </div>
          )
        })
      }
      <div ref={bottomDiv}></div>
    </>
  )
}

export default Conversation
