import {loadPlayerData} from "./local_storage"

const eventMap = {
  GameCreatedEvent: "AIR_GameCreatedEvent",
  GameJoinedEvent: "AIR_GameJoinedEvent",
  QuestionAskedEvent: "AIR_QuestionAskedEvent",
  QuestionAnsweredEvent: "AIR_QuestionAnsweredEvent",
  HelpTakenEvent: "AIR_HelpTakenEvent",
  BotTaggedEvent: "AIR_BotTaggedEvent",
  GameFinishedEvent: "AIR_GameFinishedEvent",
}

export const logAnalyticsEvent = async (window, eventName, session, data = null) => {
  const event = eventMap[eventName]
  if(!event) {
    return
  }
  let eventWithData
  if(data){
    eventWithData = Object.assign({event}, data)
  } else {
    eventWithData = {event}
  }
  const playerData = await loadPlayerData(session)
  const eventIncludingPlayerData = Object.assign(eventWithData, {playerId: playerData.id})
  if (window && window.dataLayer) {
    window.dataLayer.push(eventIncludingPlayerData)
  }
}
