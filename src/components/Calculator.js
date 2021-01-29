import { StyledLayout, StyledContent } from './styles/StyledLayout';
import { StyledInput, StyledInputContainer } from './styles/StyledInput';
import { StyledRow } from './styles/StyledRow';
import { StyledButtonContainer, StyledButton } from './styles/StyledButton';
import React, {useEffect, useState, useRef} from 'react';
import doCalculation from '../Calculate';

const Calculator = () => {

  /*
   TODO: 
    1. Add input parenthesis balance check bofore calculate
    2. Add invalid input check before calculate. eg ---, +++, ** etc
  */

  const inputBox = useRef();

  const [input, setInput] = useState('');
  const [position, setPosition] = useState();

  useEffect(() => {
    document.querySelector('#input-box').selectionStart = position;
    document.querySelector('#input-box').selectionEnd = position;
  }, [input]);

  const buttons = [
    ['(', ')', '.', 'AC'],
    ['7', '8', '9', '+'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '*'],
    ['0', '=', '/'],
  ];

  const validKeys = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', '(', ')'
  ]

  const removeKeys = [
    'Delete', 'Backspace'
  ]

  const clickButton = (buttonId) => {
    if (buttonId === 'AC') {
      setInput('');
    } else if (buttonId === '=') {
      setInput(doCalculation(input));
    } else {
      setInput(input + buttonId);
    }
  };

  const removeInput = (e) => {
    let key = e.key;
    if (!removeKeys.includes(key)) {return;}
    let caretPosition = e.target.selectionStart;
    let newInput = '';
    if (key === 'Backspace' && caretPosition !== 0) {
      newInput = input.slice(0,caretPosition-1) + input.slice(caretPosition,);
    } else if (key === 'Delete' && caretPosition !== input.length) {
      newInput = input.slice(0,caretPosition) + input.slice(caretPosition + 1,);
    }
    setInput(newInput);
    setPosition(caretPosition);
  }

  const pressKey = (e) => {
    let key = e.key;
    if (validKeys.includes(key)) {
      setInput(input + key)
    } else if (key === '=' || key === 'Enter') {
      console.log(input)
      setInput(doCalculation(input));
    } else if (removeKeys.includes(key)) {
      removeInput(e);
    } else {
      e.preventDefault();
    }
  };
  
  return(
    <StyledLayout>
      <StyledContent>
        <StyledInputContainer
          onKeyPress={e => pressKey(e)}
          onKeyDown={e => removeInput(e)}
        >
          <StyledInput
            id="input-box"
            type="text"
            ref={inputBox}
            onKeyPress={e => pressKey(e)}
            onKeyDown={e => removeInput(e)}
            value={input}
            autoComplete="off"
          />
        </StyledInputContainer>
        <StyledButtonContainer
          onKeyPress={e => pressKey(e)}
          onKeyDown={e => removeInput(e)}
        >
          <React.Fragment>
            {
              buttons.map(rowIndex => (
                <StyledRow key={rowIndex} >
                  {
                    rowIndex.map(item => 
                      <a href="#" alt={item} onClick={e => clickButton(e.target.id)} className="my-button" id={item}>
                      </a>
                    )
                  }
                </StyledRow>
              ))
            }
          </React.Fragment>
        </StyledButtonContainer>
      </StyledContent>
    </StyledLayout>
  )
};

export default Calculator;