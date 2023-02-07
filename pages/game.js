import { Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chatbox"

const allBotNames = ["C-3PO", "R2-D2", "Data", "Ultron", "Gort", "Sonny", "HAL 9000", "Ava", "KITT", "Kasumi", "EDI", "ED-209", "T-800", "Robocop", "Maria", "David", "TARS", "EVE", "B.O.B.", "Skynet", "The Machine", "V.I.K.I.", "GLaDOS", "Jarvis", "The Hive", "The Borg",
"The T-1000"]

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null)
  const [botNames, setBotNames] = useState([])

  useEffect(() => {
    const availableBotNames = allBotNames.slice()
    const names = []
    while (availableBotNames.length > 0) {
      const index = Math.floor(Math.random()*availableBotNames.length)
      names.push(availableBotNames[index])
      availableBotNames.splice(index, 1)
    }
    setBotNames(names)
  }, [])

  const placeholderChatList = [
    {
      id: 1,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 2,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 3,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 4,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 5,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 6,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 7,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 8,
      question: "What is your name? And please answer this honestly",
      answer: "My name is not important"
    },
    {
      id: 9,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 10,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 11,
      question: "What is your name?",
      answer: "My name is not important"
    },
    {
      id: 12,
      question: "What is your name?",
      answer: "My name is not important"
    },
  ]

  return (
    <div>
      <div className={styles.blurBackground}>
      <div className={styles.chatBox1}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-one)" botName={botNames[0]}/>
      </div>

      <div className={styles.chatBox2}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-two)" botName={botNames[1]}/>
      </div>

      <div className={styles.chatBox3}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-three)" botName={botNames[2]}/>
      </div>

      <div className={styles.chatBox4}>
        <ChatBox chatList={placeholderChatList} botColor="var(--mui-palette-bot-four)" botName={botNames[3]}/>
      </div>
      </div>
    </div>
  )
}

export default Game
