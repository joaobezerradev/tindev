import styled from 'styled-components';

export const Container = styled.div`
  height:100%;

  display:flex;
  align-items:center;
  justify-content:center;

  form{
    width:100%;
    max-width:300px;

    display:flex;
    flex-direction:column;

    input {
      margin-top:20px;
      border: 1px solid #eee;
      border-radius:4px;
      font-size:16px;
      padding: 0 20px;
      height:48px;
      color:#999;
    }
    
    button {
      margin-top:10px;
      border:0;
      border-radius:4px;
      height:48px;
      font-size:16px;
      background:#DF4723;
      font-weight:bold;
      color:#FFF;
      cursor:pointer;
    }
  }
  
`;
