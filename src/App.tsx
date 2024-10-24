import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from "./store/store.tsx"
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import Routes from "./routes/index.tsx"
import { GoogleOAuthProvider } from '@react-oauth/google'

const persistor = persistStore(store);
function App() {

  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CookiesProvider>
            <GoogleOAuthProvider clientId='595540796921-m3csasrb56jk6iheq9s4cq7etvdft4m3.apps.googleusercontent.com' >    
              <BrowserRouter>
                <Routes/>
              </BrowserRouter>
              </GoogleOAuthProvider>
          </CookiesProvider>
        </PersistGate> 
      </Provider>
    )
}

export default App
