import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from "@mui/material"
import Link from "next/link"
import {createGame} from "@/common/actions"
import {logAnalyticsEvent} from "@/lib/analytics_events"
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router"
import {useState} from "react"

const GameEndPopup = ({open, handleClose, gameResult}) => {
  const router = useRouter()
  const [creatingGame, setCreatingGame] = useState(false)

  const apiCallCompleted = () => {
    setCreatingGame(false)
    logAnalyticsEvent(window, "GameCreatedEvent")
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="game-end-title"
      aria-describedby="game-end-description"
      onClose={handleClose}
      classes={{paper: styles.dialog}}
      className={styles.popup}
    >
      <DialogTitle id="game-end-title" typography={"h1"} sx={{textAlign: "center", paddingBottom: "4px"}}>
        {gameResult.statusMessage}
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="game-end-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h4" sx={{color: gameResult.color}}>
            {gameResult.displayMessage}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{padding: "0px"}}>
        <Grid container className={styles.popupButtons} justifyContent="space-evenly">
          <Grid item>
            <Link href={process.env.NEXT_PUBLIC_FEEDBACK_LINK} rel="noopener noreferrer" target="_blank">
              <Button className={`${styles.poppingButton} ${styles.resizeableButton}`} variant="contained">
                <Typography variant="h3">Give feedback</Typography>
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
              <Typography variant="h3">Create a Game</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default GameEndPopup
