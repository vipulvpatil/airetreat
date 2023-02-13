import { loadPlayerData } from "@/lib/local_storage"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "@/styles/Home.module.css"
import { Stack, Typography } from "@mui/material"
import api from "@/lib/api"

const Join = () => {
  const router = useRouter()
  const playerData = loadPlayerData()

  useEffect(() => {
    const joinGame = async () => {
      const {id} = router.query
      if(id) {
        console.log(id)
        const resp = await api.call("joinGame", {gameId: id, playerId: playerData.id})
        if(resp.error) {
          console.log(resp.error)
        } else {
          const gameId = resp.result.gameId
          router.push(`/game/${gameId}`)
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
