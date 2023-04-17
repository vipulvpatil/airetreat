import {Button, Grid, TextField, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import AssistantIcon from "@mui/icons-material/Assistant"
import BotSelectorDropdown from "@/components/bot_selector_dropdown"
import ReportIcon from "@mui/icons-material/Report"
import SendIcon from "@mui/icons-material/Send"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"

const UserInput = ({game, playerBot, bots, openTagDialog, currentTurnIsUser, currentGameHasEnded}) => {
  const [message, setMessage] = useState("")
  const [showBotSelector, setShowBotSelector] = useState(false)
  const [selectedBot, setSelectedBot] = useState(null)
  const [messageType, setMessageType] = useState("")
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false)

  const messageChanged = (event) => {
    setMessage(event.target.value)
  }

  useEffect(() => {
    if(game){
      if(game.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION") {
        setShowBotSelector(true)
        setSelectedBot(bots[0])
        setMessageType("question")
      } else if(game.state === "WAITING_ON_YOU_TO_ANSWER") {
        setShowBotSelector(false)
        setSelectedBot(playerBot)
        setMessageType("answer")
      } else {
        setShowBotSelector(false)
        setSelectedBot(null)
        setMessageType("")
      }
    }
  }, [playerBot, game, bots])

  const sendMessage = async () => {
    if(currentGameHasEnded()) {
      return
    }
    if(!currentTurnIsUser()){
      return
    }
    const trimmedMessage = message.trim()
    if(trimmedMessage){
      try {
        setSendButtonDisabled(true)
        const playerData = await loadPlayerData()
        const resp = await api.call("sendMessage", {
          gameId: game.id,
          playerId: playerData.id,
          botId: selectedBot.id,
          text: message,
          type: messageType,
        })
        setSendButtonDisabled(false)
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
      inputProps={
        showBotSelector && {
          className: styles.questionInputTextField
        } || {
          className: styles.answerInputTextField
        }
      }
      className={styles.userInputTextField}
      onChange={messageChanged}
      value={message}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.preventDefault()
          sendMessage()
        }
      }}
    />
    {
      showBotSelector &&
      <div className={styles.botSelectorContainer}>
        <BotSelectorDropdown
          bots={bots}
          direction="up"
          botSelectionCallback={setSelectedBot}
        />
      </div>
    }
    <Grid container className={styles.gameButtons} justifyContent="space-between">
      <Grid item>
        <Button className={styles.poppingButton} variant="contained" startIcon={<AssistantIcon />}>
          <Typography variant="h3">
            Help (3)
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={styles.poppingButton}
          variant="contained"
          startIcon={<ReportIcon/>}
          onClick={() => {
            if(!currentGameHasEnded()){
              openTagDialog()
            }
          }}
        >
          <Typography variant="h3">
            Tag
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={sendButtonDisabled}
          className={styles.poppingButton}
          variant="contained"
          startIcon={<SendIcon/>}
          onClick={sendMessage}
        >
          <Typography variant="h3">
            Send
          </Typography>
        </Button>
      </Grid>
    </Grid>
  </div>
}

export default UserInput
