import { loadPlayerDataAsync } from "@/lib/local_storage"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "@/styles/Home.module.css"
import { Stack, Typography } from "@mui/material"
import api from "@/lib/api"

const Join = () => {
  const router = useRouter()

  useEffect(() => {
    const joinGame = async () => {
      const {id} = router.query
      if(id) {
        const playerData = await loadPlayerDataAsync()
        const resp = await api.call("joinGame", {gameId: id, playerId: playerData.id})
        if(resp.error) {
          console.log(resp.error)
        } else {
          router.push(`/game/${resp.result.gameId}`)
        }
      }
    }
    joinGame()
  }, [router])

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
      <Typography className={styles.mainText}>Joining game. Please wait.</Typography>
      </Stack>
    </div>
  )
}

export default Join
