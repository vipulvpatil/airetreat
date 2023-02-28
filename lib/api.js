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
  return resJson
}

export default {
  call
}
