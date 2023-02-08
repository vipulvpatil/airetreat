import styles from "@/styles/Home.module.css"
import { Button, Stack, TextField } from "@mui/material"

const SelectedBotBox = ({bot}) => {
  return (
    <div className={styles.selectedBotBox} style={{borderColor: bot.color}}>
      <Stack spacing={1}>
        <Stack className={styles.selectedBotMessageBox} direction="row" spacing={1}>
          <TextField label="question" className={styles.selectedBotMessageTextField} style={{color: bot.color}}>Enter your text here</TextField>
          <Button style={{backgroundColor: bot.color}}>Send</Button>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="space-evenly">
          <Button variant="contained" style={{backgroundColor: bot.color}}>Tag</Button>
          <Button variant="contained">Suggest</Button>
          <Button variant="contained">Help</Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default SelectedBotBox
