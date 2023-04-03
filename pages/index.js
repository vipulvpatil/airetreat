import {Button, Stack, Typography} from "@mui/material"
import Image from "next/image"
import JoinGameDialog from "@/components/join_game_dialog"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import mainImage from "../public/ai-retreat-main-image.png"
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
    <div>
      <Stack sx={{alignItems: "center"}}>
        <Typography variant="h1">Ai Retreat</Typography>
        <Typography variant="h2">A two-player game of deduction.</Typography>
        <div>
          <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
          <Button className={styles.primaryButton} variant="contained" onClick={joinGame}>Join Game</Button>
        </div>
        <Image
          className={styles.mainImage}
          src={mainImage}
          alt="Ai Retreat"
        />
      </Stack>
      <JoinGameDialog open={joinGameDialogOpen} joinGameId={joinGameId} setJoinGameId={setJoinGameId} handleClose={gameJoinClosed} />
    </div>
  )
}

export default Index
