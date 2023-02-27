import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"
import ChatBox from "@/components/chatbox"
import UserBox from "@/components/userbox"
import GameStatusBox from "@/components/game_status_box"
import { useRouter } from "next/router"
import api from "@/lib/api"
import { loadPlayerData } from "@/lib/local_storage"

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
  const playerData = loadPlayerData()

  const [bots, setBots] = useState([])
  const [currentGame, setCurrentGame] = useState(null)

  useEffect(() => {
    const getGame = async () => {
      const {id} = router.query
      if(id) {
        const resp = await api.call("getGame", {gameId:id, playerId: playerData.id})
        if(resp.error) {
          console.log(resp.error)
        } else {
          setCurrentGame(resp.result.game)
        }
      }
    }
    getGame()
  }, [router])

  useEffect(() => {
    if(currentGame && currentGame.bots) {
      const botList = currentGame.bots.map((bot, index) => {
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
          <UserBox bots={bots}/>
        </div>
      </div>
    </div>
  )
}

export default Game
