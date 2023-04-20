import {Button, Grid, Stack, Typography} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import {createGame} from "@/common/actions"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import mainImage from "../public/ai-retreat-main-image.png"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"
import {useState} from "react"

const Index = () => {
  const router = useRouter()
  const [creatingGame, setCreatingGame] = useState(false)

  const apiCallCompleted = () => {
    setCreatingGame(false)
    logAnalyticsEvent(window, "GameCreatedEvent")
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
          <Link href={"/rules"}>
            <Button className={`${styles.poppingButton} ${styles.resizeableButton}`} variant="contained">
              <Typography variant="h3">
                Rules
              </Typography>
            </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              disabled={creatingGame}
              className={`${styles.poppingButton} ${styles.resizeableButton}`}
              variant="contained"
              onClick={() => {
                setCreatingGame(true)
                createGame(router, apiCallCompleted)
              }}
              >
              <Typography variant="h3">
                Create a Game
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </div>
  )
}

export default Index
