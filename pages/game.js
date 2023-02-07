import { Button, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chatbox"
import UserBox from "@/components/userbox"

const allBotNames = ["C-3PO", "R2-D2", "Data", "Ultron", "Gort", "Sonny", "HAL 9000", "Ava", "KITT", "Kasumi", "EDI", "ED-209", "T-800", "Robocop", "Maria", "David", "TARS", "EVE", "B.O.B.", "Skynet", "The Machine", "V.I.K.I.", "GLaDOS", "Jarvis", "The Hive", "The Borg",
"The T-1000"]

const allBotColors = ["var(--mui-palette-bot-one)", "var(--mui-palette-bot-two)", "var(--mui-palette-bot-three)", "var(--mui-palette-bot-four)"]

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null)
  const [bots, setBots] = useState([])

  useEffect(() => {
    const availableBotNames = allBotNames.slice()
    const names = []
    while (availableBotNames.length > 0) {
      const index = Math.floor(Math.random()*availableBotNames.length)
      names.push(availableBotNames[index])
      availableBotNames.splice(index, 1)
    }
    const botList = []
    for(let i=0; i < 4; i++){
      botList.push({
        name: names[i],
        color: allBotColors[i]
      })
    }
    setBots(botList)
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
        <div className={styles.gameContainer}>
          <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-around">
            <ChatBox chatList={placeholderChatList} bot={bots[0]} addPadding="top"/>
            <ChatBox chatList={placeholderChatList} bot={bots[1]}/>
            <ChatBox chatList={placeholderChatList} bot={bots[2]}/>
            <ChatBox chatList={placeholderChatList} bot={bots[3]} addPadding="top"/>
          </Stack>
          <UserBox bots={bots}/>
        </div>
      </div>
    </div>
  )
}

export default Game
