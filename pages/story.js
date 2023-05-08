import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Rules = () => {
  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
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
