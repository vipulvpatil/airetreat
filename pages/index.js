import { Button, Stack, Typography } from "@mui/material"
import styles from "@/styles/Home.module.css"
import { useRouter } from "next/router"

const Index = () => {
  const router = useRouter()
  const createGame = () => {
    router.push("/game")
  }

  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
      <Typography className={styles.mainText}>AI Retreat is two-player game of deduction. Ask a friend or play with someone online.</Typography>
        <Button className={styles.primaryButton} variant="contained" onClick={createGame}>Create a Game</Button>
        <Button className={styles.primaryButton} variant="contained">Join Game</Button>
      </Stack>
    </div>
  )
}

export default Index
