import styles from "@/styles/Home.module.css"
import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
import api from "@/lib/api"
import { loadPlayerData } from "@/lib/local_storage"

const SelectedBotBox = ({bot, gameId}) => {
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
          console.log(error)
        } else {
          setMessage("")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className={styles.selectedBotBox} style={{borderColor: bot.style.color}}>
      <Stack>
        <Stack className={styles.selectedBotMessageBox} direction="row" spacing={1}>
          <TextField
            label="question"
            className={styles.selectedBotMessageTextField}
            color={bot.style.theme}
            onChange={messageChanged}
            value={message}
          />
          <Button
            variant="contained"
            color={bot.style.theme}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
        <Stack
          className={styles.selectedBotButtons}
          direction="row"
          justifyContent="space-evenly"
          style={{borderTopColor: bot.style.color}}
        >
          <Button
            variant="contained"
            color={bot.style.theme}
          >
            Tag
          </Button>
          <Button variant="contained">Suggest</Button>
          <Button variant="contained">Help</Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default SelectedBotBox
