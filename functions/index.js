const { FieldValue } = require('firebase-admin/firestore');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// Initialize GPT-3
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: functions.config().openai.key
});

const openai = new OpenAIApi(config);

// Initialize Firestore
const db = admin.firestore();

// A JSON endpoint that receives a session id, browser id, and answer
exports.answerQuestion = functions.https.onCall(async (data, context) => {
  let sessionId = data.sessionId;
  let browserId = data.browserId;
  const questionId = data.questionId;
  const answer = data.answer;

  if (!browserId) {
    // Add new browser to Firestore
    const browserRef = await db.collection("browsers").add({})
    browserId = browserRef.id;
  }

  if (!sessionId) {
    // Add new session to Firestore
    const sessionRef = await db.collection("browsers").doc(browserId).collection("sessions").add({
      answers: [],
    })
    sessionId = sessionRef.id;
  }

  // Log question id
  functions.logger.log("Question ID: ", questionId);
  const questionRef = db.collection("questions").doc(questionId);
  const question = (await questionRef.get()).data().content;

  const sessionRef = db
    .collection("browsers").doc(browserId)
    .collection("sessions").doc(sessionId);


  const sessionAnswers = (await sessionRef.get()).data().answers;

  sessionAnswers.push(
    { browserId, answer, questionId, question }
  )

  sessionRef.update({
    answers: sessionAnswers,
  });

  
  // get all session answers
  let prompt = "Assistant is playing 20 questions against User. 20 questions is a game where you try to guess what the user is thinking, using previous answers to make increasingly specific guesses.\n\n"

  sessionAnswers.forEach(answer => {
    prompt += `Assistant: ${answer.question}\n`;
    prompt += `User: ${answer.answer ? 'yes' : 'no'}\n`;
  })

  const questionPrefix = "Is it"
  prompt += `Assistant: ${questionPrefix}`;

  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    max_tokens: 100,
    temperature: 0,
    stop: ["User:"]
  });

  const message = response.data.choices[0].text.trim();
  console.log(message)
  let nextQuestion = `${questionPrefix} ${message}`
  
  // Add question to question collection.
  const questionDoc = await db.collection("questions").add({
    content: nextQuestion,
    createdAt: FieldValue.serverTimestamp(),
  });


  return { sessionId, browserId, nextQuestion: nextQuestion, questionId: questionDoc.id };
});
