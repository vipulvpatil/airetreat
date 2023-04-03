import {Button, Stack, Typography} from "@mui/material"
import JoinGameDialog from "@/components/join_game_dialog"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"
import {useState} from "react"
import Image from "next/image"

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
    <div>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h1">Ai Retreat</Typography>
        <Typography variant="h2">A two-player game of deduction.</Typography>
        <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
        <Button className={styles.primaryButton} variant="contained" onClick={joinGame}>Join Game</Button>
        <Image
          src="/ai-retreat-main-image.png"
          alt="Ai Retreat"
          width={328} height={328}
          blurDataURL="/ai-retreat-main-image.png"
        />
      </Stack>
      <JoinGameDialog open={joinGameDialogOpen} joinGameId={joinGameId} setJoinGameId={setJoinGameId} handleClose={gameJoinClosed} />
    </div>
  )
}

export default Index
