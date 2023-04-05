import BotSelector from "@/components/bot_selector"

const Test = () => {
  const bots = [
    {
      id: "clg3jftid001eggvkycdha7y1",
      botMessages: [],
      name: "GLaDOSE",
      style: {
        color: "var(--mui-palette-botStyle1-main)",
        theme: "botStyle1"
      }
    },
    {
      id: "clg3jftid001fggvkpvsmhwce",
      botMessages: [],
      name: "EVE-a-L",
      style: {
        color: "var(--mui-palette-botStyle2-main)",
        theme: "botStyle2"
      }
    },
    {
      id: "clg3jftid001hggvkarkgqd4r",
      botMessages: [],
      name: "Gart",
      style: {
        color: "var(--mui-palette-botStyle3-main)",
        theme: "botStyle3"
      }
    },
    {
      id: "clg3jftid001iggvksbp6enaq",
      botMessages: [],
      name: "T-3PO",
      style: {
        color: "var(--mui-palette-botStyle4-main)",
        theme: "botStyle4"
      }
    },
  ]

  const playerBot = {
    id: "clg3jftid001iggvksbp6enaa",
    botMessages: [],
    name: "T-800X",
    style: {
      color: "var(--mui-palette-botStyleSelf-main)",
      theme: "botStyleSelf"
    }
  }

  return (
    <div>
      <BotSelector defaultBot={playerBot} otherBots={bots}/>
    </div>
  )
}

export default Test
