import { Stack, Button } from "@mui/material"
import styles from "@/styles/Home.module.css"

const BotSelector = ({bots, setSelectedBot, playerBot}) => {
  let botRow1
  let botRow2
  const botSelected = (bot) => () => {
    setSelectedBot(bot)
  }

  if (bots && bots.length == 4) {
    botRow1 = []
    botRow1.push(
      <Button
        variant="contained"
        className={styles.botButton}
        color={bots[1].style.theme}
        key={1}
        onClick={botSelected(bots[1])}
      >
        {bots[1].name}
      </Button>
    )
    botRow1.push(
      <Button
        variant="contained"
        className={styles.botButton}
        color={bots[2].style.theme}
        key={2}
        onClick={botSelected(bots[2])}
      >
        {bots[2].name}
      </Button>
    )

    botRow2 = []
    botRow2.push(
      <Button
        variant="contained"
        className={styles.botButton}
        color={bots[0].style.theme}
        key={0}
        onClick={botSelected(bots[0])}
      >
        {bots[0].name}
      </Button>
    )
    botRow2.push(
      <Button
        variant="contained"
        className={styles.botButton}
        color={playerBot.style.theme}
        key={100}
        onClick={botSelected(playerBot)}
      >
        {"self"}
      </Button>
    )
    botRow2.push(
      <Button
        variant="contained"
        className={styles.botButton}
        color={bots[3].style.theme}
        key={3}
        onClick={botSelected(bots[3])}
      >
        {bots[3].name}
      </Button>
    )

    // botsJsx = bots.map((bot, i) => {
    //   return (

    //   )
    // })
  }

  return (
    <>
    <Stack direction="row" justifyContent="space-around">
      {botRow1}
    </Stack>
    <Stack direction="row" justifyContent="space-around">
      {botRow2}
    </Stack>
    </>
  )
}

export default BotSelector
