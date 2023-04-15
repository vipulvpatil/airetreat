import {Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const GameEndPopup = ({open, handleClose, gameResult}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="game-end-title"
      aria-describedby="game-end-description"
      onClose={handleClose}
      classes={{paper: styles.dialog}}
    >
      <DialogTitle id="game-end-title" typography={"h1"} sx={{textAlign: "center", paddingBottom: "4px"}}>
        {gameResult.statusMessage}
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="game-end-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h3" sx={{color: gameResult.color}}>
            {gameResult.displayMessage}
          </Typography>
          <Typography variant="h3">
            {"Show CTAs here for providing feedback as well as a starting another game."}
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default GameEndPopup
