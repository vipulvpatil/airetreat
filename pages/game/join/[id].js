import {Button, Stack, Typography} from "@mui/material"
import {useCallback, useEffect, useState} from "react"
import Image from "next/image"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import mainImage from "../../../public/ai-retreat-main-image.png"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"

const Join = () => {
  const [joiningGameId, setJoiningGameId] = useState("")
  const [joining, setJoining] = useState(false)
  const router = useRouter()

  const joinGame = useCallback(async () => {
    if (joining) {
      return
    }
    setJoining(true)
    const playerData = await loadPlayerData()
    const resp = await api.call("joinGame", {gameId: joiningGameId, playerId: playerData.id})
    if(resp.error) {
      console.log(resp.error)
    } else {
      logAnalyticsEvent(window, "GameJoinedEvent")
      router.push(`/game/${resp.result.gameId}`)
    }
    setJoining(false)
  }, [joiningGameId, joining, router])

  useEffect(() => {
    const {id} = router.query
    setJoiningGameId(id)
    joinGame()
  }, [router, joinGame])

  return (
    <div className={styles.indexContent}>
      <Stack sx={{alignItems: "center"}}>
        <div className={styles.title}>
          <Typography variant="h1">Ai Retreat</Typography>
        </div>
        <div className={styles.subtitle}>
          <Typography variant="h3">You are joining game: {joiningGameId}</Typography>
        </div>
        <Button
          className={`${styles.poppingButton} ${styles.resizeableButton}`}
          variant="contained"
          onClick={joinGame}
          sx={{marginBottom: "20px"}}
        >
          <Typography variant="h3">
            {"Continue"}
          </Typography>
        </Button>
        <Image
          className={styles.mainImage}
          src={mainImage}
          alt="Ai Retreat"
          priority
        />
      </Stack>
    </div>
  )
}

export default Join
