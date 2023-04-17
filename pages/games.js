import {Button, Divider, Stack, Typography} from "@mui/material"
import GameList from "@/components/game_list"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
import usePoll from "react-use-poll"
import {useRouter} from "next/router"
import {useState} from "react"

const Index = () => {
  const router = useRouter()
  const [gameIds, setGameIds] = useState()

  const getGameIds = async () => {
    const playerData = await loadPlayerData()
    const resp = await api.call("getGameIds", {playerId: playerData.id})
    if(resp.error) {
      console.log(resp.error)
    } else {
      setGameIds(resp.result.gameIds)
    }
  }

  usePoll(getGameIds, [], {interval: 5000})

  const createGame = async () => {
    const playerData = await loadPlayerData()
    const resp = await api.call("createGame", {playerId: playerData.id})
    if(resp.error) {
      console.log(resp.error)
    } else {
      const gameId = resp.result.gameId
      router.push(`/game/join/${gameId}`)
    }
  }

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h3" className={styles.mainText}>Your ongoing games</Typography>
        <GameList gameIds={gameIds}/>
        <Divider flexItem light={true}/>
        <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
      </Stack>
    </div>
  )
}

export default Index
