import {Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material"
import BotSelectorMenu from "./bot_selector_menu"
import styles from "@/styles/Home.module.css"

const TagDialog = ({open, botTagged, handleClose, bots}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="tag-dialog-title"
      aria-describedby="tag-dialog-description"
      onClose={handleClose}
      classes={{paper: styles.dialog}}
      className={styles.popup}
    >
      <DialogTitle id="tag-dialog-title" typography={"h1"} sx={{textAlign: "center", paddingBottom: "4px"}}>
        Tag the bot
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="tag-dialog-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h4">
            Tag the bot powered by a human.
          </Typography>
          <Typography variant="h4">
            You only get one chance.
          </Typography>
          <Typography variant="h4" className={styles.highlightText}>
            If you miss, they win.
          </Typography>
        </DialogContentText>
        <BotSelectorMenu bots={bots} handleClose={handleClose} botSelectionCallback={botTagged}/>
      </DialogContent>
    </Dialog>
  )
}

export default TagDialog
