import styles from "@/styles/Home.module.css"
import { Typography } from "@mui/material"
import { useEffect, useRef } from "react"

const ChatList = ({chatList}) => {
  const bottomDiv = useRef()
  useEffect(() => {
    bottomDiv.current.scrollIntoView({ block: "nearest", inline: "nearest"})
  })

  return (
    <>
    {
      chatList &&
      chatList.map((chat, index) => {
        return (
          <div className={styles.qna} key={index}>
            <Typography variant="question">Q: {chat.question}</Typography>
            <div/>
            <Typography variant="answer">A: {chat.answer}</Typography>
          </div>
        )
      })
    }
    <div ref={bottomDiv}></div>
    </>
  )
}

export default ChatList
