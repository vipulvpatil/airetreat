import {Dialog, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material"
import BotSelectorMenu from "./bot_selector_menu"
import styles from "@/styles/Home.module.css"

const TagDialog = ({open, botTagged, handleClose, bots}) => {
  return (
    <Dialog
        open={open}
        aria-labelledby="tag-dialog-title"
        aria-describedby="tag-dialog-description"
        color="alternate"
        onClose={handleClose}
        classes={{paper: styles.dialog}}
      >
      <DialogTitle id="tag-dialog-title" typography={"h2"} sx={{textAlign: "center"}}>
        Tag the bot
      </DialogTitle>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogContentText id="tag-dialog-description" sx={{paddingBottom: "4px"}}>
          <Typography variant="h3">
            Tag the bot run by a human. You only get one chance. If you miss, they win.
          </Typography>
        </DialogContentText>
        <BotSelectorMenu bots={bots} handleClose={handleClose} botSelectionCallback={botTagged}/>
      </DialogContent>
    </Dialog>
  )
}

export default TagDialog
