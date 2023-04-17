import {Button, Divider, Stack, Typography} from "@mui/material"
import GameList from "@/components/game_list"
import JoinGameDialog from "@/components/join_game_dialog"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
import usePoll from "react-use-poll"
import {useRouter} from "next/router"
import {useState} from "react"

const Index = () => {
  const router = useRouter()
  const [joinGameDialogOpen, setJoinGameDialogOpen] = useState(false)
  const [joinGameId, setJoinGameId] = useState("")
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

  const joinGame = () => {
    setJoinGameDialogOpen(true)
  }

  const gameJoinClosed = () => {
    if(joinGameId) {
      router.push(`/game/join/${joinGameId}`)
    }
  }

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h3" className={styles.mainText}>Your ongoing games</Typography>
        <GameList gameIds={gameIds}/>
        <Divider flexItem light={true}/>
        <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
        <Button className={styles.primaryButton} variant="contained" onClick={joinGame}>Join Game</Button>
      </Stack>
      <JoinGameDialog open={joinGameDialogOpen} joinGameId={joinGameId} setJoinGameId={setJoinGameId} handleClose={gameJoinClosed} />
    </div>
  )
}

export default Index
