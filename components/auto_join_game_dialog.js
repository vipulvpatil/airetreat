import {Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material"
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
      </DialogContent>
    </Dialog>
  )
}

export default AutoJoinGameDialog
