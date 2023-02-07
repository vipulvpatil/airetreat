const { TextField, Typography, Stack } = require("@mui/material")
import styles from "@/styles/Home.module.css"

const UserBox = ({bots}) => {
  let chatListJsx
  let botsJsx

  if (bots && bots.length > 0) {
    botsJsx = bots.map((bot, i) => {
      return (
        <div className={styles.botButton} style={{backgroundColor: bots[i].color}} key={i}>
          {bots[i].name}
        </div>
      )
    })
  }

  return (
    <div className={styles.userBox}>
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
