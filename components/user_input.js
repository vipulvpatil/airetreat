import {Button, Grid, TextField, Typography} from "@mui/material"
import AssistantIcon from "@mui/icons-material/Assistant"
import BotSelector from "@/components/bot_selector"
import ReportIcon from "@mui/icons-material/Report"
import SendIcon from "@mui/icons-material/Send"
import styles from "@/styles/Home.module.css"
import {useEffect, useState} from "react"
import {loadPlayerData} from "@/lib/local_storage"
import api from "@/lib/api"

const UserInput = ({game, playerBot, bots}) => {
  const [message, setMessage] = useState("")
  const [showBotSelector, setShowBotSelector] = useState(false)
  const [selectedBot, setSelectedBot] = useState(null)

  const messageChanged = (event) => {
    setMessage(event.target.value)
  }

  useEffect(() => {

  }, [])

  useEffect(() => {
    if(game){
      if(game.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION") {
        setShowBotSelector(true)
        setSelectedBot(bots[0])
      } else if(game.state === "WAITING_ON_YOU_TO_ANSWER") {
        setSelectedBot(playerBot)
      } else {
        setSelectedBot(null)
      }
    }
  }, [playerBot, game, bots])

  const sendMessage = async () => {
    const trimmedMessage = message.trim()
    if(trimmedMessage){
      try {
        const playerData = await loadPlayerData()
        const resp = await api.call("sendMessage", {
          gameId: game.id,
          playerId: playerData.id,
          botId: selectedBot.id,
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
    {showBotSelector &&
      <div className={styles.botSelectorContainer}>
        <BotSelector defaultBot={bots[0]} otherBots={bots.slice(1)} direction="up"/>
      </div>
    }
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
        <Button
          className={styles.poppingButton}
          variant="contained"
          startIcon={<SendIcon/>}
          onclick={sendMessage}
          >
          <Typography variant="h2">
            Send
          </Typography>
        </Button>
      </Grid>
    </Grid>
  </div>
}

export default UserInput
