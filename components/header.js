
import Image from "next/image"
import styles from "@/styles/Home.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <Image 
        src="/jobleadnewlogo.png" 
        alt="AI Retreat"
        width={114} height={98}
        placeholder="blur"
        blurDataURL={"/jobleadnewlogo.png"}
      />
    </div>
  )
}

export default Header
