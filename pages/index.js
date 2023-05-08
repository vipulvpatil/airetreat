import {Button, Grid, Stack, Typography} from "@mui/material"
import AutoJoinGameDialog from "@/components/auto_join_game_dialog"
import Image from "next/image"
import api from "@/lib/api"
import {createGame} from "@/common/actions"
import {loadPlayerData} from "@/lib/local_storage"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import mainImage from "../public/ai-retreat-main-image.png"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"
import {useSession} from "next-auth/react"
import {useState} from "react"

const Index = () => {
  const router = useRouter()
  const [creatingGame, setCreatingGame] = useState(false)
  const [autoJoinGameDialogOpen, setAutoJoinGameDialogOpen] = useState(false)
  const {data: session} = useSession()

  const apiCallCompleted = () => {
    setCreatingGame(false)
    logAnalyticsEvent(window, "GameCreatedEvent", session)
  }

  const autoJoinGame = async () => {
    const playerData = await loadPlayerData(session)
    const resp = await api.call("autoJoinGame", {playerId: playerData.id})
    console.log(resp)
    if(resp.error) {
      console.log(resp.error)
    } else {
      const gameId = resp.result.gameId
      router.push(`/game/${gameId}`)
    }
  }

  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <div className={styles.title}>
          <Typography variant="h1">Ai Retreat</Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="h3">A two-player game of deduction.</Typography>
        </div>
        <Image
          className={styles.mainImage}
          src={mainImage}
          alt="Ai Retreat"
          priority
        />
        <Grid container className={styles.homePageButtons} justifyContent="space-evenly">
          <Grid item>
            <Button
                className={`${styles.poppingButton} ${styles.resizeableButton}`}
                variant="contained"
                onClick={() => {
                  setAutoJoinGameDialogOpen(true)
                }}
                >
              <Typography variant="h3">
                Join Game
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={creatingGame}
              className={`${styles.poppingButton} ${styles.resizeableButton}`}
              variant="contained"
              onClick={() => {
                setCreatingGame(true)
                createGame(router, apiCallCompleted, session)
              }}
              >
              <Typography variant="h3">
                Create a Game
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
      <AutoJoinGameDialog
        open={autoJoinGameDialogOpen}
        handleClose={()=> setAutoJoinGameDialogOpen(false)}
        autoJoinGame={autoJoinGame}
      />
    </div>
  )
}

export default Index
