import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Rules = () => {
  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <div className={styles.title}>
          <Typography variant="h1">Rules</Typography>
        </div>
        <div className={styles.sectionTitle}>
          <Typography variant="h2">Objective</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"Tag the other human before they tag you."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"You only get one attempt."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"If you miss, you lose."}
          </Typography>
        </div>
        <div className={styles.sectionTitle}>
          <Typography variant="h2">Gameplay</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"On your turn, you select a bot and anonymously ask a question."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"When you are asked a question, answer it as soon as possible."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"While answering or asking a question, use help to get an AI generated answer/question. This can only be used a limited number of times in a game."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionBullet}>
            &bull;&nbsp;{"Once you have identified the other human, tag them to end the game."}
          </Typography>
        </div>
        <div className={styles.sectionTitle}>
          <Typography variant="h2">Story</Typography>
        </div>
        <div className={styles.description}>
          <Typography variant="h3" className={styles.descriptionParagraph}>
            {"In the distant future, a race of AI controlled robots called BENEVOLENTs run the world. They perform all the work needed for the betterment of our shared world. Humans are free to pursue their dreams as long as they do not interfere with the work of the BENEVOLENTs. All humans have accepted this fate and most rejoice in it. Not you."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionParagraph}>
            {"You are an enterprising individual who is agitated by this directionless life. After years of subterfuge, you have successfully embedded yourself in the BENEVOLENT community, masquerading as another AI controlled robot working for the City Planning committee. You always wondered if there were other humans who had successfully infiltrated the BENEVOLENTs. Now you know, there is atleast one other."}
          </Typography>
          <Typography variant="h3" className={styles.descriptionParagraph}>
            {"This knowledge has troubled you for weeks. After careful observation, you have narrowed the possible human to be one of these four robots. This company sponsored AI RETREAT is the perfect oppurtunity to identify the human. Everything you have done so far, all that you have achieved could be ruined by one mistake. You have to find the human before they find you and return you to a meaningless existence."}
          </Typography>
        </div>
      </Stack>
    </div>
  )
}

export default Rules
