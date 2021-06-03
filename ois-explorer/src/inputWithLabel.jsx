import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
      display: flex;
      width: fit-content;
      max-width: 50%;
      flex-direction: column;
      padding: 25px;
      position: relative;
      background: #343a40;
      border-radius: 50px
    `;

    const Label = styled.label`
      color: #ffffff;
      background: #343a40;
      font-weight: normal;
      opacity: 0.75;
      order: 1;
      /*outline: 0;*/
      padding-left: 2px;
      pointer-events: none;
      text-shadow: none;
      text-transform: capitalize;
      transform-origin: left top;
      transform: scale(1) translate3d(0, 22px, 0);
      transition: 200ms ease all;
    `;

    const Input2 = styled.input`
      border-radius: 0;
      display: flex;
      font-size: fit-content;
      line-height: 25px;
      text-shadow: none;

      border: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
      background: #343a40;
      color: #FFFFFF;
      flex: 1 1 auto;
      order: 2;

      &:focus {
        outline: 0;
      }

      &:not(:focus) {
        color: transparent;
      }

      &:focus + ${Label} {
        color: #ffffff;
        opacity: 1;
        transform: scale(1) translate3d(0, 5px, 0);
      }
    `;


export function Input(props){
    
 
    const { placeholder, onChange } = props;

    
    
    // const [airnodeConfig, setAirnodeConfig] = useState({
    //   ID: '',
    //   nodeVersion: '',
    //   cloudProvider: '',
    //   region: '',
    //   stage: '',
    //   chainType: '',
    //   chainID: '',
    //   providerURL: '',
    //   providerName: '',
    //   convenienceContract: '',
    //   airnodeContract: '',
    // })
    
    
    
      function setPlaceholder(event){
        let placeholder = document.getElementById('placeholder')
        onChange(event.target.value)
        //placeholder.innerHTML = event.target.value;
        //console.log("VALUE", event.target.value);
      }


    return (
      <Container>
        <Input2 id={placeholder} onChange={
          e => setPlaceholder(e)        }/>
        <Label id="placeholder">{placeholder}</Label>
      </Container>
  );
    
}
  



export default Input;
