import ErrorChecker from "@/common/error_checker"
import {resetPlayerData} from "@/lib/local_storage"

const call = async (action, params) => {
  const res = await fetch("/api/game", {method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: action,
      params: params
    })
  })
  const resJson = await res.json()
  if(ErrorChecker.errorIsResetPlayerData(resJson.error)) {
    resetPlayerData()
  }
  return resJson
}

const api = {
  call
}

export default api
