import { Button, Stack } from "@mui/material"
import { useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chatbox"

const botNames = ["C-3PO", "R2-D2", "Data", "Ultron", "Gort", "Sonny", "HAL 9000", "Ava", "KITT", "Kasumi", "EDI", "ED-209", "T-800", "Robocop", "Maria", "David", "TARS", "EVE", "B.O.B.", "Skynet", "The Machine", "V.I.K.I.", "GLaDOS", "Jarvis", "The Hive", "The Borg",
"The T-1000"]

const getRandomBotNames = (botNames, count) => {
  const availableBotNames = botNames.slice()
  const names = []
  while (names.length < count) {
    const index = Math.floor(Math.random()*availableBotNames.length)
    names.push(availableBotNames[index])
    availableBotNames.splice(index, 1)
  }
  return names
}

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
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      question: "What is your name? And please answer this honestly",
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

  const bots = getRandomBotNames(botNames, 4)

  return (
    <div>
      <div className={styles.blurBackground}>
      <div className={styles.chatBox1}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-one)" botName={bots[0]}/>
      </div>

      <div className={styles.chatBox2}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-two)" botName={bots[1]}/>
      </div>

      <div className={styles.chatBox3}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-three)" botName={bots[2]}/>
      </div>

      <div className={styles.chatBox4}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-four)" botName={bots[3]}/>
      </div>
      </div>
    </div>
  )
}

export default Game
