import './App.css';
import { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);
  const [history, setHistory] = useState([]);

  const handleNumber = (number) => {
    if (evaluated) {
      setDisplay(number);
      setFormula(number);
      setEvaluated(false);
    } else {
      if (display === '0') {
        setDisplay(number);
        setFormula(number);
      } else {
        setDisplay(display + number);
        setFormula(formula + number);
      }
    }
  };

  const handleOperator = (operator) => {
    if (!evaluated) {
      setFormula(formula + ' ' + operator + ' ');
    } else {
      setFormula(display + ' ' + operator + ' ');
    }
    setDisplay(operator);
    setEvaluated(false);
  };

  const handleDecimal = () => {
    if (evaluated) {
      setDisplay('0.');
      setFormula('0.');
      setEvaluated(false);
    } else {
      if (!display.includes('.')) {
        setDisplay(display + '.');
        setFormula(formula + '.');
      }
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleEquals = () => {
    try {
      let result = eval(formula.replace(/x/g, '*'));
      result = Math.round(result * 10000) / 10000;
      setDisplay(result.toString());
      setFormula(result.toString());
      setEvaluated(true);
      setHistory([
        { formula: formula, result: result.toString() },
        ...history.slice(0, 9)
      ]);
    } catch (error) {
      setDisplay('Error');
      setFormula('');
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div id="display">{display}</div>
        <div className="formula">{formula || '0'}</div>
        <div className="buttons">
          <button id="clear" onClick={handleClear}>AC</button>
          <button id="divide" onClick={() => handleOperator('/')}>/</button>
          <button id="multiply" onClick={() => handleOperator('x')}>x</button>
          <button id="seven" onClick={() => handleNumber('7')}>7</button>
          <button id="eight" onClick={() => handleNumber('8')}>8</button>
          <button id="nine" onClick={() => handleNumber('9')}>9</button>
          <button id="subtract" onClick={() => handleOperator('-')}>-</button>
          <button id="four" onClick={() => handleNumber('4')}>4</button>
          <button id="five" onClick={() => handleNumber('5')}>5</button>
          <button id="six" onClick={() => handleNumber('6')}>6</button>
          <button id="add" onClick={() => handleOperator('+')}>+</button>
          <button id="one" onClick={() => handleNumber('1')}>1</button>
          <button id="two" onClick={() => handleNumber('2')}>2</button>
          <button id="three" onClick={() => handleNumber('3')}>3</button>
          <button id="equals" onClick={handleEquals}>=</button>
          <button id="zero" onClick={() => handleNumber('0')}>0</button>
          <button id="decimal" onClick={handleDecimal}>.</button>
        </div>
      </div>
      
      <div className="history-panel">
        <h3>Historial de Cálculos</h3>
        <div className="history-list">
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-formula">{item.formula}</div>
              <div className="history-result">= {item.result}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
