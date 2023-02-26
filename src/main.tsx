import React from 'react'
import ReactDOM from 'react-dom/client'
import {App, AppWrapper} from './App'
import './index.css'

ReactDOM.createRoot(document.getElementsByTagName('body')[0] as HTMLElement).render(
  <React.StrictMode>
    <AppWrapper>
      <App/>
    </AppWrapper>
  </React.StrictMode>,
)
