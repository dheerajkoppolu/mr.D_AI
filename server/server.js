import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

 

dotenv.config()

 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const config = {
  model: process.env.MODEL,
  temperature: parseFloat(process.env.TEMPERATURE),
  max_tokens: parseFloat(process.env.MAX_TOKENS),
  top_p: parseFloat(process.env.TOP_P),
  frequency_penalty: parseFloat(process.env.FREQUENCY_PENALTY),
  presence_penalty: parseFloat(process.env.PRESENCE_PENALTY)
}

 

const openai = new OpenAIApi(configuration);

 

const app = express()
app.use(cors())
app.use(express.json())

 

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

 

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

 

    const response = await openai.createCompletion({
      model: config.model,
  prompt: `${prompt}`,
  temperature: config.temperature,
  max_tokens: config.max_tokens,
  top_p: config.top_p,
  frequency_penalty: config.frequency_penalty,
  presence_penalty: config.presence_penalty
    });

 

    res.status(200).send({
      bot: response.data.choices[0].text
    });

 

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})
app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
