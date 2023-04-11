import BotSelectorDropdown from "@/components/bot_selector_dropdown"

const Test = () => {
  const bots = [
    {
      id: "clg3jftid001iggvksbp6enaa",
      name: "T-800X",
      style: {
        color: "var(--mui-palette-botStyleSelf-main)",
        theme: "botStyleSelf"
      }
    },
    {
      id: "clg3jftid001eggvkycdha7y1",
      name: "GLaDOSE",
      style: {
        color: "var(--mui-palette-botStyle1-main)",
        theme: "botStyle1"
      }
    },
    {
      id: "clg3jftid001fggvkpvsmhwce",
      name: "EVE-a-L",
      style: {
        color: "var(--mui-palette-botStyle2-main)",
        theme: "botStyle2"
      }
    },
    {
      id: "clg3jftid001hggvkarkgqd4r",
      name: "Gart",
      style: {
        color: "var(--mui-palette-botStyle3-main)",
        theme: "botStyle3"
      }
    },
    {
      id: "clg3jftid001iggvksbp6enaq",
      name: "T-3PO",
      style: {
        color: "var(--mui-palette-botStyle4-main)",
        theme: "botStyle4"
      }
    },
  ]

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      height: "500px",
      alignItems: "center"
    }}>
      <BotSelectorDropdown bots={bots}/>
      <BotSelectorDropdown bots={bots} direction="up"/>
    </div>
  )
}

export default Test
