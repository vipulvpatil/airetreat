import styles from "@/styles/Home.module.css"
import { LinearProgress, Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"

  // Will be in one of 3 states. 
  // 1. Awaiting a question.
  // 2. Awaiting an answer.
  // 3. Waiting on user.

const GameStatusBox = ({status}) => {
  const interval = useRef()
  const [timeElapsed, setTimeElapsed] = useState(0)
  let progressJsx

  useEffect(() => {
    let seconds = status.currentState.timeElapsed
    interval.current = setInterval(()=> {
      seconds += 0.1
      if(seconds > 60) {
        seconds -= 60
      }
      setTimeElapsed(seconds)
    }, 100)
    return () => {
      clearInterval(interval.current)
      interval.current = null
    }
  }, [status])
  
  if (status){
    const timeElapsedPercent = 100*timeElapsed/status.currentState.totalTime
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
