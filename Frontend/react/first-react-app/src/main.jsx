import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

// so here we ware giving reactElement so it will internally break down in that view only
const reactElement = (
  <h1>This is my name </h1>
)

const useElement = "This is i am  injecting"

const ReactElementCreation = React.createElement(
  'a',
  {href : "https://www.google.com",target : "_blank"},
  "Click on this to visit google.com",
  useElement
)
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   {/* <>
  //   <App />
  //   reactElement
  //   </> */}
  // </StrictMode>,
  ReactElementCreation
)

  