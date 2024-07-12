const express = require("express");
const axios = require('axios');
const router = express.Router();

function removeEscapedCharacters(jsonString) {
  return jsonString.replace(/\\[nt]/g, '');
}

async function createMCQ(theme) {
  const requestData = {
    "model": "gpt-3.5-turbo-0125",
    "response_format": { "type": "json_object" },
    "messages": [
      {
        "role": "system",
        "content": "You are an AI made to create MCQ based on a theme given by the user. Output take the form of json with the form {'type':'MCQ', 'Question':'Here is a question','A':'choice A', 'B':'Choice B', 'Response':'The letter of the good response'}."
      },
      {
        "role": "user",
        "content": "Create a question for a MCQ about " + theme + " You will set a random number of choices between 2 and 4."
      }
    ]
  };
  const apiKey = process.env.OPENAI_API_KEY;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers });
    const responseData = response.data['choices'][0]['message']['content'];
    const rep = removeEscapedCharacters(responseData);
    const json = JSON.parse(rep);
    return json;
  } catch (error) {
    console.error(error);
    return "ERROR";
  }
}

async function createTrueFalse(theme) {
  const requestData = {
    "model": "gpt-3.5-turbo-0125",
    "response_format": { "type": "json_object" },
    "messages": [
      {
        "role": "system",
        "content": "You are an AI made to create True/False questions based on a theme given by the user. Output take the form of json with the form {'type':'truefalse', 'Question':'Here is a question','Response':'true/false'}."
      },
      {
        "role": "user",
        "content": "Create a True/False question about " + theme
      }
    ]
  };
  const apiKey = process.env.OPENAI_API_KEY;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers });
    const responseData = response.data['choices'][0]['message']['content'];
    const rep = removeEscapedCharacters(responseData);
    const json = JSON.parse(rep);
    return json;
  } catch (error) {
    console.error(error);
    return "ERROR";
  }
}

router.get("/test", async (req, res) => {
  res.send("hey world");
});

router.post("/createMCQ", async (req, res) => {
  try {
    const theme = req.body.theme;
    const number = req.body.number;
    const truefalse = req.body.truefalse;

    const data = [];
    const questionList = [];

    for (let i = 0; i < number; i++) {
      let question;
      if (truefalse) {
        const isTrueFalse = Math.random() < 0.5;
        if (isTrueFalse) {
          question = await createTrueFalse(theme + " Question must be different than the one in this list: " + questionList.join(", "));
        } else {
          question = await createMCQ(theme + " Question must be different than the one in this list: " + questionList.join(", "));
        }
      } else {
        question = await createMCQ(theme + " Question must be different than the one in this list: " + questionList.join(", "));
      }

      if (question !== "ERROR") {
        data.push(question);
        questionList.push(question.Question);
      } else {
        res.send("ERROR");
        return;
      }
    }

    res.send(data);
  } catch (e) {
    res.send("ERROR");
  }
});

module.exports = router;
