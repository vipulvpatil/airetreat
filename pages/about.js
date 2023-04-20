import {Link, Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const About = () => {
  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <div className={styles.title}>
          <Typography variant="h1">About</Typography>
        </div>
        <div className={styles.sectionTitle}>
          <Typography variant="h2">Ai Retreat</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="h3" className={styles.descriptionParagraph}>
            Ai Retreat is an experiment in games powered by OpenAi. Even the image used in the game is generated using AI specifically <Link href="https://openai.com/product/dall-e-2">DallE2</Link>. As a big fan of social deduction games like <Link href="https://boardgamegeek.com/boardgame/41114/resistance">Resistance</Link>, I have always wanted to design one myself. As I played around with OpenAi I saw the potential of a game that involved talking to AI. And thus Ai Retreat was born. This is only the first version of the game and <Link href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}>feedback</Link> I receive could kickstart a second version.
          </Typography>
        </div>
        <div className={styles.sectionTitle}>
          <Typography variant="h2">Me</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="h3" className={styles.descriptionParagraph}>
            My name is Vipul Vinod Patil and I am an software engineer by profession. This is my second project built on OpenAi. The first one is <Link href="https://www.joblead.io">JobLead</Link> which is a simple website that finds jobs matching a given resume. Apart from programming, I also like to write about my experiences at <Link href="https://medium.com/@vipulvpatil">Medium</Link> or follow me on <Link href="https://twitter.com/vipulvpatil">Twitter</Link>
          </Typography>
        </div>
        <div className={styles.sectionTitle}>
          <Typography variant="h2">Thank you</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="h3" className={styles.descriptionBullet} sx={{textAlign: "center"}}>Vipul Vinod Patil</Typography>
          <Typography variant="h3" className={styles.descriptionBullet} sx={{textAlign: "center"}}>vipulvpatil@gmail.com</Typography>
        </div>
      </Stack>
    </div>
  )
}

export default About
