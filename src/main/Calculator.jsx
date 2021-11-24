import React, { Component } from "react"
import Button from "../components/button/Button"
import Display from "../components/display/Display"
import './Calculator.css'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  blink: false
}

export default class Calculator extends Component {
  state = { ...initialState }

  clearMemory = () => {
    this.setState({ ...initialState, blink: true })
    setTimeout(() => {
      this.setState({ blink: false })
    }, 75)
  }

  setOperation = (operation) => {
    if (this.state.current === 0) {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
        blink: true
      })

      setTimeout(() => {
        this.setState({ blink: false })
      }, 75)
    }
    else {
      const equals = operation === '='
      const currentOperation = this.state.operation
      const values = [...this.state.values]

      try {
        if (values[1] === 0 && currentOperation === '/') {
          values[0] = 0
        }
        else {
          values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
        }
      }
      catch {
        values[0] = this.state.values[0]
      }

      values[1] = 0

      this.setState({
        blink: true,
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
      
      setTimeout(() => {
        this.setState({ blink: false })
      }, 75)
    }
  }

  setDigit = (n) => {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }

    if (n === '.' && this.state.displayValue === '0') {
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n

    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} blink={this.state.blink} />
        <Button label="AC" click={this.clearMemory} triple></Button>
        <Button label="/" click={this.setOperation} operation></Button>
        <Button label="7" click={this.setDigit}></Button>
        <Button label="8" click={this.setDigit}></Button>
        <Button label="9" click={this.setDigit}></Button>
        <Button label="*" click={this.setOperation} operation></Button>
        <Button label="4" click={this.setDigit}></Button>
        <Button label="5" click={this.setDigit}></Button>
        <Button label="6" click={this.setDigit}></Button>
        <Button label="-" click={this.setOperation} operation></Button>
        <Button label="1" click={this.setDigit}></Button>
        <Button label="2" click={this.setDigit}></Button>
        <Button label="3" click={this.setDigit}></Button>
        <Button label="+" click={this.setOperation} operation></Button>
        <Button label="0" click={this.setDigit} double></Button>
        <Button label="." click={this.setDigit}></Button>
        <Button label="=" click={this.setOperation} operation></Button>
      </div>
    )
  }
}
