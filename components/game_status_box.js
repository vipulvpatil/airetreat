import {Divider, Stack, Typography} from "@mui/material"
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


const GameStatusBox = ({game, statusMessage}) => {
  let displayMessage

  if (game){
    displayMessage = game.displayMessage
  }

  return (
    <div className={styles.gameStatusBox}>
      <Stack spacing={1}>
        <Typography variant="h6">
          {displayMessage}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography variant="h6" className={styles.statusMessage}>
          {statusMessage}
        </Typography>
      </Stack>
    </div>

  )
}

export default GameStatusBox
