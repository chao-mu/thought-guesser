<template>
  <div id="app">
    <div>
      <div class="h1">
        Think of something.
      </div>
      <div>
      </div>
    </div>
    <div>
      <div>
        Is it cats?
      </div>
      <div>
      </div>
    </div>
    <div>
      <div class="buttons">
        <button @click="answerYes">Yes</button>
        <button @click="answerNo">No</button>
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
</script>

<style>
  body {
    color: white;
    background-color: #1d1d1d;
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    width: 100px;
  }

  .h1 {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.5;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 1.2rem;
  }

  #app > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1.2rem;
  }

  #app > div > div {
    width: 50%;
  }

  #app > div > div:first-child {
    text-align: right;
    padding-right: 1rem;
  }

  #app > div > div:last-child {
    text-align: left;
    padding-left: 1rem;
  }

  .logo {
    background-image: url(./assets/logo.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: start;
    height: 100px;
  }

  button {
    background-color: #1d1d1d;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    padding: 10px 20px;
    text-decoration: underline;
  }

  button:first-child {
    margin-right: 1rem;
  }

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
    line-height: 1;
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
</style>
