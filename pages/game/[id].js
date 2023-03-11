import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chat_box"
import UserBox from "@/components/user_box"
import GameStatusBox from "@/components/game_status_box"
import { useRouter } from "next/router"
import api from "@/lib/api"
import { loadPlayerData } from "@/lib/local_storage"
import usePoll from "react-use-poll"

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
  const router = useRouter()

  const [bots, setBots] = useState([])
  const [currentGame, setCurrentGame] = useState(null)
  const [playerBot, setPlayerBot] = useState(null)
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    if(router.query && router.query.id) {
      setGameId(router.query.id)
    }
  }, [router])

  const getGame = async (gameId) => {
    const playerData = await loadPlayerData()
    const resp = await api.call("getGame", {gameId, playerId: playerData.id})
    if(resp.error) {
      console.log(resp.error)
    } else {
      const game = Object.assign(resp.result.game, {id: gameId})
      setCurrentGame(game)
    }
  }

  usePoll(() => {
    if(gameId) {
      getGame(gameId)
    }
  }, [gameId], {interval: 1000})

  useEffect(() => {
    if(currentGame && currentGame.bots && currentGame.myBotId) {
      const otherBots = []
      currentGame.bots.forEach(bot => {
        if (bot.id === currentGame.myBotId) {
          setPlayerBot(bot)
        } else {
          otherBots.push(bot)
        }
      })
      const botList = otherBots.map((bot, index) => {
        return Object.assign(bot, {style: botStyles[index]})
      })
      setBots(botList)
    }
  }, [currentGame])

  return (
    <div>
      <div className={styles.blurBackground}>
        <div className={styles.gameContainer}>
          <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-around">
            <ChatBox bot={bots[0]} addPadding="top"/>
            <ChatBox bot={bots[1]}/>
            <ChatBox bot={bots[2]}/>
            <ChatBox bot={bots[3]} addPadding="top"/>
          </Stack>
          <GameStatusBox game={currentGame}/>
          <UserBox bots={bots} playerBot={playerBot} gameId={currentGame && currentGame.id}/>
        </div>
      </div>
    </div>
  )
}

export default Game
