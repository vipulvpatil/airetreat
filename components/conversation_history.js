import styles from "@/styles/Home.module.css"
import { Stack, Typography } from "@mui/material"

const ConversationHistory = ({conversation, bots, playerBot}) => {
  const botMap = {}
  if(bots && bots.length > 0) {
    bots.push(playerBot)
    bots.forEach(bot => {
      botMap[bot.id] = bot
    })
  }

  return (
    <div className={styles.conversationHistoryBox}>
      <Stack spacing={1}>
        {conversation && conversation.map((conversationElement,index) => {
          const bot = botMap[conversationElement.botId]
          if (!bot) {
            return <></>
          }
          let prefix = (
            <Typography variant="body1">
              {"Question"}
            </Typography>
          )
          if(bot && !conversationElement.isQuestion) {
            prefix = (
              <Typography variant="body1">
                {bot.name}
              </Typography>
            )
          }
          return (
            <div className={styles.qna} key={index} style={{backgroundColor: bot.style.color}}>
              <Typography variant="question">
                {prefix}
              </Typography>
              <div/>
              <Typography variant="answer">
                {conversationElement.text}
              </Typography>
            </div>
          )
        })}
      </Stack>
    </div>
  )
}

export default ConversationHistory
