import styles from "@/styles/Home.module.css"
import { Divider, Stack, Typography } from "@mui/material"

const ConversationHistory = ({conversation}) => {
  return (
    <div className={styles.conversationHistoryBox}>
      {"ConversationHistory"}
      <Divider variant="fullWidth" />
      <Stack spacing={1}>
        {conversation && conversation.map(message => {
          return (
            <Typography variant="h6">
              {message}
            </Typography>
          )
        })}
      </Stack>
    </div>
  )
}

export default ConversationHistory
