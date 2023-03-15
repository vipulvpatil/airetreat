import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import styles from "@/styles/Home.module.css"
import BotBox from "@/components/bot_box"
import UserBox from "@/components/user_box"
import GameStatusBox from "@/components/game_status_box"
import { useRouter } from "next/router"
import api from "@/lib/api"
import { loadPlayerData } from "@/lib/local_storage"
import usePoll from "react-use-poll"
import ErrorChecker from "@/common/error_checker"
import ConversationHistory from "@/components/conversation_history"

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
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectedBot, setSelectedBot] = useState(null)
  const [isAnswering, setAnswering] = useState(false)

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
      setBots(botList)
      setErrorMessage(null)
    }
  }, [currentGame])

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
    setErrorMessage(null)
    if(currentGame) {
      if(currentGame.state === "WAITING_ON_YOU_TO_ASK_A_QUESTION") {
        if(bot !== playerBot) {
          setSelectedBot(bot)
        } else if(!selectedBot) {
          setErrorMessage("please select a bot other than yourself")
        }
      } else if (currentGame.state === "WAITING_ON_YOU_TO_ANSWER") {
        if (bot !== playerBot){
          setErrorMessage("you cannot select a bot other than yourself")
        }
      } else {
        setErrorMessage("please wait for your turn")
      }
    }
  }

  return (
    <div>
      <div className={styles.blurBackground}>
        <div className={styles.gameContainer}>
          <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-around">
            <BotBox
              bot={bots[0]}
              addPadding="top"
              selectBot={selectBot}
            />
            <BotBox
              bot={bots[1]}
              selectBot={selectBot}
            />
            <BotBox
              bot={bots[2]}
              selectBot={selectBot}
            />
            <BotBox
              bot={bots[3]}
              addPadding="top"
              selectBot={selectBot}
            />
          </Stack>
          <GameStatusBox game={currentGame} errorMessage={errorMessage}/>
          <ConversationHistory
            conversation={currentGame && currentGame.conversation}
            bots={bots}
            playerBot={playerBot}
          />
          <UserBox
            playerBot={playerBot}
            gameId={currentGame && currentGame.id}
            selectedBot={selectedBot}
            isAnswering={isAnswering}
          />
        </div>
      </div>
    </div>
  )
}

export default Game
