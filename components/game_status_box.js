import styles from "@/styles/Home.module.css"
import { HorizontalRule } from "@mui/icons-material"
import { Divider, Stack, Typography } from "@mui/material"

  // Possible states
	// "WAITING_FOR_PLAYERS_TO_JOIN"
	// "WAITING_ON_BOT_TO_ASK_A_QUESTION"
	// "WAITING_ON_BOT_TO_ANSWER"
	// "WAITING_ON_YOU_TO_ASK_A_QUESTION"
	// "WAITING_ON_YOU_TO_ANSWER"
	// "YOU_LOST"
	// "YOU_WON"
	// "TIME_UP"


const GameStatusBox = ({game, errorMessage}) => {
  let displayMessage
  let lastQuestion
  let displayQuestion = false
  let errorMessageJsx = null

  if (game){
    displayMessage = game.displayMessage
    if(game.state === "WAITING_ON_BOT_TO_ANSWER" || game.state === "WAITING_ON_YOU_TO_ANSWER") {
      displayQuestion = true
      lastQuestion = `${game.lastQuestion}`
    } else {
      displayQuestion = false
      lastQuestion = ""
    }
  }

  return (
    <div className={styles.gameStatusBox}>
      <Stack spacing={1}>
        <Typography variant="h6">
          {displayMessage}
        </Typography>
        <Divider variant="fullWidth" />
        <Typography variant="h4">
          {displayQuestion && "Question"}
        </Typography>
        <Typography variant="h5">
          {displayQuestion && lastQuestion}
        </Typography>
        <Typography variant="h6">
          {errorMessage}
        </Typography>
      </Stack>
    </div>

  )
}

export default GameStatusBox
