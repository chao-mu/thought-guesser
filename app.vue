<template>
  <Head>
    <Title>Thought Guesser</Title>
  </Head>
  <div id="app">
    <div>
      <div class="h1">
        Think of something.
      </div>
      <div>
      </div>
    </div>
    <div>
      <div v-if="loading" class="loading">
        Loading
      </div>
      <div v-else-if="error" class="error">
        <div>
          {{ error }}
        </div>
      </div>
      <div v-else class="question">
        <div>
          {{ question }}
        </div>
      </div>
      <div></div>
    </div>
    <div>
      <div class="buttons">
        <button @click="answerYes" type="button">Yes</button>
        <button @click="answerNo" type="button">No</button>
      </div>
      <div>
      </div>
    </div>
    <div>
      <div>
      </div>
      <div class="logo">
      </div>
    </div>
  </div>
</template>

<script setup>
import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
// Initialize Firebase and Firebase Functions
// Import the functions you need from the SDKs you need
import { getAnalytics, logEvent, setUserProperties } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfz08B4YL28zJ_Cn2htXyp9evvgv72WcY",
  authDomain: "thought-guesser.firebaseapp.com",
  projectId: "thought-guesser",
  storageBucket: "thought-guesser.appspot.com",
  messagingSenderId: "322998052824",
  appId: "1:322998052824:web:d99925b5c935bdba3a74ad",
  measurementId: "G-7LKX0FK11J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Functions
const functions = getFunctions(app);

// If development, connect to emulator
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const questionId = ref('lTg7v2eujwqh94To36L9');
const question = ref('Is it an object you can hold in your hand?');
const sessionId = ref('');
const browserId = ref('')
const loading = ref(false);
const error = ref(null);

// On mount
import { onMounted } from 'vue';

onMounted(async () => {
  const analytics = getAnalytics(app);

  logEvent(analytics, 'page_view');
});

useHead({
  htmlAttrs: {
    lang: 'en',
  }
})

const answerQuestion = async (answer) => {
  loading.value = true;

  // Call the "answerQuestion" function from Firebase Functions
  const answerQuestion = httpsCallable(functions, 'answerQuestion');

  if (!browserId.value) {
    browserId.value = localStorage.getItem('browserId');
  }

  const analytics = getAnalytics();

  logEvent(analytics, 'answer_question', {
    question_id: questionId.value,
    answer: answer ? 'yes' : 'no',
    question: question.value,
  });


  await answerQuestion({
    answer: answer,
    questionId: questionId.value,
    sessionId: sessionId.value,
    browserId: browserId.value
  }).then((result) => {
    question.value = result.data.nextQuestion;
    questionId.value = result.data.questionId;
    sessionId.value = result.data.sessionId;
    browserId.value = result.data.browserId;

    error.value = null;
    localStorage.setItem('browserId', browserId.value);
    setUserProperties(analytics, { browser_id: browserId.value });
  }).catch((err) => {
    error.value = "Unexpected error";
  });

  loading.value = false;
}

const answerYes = () => {
  answerQuestion(true)
}

const answerNo = () => {
  answerQuestion(false)
}

</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/ */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    margin-left: 30px;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Custom styles */
  body {
    color: white;
    background-color: #1d1d1d;
    margin: 0;
    /* Space Mono */
    font-family: 'Space Mono', monospace !important;
  }

  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/spacemono/v12/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;

  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    width: 100px;
  }

  .h1 {
    font-size: calc(1.2rem + 1vw);
    font-weight: 700;
    line-height: 1.5;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: calc(1rem + 0.5vw);
    margin-left: 30px;
  }

  #app > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1.2rem;
  }

  #app > div > div:first-child {
    text-align: right;
    padding-right: 1rem;
    width: 50%;
  }

  #app > div > div:last-child {
    text-align: left;
    padding-left: 1rem;
    width: 50%;
  }

  .question,.loading,.error {
    min-height: 80px;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    white-space: pre-wrap;
    min-width: 140px;
  }

  .logo {
    background-image: url(./assets/logo.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: start;
    height: calc(100px + 2.5vw);
  }

  button {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: calc(1rem + 0.5vw);
    font-weight: 700;
    padding: 10px 0 10px 20px;
    text-decoration: underline;
    text-align: right;
  }

  button:first-child {
    margin-right: 1rem;
  }

</style>
