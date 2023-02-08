import { Button, Stack } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chatbox"
import UserBox from "@/components/userbox"
import GameStatusBox from "@/components/game_status_box"

const allBotNames = ["C-3PO", "R2-D2", "Data", "Ultron", "Gort", "Sonny", "HAL 9000", "Ava", "KITT", "Kasumi", "EDI", "ED-209", "T-800", "Robocop", "Maria", "David", "TARS", "EVE", "B.O.B.", "Skynet", "The Machine", "V.I.K.I.", "GLaDOS", "Jarvis", "The Hive", "The Borg",
"The T-1000"]

const botStyles = [
  {
    theme: "botStyle1",
    color: "var(--mui-palette-botStyle1-main)",
  },
  {
    theme: "botStyle2",
    color: "var(--mui-palette-botStyle2-main)",
  },
  {
    theme: "botStyle3",
    color: "var(--mui-palette-botStyle3-main)",
  },
  {
    theme: "botStyle4",
    color: "var(--mui-palette-botStyle4-main)",
  },
]

const Game = () => {
  const interval = useRef()
  const [bots, setBots] = useState([])
  const [currentGame, setCurrentGame] = useState({
    status: {
      currentState:{
        timeElapsed: 0,
        totalTime: 60
      }
    }
  })


  useEffect(() => {
    let seconds = currentGame.status.currentState.timeElapsed
    interval.current = setInterval(()=> {
      seconds += 0.1
      if(seconds > 60) {
        seconds -= 60
      }
      setCurrentGame({
        status: {
          currentState:{
            timeElapsed: seconds,
            totalTime: 60
          }
        }
      })
    }, 100)
    return () => {
      clearInterval(interval.current)
      interval.current = null
    }
  }, [])

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
        style: botStyles[i]
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
          <GameStatusBox status={currentGame?.status}/>
          <UserBox bots={bots}/>
        </div>
      </div>
    </div>
  )
}

export default Game
