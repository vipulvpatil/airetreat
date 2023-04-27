import {Configuration, OpenAIApi} from "openai"

const newOpenaiClient = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  return new OpenAIApi(configuration)
}

const openaiClient = () => {
  if (!global.openaiClient) {
    console.log("Creating new openai client")

    global.openaiClient = newOpenaiClient()
  }
  return global.openaiClient
}

export const textCompletion = async (prompt) => {
  try{
    const response = await openaiClient().createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 500,
    })
    return response.data.choices[0].text
  } catch (err){
    console.log(err.response)
    return null
  }

}
