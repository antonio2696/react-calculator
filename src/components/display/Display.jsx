import React from "react";
import './Display.css'

function Display(props) {
  return (
    <div className={`display ${props.blink ? 'blink' : ''}`}>{props.value}</div>
  )
}

export default Display
