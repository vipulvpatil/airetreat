import { Button, Stack, Typography } from "@mui/material"
import styles from "@/styles/Home.module.css"
import { useRouter } from "next/router"
import api from "@/lib/api"

const Index = () => {
  const router = useRouter()
  const createGame = async () => {
    const playerId = "1"
    const resp = await api.call("newGame", {playerId})
    if(resp.error) {
      console.log(resp.error)
    } else {
      const gameId = resp.result.gameId
      router.push(`game/${gameId}`)
    }
  }

  const joinGame = async () => {
    const playerId = "2"
    const gameId = "jzj0My94pJcRF8kABmJ0"
    const resp = await api.call("joinGame", {playerId, gameId})
    if(resp.error) {
      console.log(resp.error)
    } else {
      const gameId = resp.result.gameId
    }
  }

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
      <Typography className={styles.mainText}>AI Retreat is two-player game of deduction. Ask a friend or play with someone online.</Typography>
        <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
        <Button className={styles.primaryButton} variant="contained" onClick={joinGame}>Join Game</Button>
      </Stack>
    </div>
  )
}

export default Index
