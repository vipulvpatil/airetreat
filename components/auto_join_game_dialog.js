import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import styles from "@/styles/Home.module.css"
import usePoll from "react-use-poll"

const AutoJoinGameDialog = ({open, handleClose}) => {
  const [pollCount, setPollCount] = useState(20)

  useEffect(() => {
    setPollCount(20)
  }, [open])

  const closeDialog = () => {
    handleClose()
  }

  const autoJoinGame = () => {
    if (!open) {
      return
    }
    setPollCount(pollCount => {
      let newPollCount = pollCount
      if(pollCount > 0) {
        console.log("joining game")
        newPollCount = pollCount-1
      }
      return newPollCount
    })
  }

  usePoll(autoJoinGame, [open], {interval: 5000})

  return (
    <Dialog
      open={open}
      aria-labelledby="auto-join-game-dialog-title"
      aria-describedby="auto-join-game-dialog-description"
      onClose={closeDialog}
      classes={{paper: styles.dialog}}
      className={styles.popup}
    >
      <DialogTitle id="auto-join-game-dialog-title" typography={"h1"} sx={{textAlign: "center", paddingBottom: "4px"}}>
        Joining game
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="auto-join-game-dialog-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h4">
            Please wait as we find a game to join
          </Typography>
        </DialogContentText>
        <div style={{paddingTop: "16px"}}>
          <CircularProgress color="primary" />
        </div>
      </DialogContent>
      <DialogActions sx={{padding: "0px"}}>
        <Grid container className={styles.popupButtons} justifyContent="space-evenly">
          <Grid item>
            <Button
              className={`${styles.poppingButton} ${styles.resizeableButton}`}
              variant="contained"
              onClick={closeDialog}
            >
              <Typography variant="h3">Cancel</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default AutoJoinGameDialog
