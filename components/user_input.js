import {Button, Grid, TextField, Typography} from "@mui/material"
import AssistantIcon from "@mui/icons-material/Assistant"
import ReportIcon from "@mui/icons-material/Report"
import SendIcon from "@mui/icons-material/Send"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
import {useState} from "react"

const UserInput = ({bot, gameId}) => {
  const [message, setMessage] = useState("")

  const messageChanged = (event) => {
    setMessage(event.target.value)
  }

  const sendMessage = async () => {
    const trimmedMessage = message.trim()
    if(trimmedMessage){
      try {
        const playerData = await loadPlayerData()
        const resp = await api.call("sendMessage", {
          gameId: gameId,
          playerId: playerData.id,
          botId: bot.id,
          text: message,
        })
        if (resp.error) {
          console.log(resp.error)
        } else {
          setMessage("")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  return <div className={styles.userInput}>
    <TextField
      color="alternate"
      inputProps={{
        className: styles.inputTextField
      }}
      className={styles.userInputTextField}
      onChange={messageChanged}
      value={message}
    />
    <Grid container className={styles.gameButtons} justifyContent="space-between">
      <Grid item>
        <Button className={styles.poppingButton} variant="contained" startIcon={<AssistantIcon />}>
          <Typography variant="h2">
            Suggest
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button className={styles.poppingButton} variant="contained" startIcon={<ReportIcon/>}>
          <Typography variant="h2">
            Tag
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button className={styles.poppingButton} variant="contained" startIcon={<SendIcon/>}>
          <Typography variant="h2">
            Send
          </Typography>
        </Button>
      </Grid>
    </Grid>
  </div>
}

export default UserInput
