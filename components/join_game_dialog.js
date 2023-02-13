import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material"
import { useState } from "react"

const JoinGameDialog = ({open, joinGameId, setJoinGameId, handleClose}) => {
  const handleGameIdChanged = (e) => {
    setJoinGameId(e.target.value)
  }
  
  return (
    <Dialog
        open={open}
        aria-labelledby="join-game-dialog-title"
        aria-describedby="join-game-dialog-description"
      >
      <DialogTitle id="join-game-dialog-title" typography={"h4"} sx={{textAlign: "center"}}>
        Game to Join
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="join-game-dialog-description">
          <TextField 
            id="join-game-text-field" 
            label="Game Id"
            variant="outlined"
            defaultValue={joinGameId}
            helperText="enter the id for the game to join"
            sx={{m:"0.5rem"}}
            color="secondary"
            onChange={handleGameIdChanged}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default JoinGameDialog
