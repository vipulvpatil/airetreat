import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const AutoJoinGameDialog = ({open, handleClose}) => {
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
              onClick={handleClose}
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
