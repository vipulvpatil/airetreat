import styles from "@/styles/Home.module.css"
import { LinearProgress, Typography } from "@mui/material"
import { useEffect } from "react"

  // Will be in one of 3 states. 
  // 1. Awaiting a question.
  // 2. Awaiting an answer.
  // 3. Waiting on user.

const GameStatusBox = ({status}) => {
  let progressJsx
  
  if (status){
    const timeElapsedPercent = 100*status.currentState.timeElapsed/status.currentState.totalTime
    progressJsx = (
      <div className={styles.timerBar}>
        <LinearProgress variant="determinate" color="error" value={timeElapsedPercent} sx={{height: "10px"}}/>
      </div>
    )
  }

  return (
    <div className={styles.gameStatusBox}>
      <Typography variant="h4">
        Someone is coming up with a question to ask.
      </Typography>
      {progressJsx}
    </div>

  )
}

export default GameStatusBox
