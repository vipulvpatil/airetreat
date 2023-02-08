import styles from "@/styles/Home.module.css"
import { Button, Stack, TextField } from "@mui/material"

const SelectedBotBox = ({bot}) => {
  return (
    <div className={styles.selectedBotBox} style={{borderColor: bot.style.color}}>
      <Stack spacing={2}>
        <Stack className={styles.selectedBotMessageBox} direction="row" spacing={1}>
          <TextField label="question" className={styles.selectedBotMessageTextField} color={bot.style.theme}/>
          <Button variant="contained" color={bot.style.theme}>Send</Button>
        </Stack>
        <Stack 
          className={styles.selectedBotButtons}
          direction="row"
          justifyContent="space-evenly"
          style={{borderTopColor: bot.style.color}}
        >
          <Button variant="contained" color={bot.style.theme}>Tag</Button>
          <Button variant="contained">Suggest</Button>
          <Button variant="contained">Help</Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default SelectedBotBox
