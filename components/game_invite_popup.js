import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const GameInvitePopup = ({open, handleClose, inviteLink}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="game-invite-title"
      aria-describedby="game-invite-description"
      onClose={handleClose}
      classes={{paper: styles.dialog}}
      className={styles.popup}
    >
      <DialogTitle id="game-invite-title" typography={"h1"} sx={{textAlign: "center", paddingBottom: "4px"}}>
        Invite player
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="game-invite-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h4" sx={{overflowWrap: "anywhere"}}>
            {inviteLink}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{padding: "0px"}}>
        <Grid container className={styles.popupButtons} justifyContent="space-evenly">
          <Grid item>
            <Button className={`${styles.poppingButton} ${styles.resizeableButton}`} variant="contained" onClick={() => navigator.clipboard.writeText(inviteLink)}>
              <Typography variant="h3">Copy Link</Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default GameInvitePopup
