import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from './main/Calculator'
import './fonts.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <h1>Calculadora</h1>
    <Calculator />

    <a href="https://github.com/antonio2696">
      <small>Github: antonio2696</small>
    </a>
  </React.StrictMode>,
  document.getElementById('root')
);
