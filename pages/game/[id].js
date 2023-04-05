import {useEffect, useState} from "react"
import ErrorChecker from "@/common/error_checker"
import GameStatusBox from "@/components/game_status_box"
import SelectedBotBox from "@/components/selected_bot_box"
import {Stack} from "@mui/material"
import UserBox from "@/components/user_box"
import UserInput from "@/components/user_input"
import api from "@/lib/api"
import {createFullConversationForGame} from "@/common/chat_formatter"
import {loadPlayerData} from "@/lib/local_storage"
import styles from "@/styles/Home.module.css"
import usePoll from "react-use-poll"
import {useRouter} from "next/router"

const botStyles = [
  {
    theme: "botStyle1",
    color: "var(--mui-palette-botStyle1-main)",
  },
  {
    theme: "botStyle2",
    color: "var(--mui-palette-botStyle2-main)",
  },
  {
    theme: "botStyle3",
    color: "var(--mui-palette-botStyle3-main)",
  },
  {
    theme: "botStyle4",
    color: "var(--mui-palette-botStyle4-main)",
  },
  {
    theme: "botStyleSelf",
    color: "var(--mui-palette-botStyleSelf-main)",
  },
]

const Game = () => {
  const router = useRouter()

  const [bots, setBots] = useState([])
  const [currentGame, setCurrentGame] = useState(null)
  const [playerBot, setPlayerBot] = useState(null)
  const [gameId, setGameId] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const [selectedBot, setSelectedBot] = useState(null)
  const [isAnswering, setAnswering] = useState(false)
  const [fullConversation, setFullConversation] = useState(null)

  let selectedBotJsx = null

  useEffect(() => {
    if(router.query && router.query.id) {
      setGameId(router.query.id)
    }
  }, [router])

  const updateCurrentGameIfStateChanged = async (gameId, existingGameState) => {
    const game = await getGame(gameId)
    if (game && existingGameState !== game.state){
      setCurrentGame(game)
    }
  }

  const getGame = async (gameId) => {
    const playerData = await loadPlayerData()
    const resp = await api.call("getGame", {gameId, playerId: playerData.id})
    if(resp.error) {
      if(ErrorChecker.errorIsNotFound(resp.error)){
        router.push("/games")
      }
      console.log(resp.error)
    } else {
      const game = Object.assign(resp.result.game, {id: gameId})
      return game
    }
  }

  usePoll(() => {
    if(gameId) {
      const currentGameState = currentGame && currentGame.state
      updateCurrentGameIfStateChanged(gameId, currentGameState)
    }
  }, [gameId, currentGame], {interval: 1000})

  useEffect(() => {
    if(currentGame && currentGame.bots && currentGame.myBotId) {
      const otherBots = []
      currentGame.bots.forEach(bot => {
        if (bot.id === currentGame.myBotId) {
          Object.assign(bot, {style: botStyles[4]})
          setPlayerBot(bot)
        } else {
          otherBots.push(bot)
        }
      })
      const botList = otherBots.map((bot, index) => {
        return Object.assign(bot, {style: botStyles[index]})
      })
      console.log(botList)
      console.log(playerBot)
      setBots(botList)
      if(currentGame.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION" || currentGame.state === "WAITING_ON_YOU_TO_ANSWER") {
        setStatusMessage("waiting on you")
      } else {
        setStatusMessage("please wait")
      }
    }
  }, [currentGame])

  useEffect(() => {
    if(currentGame && bots && playerBot) {
      setFullConversation(createFullConversationForGame(currentGame.conversation, bots, playerBot))
    }
  }, [currentGame, bots, playerBot])

  useEffect(() => {
    if(currentGame) {
      if(currentGame.state === "WAITING_ON_YOU_TO_ANSWER"){
        setSelectedBot(playerBot)
        setAnswering(true)
      } else if(currentGame.state !== "WAITING_ON_YOU_TO_ASK_A_QUESTION") {
        setSelectedBot(null)
        setAnswering(false)
      } else {
        setAnswering(false)
      }
    } else {
      setSelectedBot(null)
      setAnswering(false)
    }
  })

  const selectBot = (bot) => {
    if(currentGame) {
      if(currentGame.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION") {
        if(bot !== playerBot) {
          setSelectedBot(bot)
        } else if(!selectedBot) {
          setStatusMessage("please select a bot other than yourself")
        }
      } else if (currentGame.state === "WAITING_ON_YOU_TO_ANSWER") {
        if (bot !== playerBot){
          setStatusMessage("you cannot select a bot other than yourself")
        }
      } else {
        setStatusMessage("please wait for your turn")
      }
    }
  }

  if(selectedBot){
    selectedBotJsx =
      <SelectedBotBox
        bot={selectedBot}
        gameId={gameId}
        textFieldLabel={isAnswering?"answer":"question"}
      />
  } else {
    selectedBotJsx = null
  }

  return (
    <div>
      <Stack sx={{alignItems: "center"}}>
        <GameStatusBox game={currentGame} statusMessage={statusMessage}/>
        <div className={styles.chatContainer}>
          <div className={styles.filterBackgroundImage}>
            Chat here.
          </div>
        </div>
        <UserInput/>
      </Stack>
      <div className={styles.blurBackground}>
        <div className={styles.gameContainer}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
            <Stack direction="column" spacing={2}>

              <UserBox
                playerBot={playerBot}
                fullConversation={fullConversation}
              />
            </Stack>
          </Stack>
          {selectedBotJsx}
        </div>
      </div>
    </div>
  )
}

export default Game
