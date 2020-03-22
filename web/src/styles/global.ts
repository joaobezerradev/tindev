import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin:0;
  padding:0;
  outline:0;
  box-sizing:border-box;
}

body,html,#root{
  height:100%;
}

body {
  background:#F5f5f5;
  -webkit-font-smoothing:antialiased;
}
body,input,button{
  font-family:'Roboto',Arial, Helvetica, sans-serif;
}

`;
