import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const Background = () => {
  return (
    <div className={styles.indexContent}>
      <Stack spacing={2} sx={{alignItems: "center"}}>
        <Typography variant="h6" className={styles.mainText}>This background was generated using <a href="https://openai.com/product/dall-e-2">Dall.E2</a></Typography>
      </Stack>
    </div>
  )
}

export default Background
