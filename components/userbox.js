import { TextField, Typography, Stack, Button } from "@mui/material"
import styles from "@/styles/Home.module.css"
import { useEffect, useState } from "react"
import SelectedBotBox from "@/components/selected_bot_box"

const UserBox = ({bots}) => {
  const [selectedBot, setSelectedBot] = useState(null)
  let chatListJsx
  let botsJsx
  let selectedBotJsx

  const botSelected = (bot) => () => {
    setSelectedBot(bot)
  }

  if (bots && bots.length > 0) {
    botsJsx = bots.map((bot, i) => {
      return (
        <Button
          variant="contained"
          className={styles.botButton}
          color={bots[i].style.theme}
          key={i}
          onClick={botSelected(bots[i])}
        >
          {bots[i].name}
        </Button>
      )
    })
  }

  if(selectedBot){
    selectedBotJsx = <SelectedBotBox bot={selectedBot}/>
  } else {
    selectedBotJsx = null
  }

  return (
    <div className={styles.userBox}>
      {selectedBotJsx}
      <Stack direction="row" justifyContent="space-around">
        {botsJsx}
      </Stack>
      <div className={styles.userConversation}>
        {chatListJsx}
      </div>
    </div>
  )
}

export default UserBox
