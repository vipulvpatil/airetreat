import { Button, Stack } from "@mui/material"
import { useState } from "react"
import styles from "@/styles/Home.module.css"

const Game = () => {
  const [currentGame, setCurrentGame] = useState(null)

  return (
    <div className={styles.gameBackground}>Game here</div>
  )
}

export default Game
