import {Stack, Typography} from "@mui/material"
import {useEffect, useState} from "react"
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

const GameStatusBox = ({game, bots}) => {
  const [statusMessage, setStatusMessage] = useState("")
  const [displayMessage, setDisplayMessage] = useState("")
  const [statusColor, setStatusColor] = useState(null)

  useEffect(() => {
    if (game && bots){
      setDisplayMessage(game.displayMessage)
      if(game.state === "YOU_WON"){
        setStatusMessage("You won")
        setStatusColor("var(--mui-palette-alternate-main)")
      } else if(game.state === "YOU_LOST"){
        setStatusMessage("You lost")
        setStatusColor("var(--mui-palette-alternate-main)")
      } else if (game.state === "TIME_UP") {
        setStatusMessage("Time ran out")
        setStatusColor(null)
      } else if(game.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION" || game.state === "WAITING_ON_YOU_TO_ANSWER") {
        setStatusMessage("waiting on you")
        setStatusColor(null)
      } else {
        setStatusMessage("please wait")
        setStatusColor(null)
      }
    }
  }, [game, bots])

  return (
    <div className={styles.gameStatusBox}>
      <Stack>
        <Typography variant="h2" sx={{color: statusColor}}>
          {displayMessage}
        </Typography>
        <div className={styles.statusMessage}>
          <Typography variant="h3">
            {statusMessage}
          </Typography>
        </div>
      </Stack>
    </div>
  )
}

export default GameStatusBox
