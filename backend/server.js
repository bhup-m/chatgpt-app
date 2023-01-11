import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
//1
dotenv.config();

//2
const app = express();
app.use(cors());
app.use(express.json());

//4
app.get('/', async (req, res) => {
    res.status(200).send({
        message: "This is ChatGPT AI App"
    });
});

//6
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



//5
app.post('/', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.input,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        console.log("PASSED:", req.body.input)
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log("FAILED:",req.body.input)
        console.log(error);
        res.status(500).send(error)
    }
})
//3
app.listen(4000, () => console.log('Server is running on prot 4000'));

