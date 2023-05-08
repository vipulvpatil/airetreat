import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from "@mui/material"
import {useEffect, useRef, useState} from "react"
import styles from "@/styles/Home.module.css"
import usePoll from "react-use-poll"

const AutoJoinGameDialog = ({open, handleClose, autoJoinGame}) => {
  const [pollCount, setPollCount] = useState(20)
  const callingApi = useRef(false)
  const [displayMessage, setDisplayMessage] = useState("Please wait as we find a game to join")
  const [spinner, setSpinner] = useState(
    <div style={{paddingTop: "16px"}}>
      <CircularProgress color="primary" />
    </div>
  )
  let [actionButton, setActionButton] = useState(
    <Button
      className={`${styles.poppingButton} ${styles.resizeableButton}`}
      variant="contained"
      onClick={handleClose}
    >
      <Typography variant="h3">Cancel</Typography>
    </Button>
  )

  useEffect(() => {
    if(pollCount > 0) {
      setDisplayMessage("Please wait as we find a game to join")
      setSpinner(
        <div style={{paddingTop: "16px"}}>
          <CircularProgress color="primary" />
        </div>
      )
      setActionButton(
        <Button
          className={`${styles.poppingButton} ${styles.resizeableButton}`}
          variant="contained"
          onClick={handleClose}
        >
          <Typography variant="h3">Cancel</Typography>
        </Button>
      )
    } else {
      setDisplayMessage("No game found. Please create one instead")
      setSpinner(<></>)
      setActionButton(
        <Button
          className={`${styles.poppingButton} ${styles.resizeableButton}`}
          variant="contained"
          onClick={handleClose}
        >
          <Typography variant="h3">Back</Typography>
        </Button>
      )
    }

  }, [pollCount, handleClose])

  useEffect(() => {
    setPollCount(20)
  }, [open])

  const callAutoJoinGameApi = async () => {
    if(!callingApi.current) {
      callingApi.current = true
      await autoJoinGame()
      callingApi.current = false
    }
  }

  const attemptToJoinGame = () => {
    if (!open) {
      return
    }
    setPollCount((pollCount) => {
      let newPollCount = pollCount
      if(pollCount > 0) {
        callAutoJoinGameApi()
        newPollCount = pollCount-1
      }
      return newPollCount
    })
  }

  usePoll(attemptToJoinGame, [open], {interval: 5000})

  return (
    <Dialog
      open={open}
      aria-labelledby="auto-join-game-dialog-title"
      aria-describedby="auto-join-game-dialog-description"
      onClose={handleClose}
      classes={{paper: styles.dialog}}
      className={styles.popup}
    >
      <DialogTitle id="auto-join-game-dialog-title" typography={"h1"} sx={{textAlign: "center", paddingBottom: "4px"}}>
        Joining game
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="auto-join-game-dialog-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h4">
            {displayMessage}
          </Typography>
        </DialogContentText>
        {spinner}
      </DialogContent>
      <DialogActions sx={{padding: "0px"}}>
        <Grid container className={styles.popupButtons} justifyContent="space-evenly">
          <Grid item>
            {actionButton}
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default AutoJoinGameDialog
