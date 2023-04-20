import {Button, Divider, Stack, Typography} from "@mui/material"
import GameList from "@/components/game_list"
import api from "@/lib/api"
import {createGame} from "@/common/actions"
import {loadPlayerData} from "@/lib/local_storage"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import styles from "@/styles/Home.module.css"
import usePoll from "react-use-poll"
import {useRouter} from "next/router"
import {useState} from "react"

const Index = () => {
  const router = useRouter()
  const [gameIds, setGameIds] = useState()
  const [creatingGame, setCreatingGame] = useState(false)

  const apiCallCompleted = () => {
    setCreatingGame(false)
    logAnalyticsEvent(window, "GameCreatedEvent")
  }

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

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h3" className={styles.mainText}>Your ongoing games</Typography>
        <GameList gameIds={gameIds}/>
        <Divider flexItem light={true}/>
        <Button
          disabled={creatingGame}
          className={`${styles.poppingButton} ${styles.resizeableButton}`}
          variant="contained"
          onClick={() => {
            setCreatingGame(true)
            createGame(router, apiCallCompleted)
          }}
        >
          <Typography variant="h3">Create a Game</Typography>
        </Button>
      </Stack>
    </div>
  )
}

export default Index
