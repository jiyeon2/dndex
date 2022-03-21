import '@atlaskit/css-reset';
import React from 'react';
import ReactDOM from 'react-dom';
import ScoreBoard from './score-board/ScoreBoard';

function App() {
  return <ScoreBoard />
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
