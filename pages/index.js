import {Button, Stack, Typography} from "@mui/material"
import JoinGameDialog from "@/components/join_game_dialog"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"
import {useState} from "react"

const Index = () => {
  const router = useRouter()
  const [joinGameDialogOpen, setJoinGameDialogOpen] = useState(false)
  const [joinGameId, setJoinGameId] = useState("")

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
        <Typography variant="h6" className={styles.mainText}>AI Retreat is two-player game of deduction. Ask a friend or play with someone online.</Typography>
        <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
        <Button className={styles.primaryButton} variant="contained" onClick={joinGame}>Join Game</Button>
      </Stack>
      <JoinGameDialog open={joinGameDialogOpen} joinGameId={joinGameId} setJoinGameId={setJoinGameId} handleClose={gameJoinClosed} />
    </div>
  )
}

export default Index
