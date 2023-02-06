import { Button, Stack } from "@mui/material"
import { useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chatbox"

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null)

  const placeholderChatList = [
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
  ]

  return (
    <div className={styles.gameBackground}>
      <div className={styles.chatBox1}>
        <ChatBox chatList={placeholderChatList}/>
      </div>

      <div className={styles.chatBox2}>
        <ChatBox chatList={placeholderChatList}/>
      </div>

      <div className={styles.chatBox3}>
        <ChatBox chatList={placeholderChatList}/>
      </div>

      <div className={styles.chatBox4}>
        <ChatBox chatList={placeholderChatList}/>
      </div>
    </div>
  )
}

export default Game
