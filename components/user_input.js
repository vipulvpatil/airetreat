import {TextField} from "@mui/material"
import api from "@/lib/api"
import {loadPlayerData} from "@/lib/local_storage"
import {useState} from "react"
import styles from "@/styles/Home.module.css"

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
  return <div>
    <TextField
      color="alternate"
      inputProps={{
        className: styles.inputTextField
      }}
      onChange={messageChanged}
      value={message}
    />
  </div>
}

export default UserInput
