import { loadPlayerData } from "@/lib/local_storage"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"
import { Button, Stack, Typography } from "@mui/material"
import api from "@/lib/api"

const Join = () => {
  const [joiningGameId, setJoiningGameId] = useState("")
  const [joining, setJoining] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const {id} = router.query
    setJoiningGameId(id)
  }, [router])

  const joinGame = async () => {
    if (joining) {
      return
    }
    setJoining(true)
    const playerData = await loadPlayerData()
    const resp = await api.call("joinGame", {gameId: joiningGameId, playerId: playerData.id})
    if(resp.error) {
      console.log(resp.error)
    } else {
      router.push(`/game/${resp.result.gameId}`)
    }
    setJoining(false)
  }

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography className={styles.mainText}>You are joining game: {joiningGameId}</Typography>
        <Button className={styles.primaryButton} variant="contained" onClick={joinGame}>Continue</Button>
      </Stack>
    </div>
  )
}

export default Join
