import "animate.css"
import {Stack, Typography} from "@mui/material"
import {useEffect, useState} from "react"
import {getGameStatus} from "@/model/game"
import styles from "@/styles/Home.module.css"

  // Possible states
	// "WAITING_FOR_PLAYERS_TO_JOIN"
	// "WAITING_ON_BOT_TO_ASK_A_QUESTION"
	// "WAITING_ON_BOT_TO_ANSWER"
	// "WAITING_ON_YOU_TO_ASK_A_QUESTION"
	// "WAITING_ON_YOU_TO_ANSWER"
	// "YOU_LOST"
	// "YOU_WON"
	// "TIME_UP"

const GameStatusBox = ({game, bots, flashMessage}) => {
  const [statusMessage, setStatusMessage] = useState("")
  const [displayMessage, setDisplayMessage] = useState("")
  const [statusColor, setStatusColor] = useState(null)
  const [flashEffectClass, setFlashEffectClass] = useState(null)

  useEffect(() => {
    if (game && bots && bots.length > 1){
      const {statusMessage, displayMessage, color} = getGameStatus(game, bots)
      if (flashMessage) {
        setStatusMessage(flashMessage)
        setFlashEffectClass("animate__animated animate__flash animate__infinite")
      } else {
        setStatusMessage(statusMessage)
        setFlashEffectClass(null)
      }
      setDisplayMessage(displayMessage)
      setStatusColor(color)
    }
  }, [game, bots, flashMessage])

  return (
    <div className={styles.gameStatusBox}>
      <Stack>
        <Typography variant="h3" sx={{color: statusColor}}>
          {displayMessage}
        </Typography>
        <div className={`${styles.statusMessage} ${flashEffectClass}`}>
          <Typography variant="h4">
            {statusMessage}
          </Typography>
        </div>
      </Stack>
    </div>
  )
}

export default GameStatusBox
