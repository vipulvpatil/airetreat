import styles from "@/styles/Home.module.css"
import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react"

const SelectedBotBox = ({bot}) => {
  const [message, setMessage] = useState("")
  const getParamsForAction = (action) => {
    switch(action) {
      case "sendMessage":
        return message
      default:
        return null
    }
  }

  const messageChanged = (event) => {
    setMessage(event.target.value)
  }

  const callApi = (action) => async () => {
    const res = await fetch("/api/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: action,
        params: getParamsForAction(action)
      })
    })
    const resJson = await res.json()
    console.log(resJson)
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
          />
          <Button
            variant="contained" 
            color={bot.style.theme}
            onClick={callApi("sendMessage")}
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
