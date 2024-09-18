
import { Provider } from 'react-redux'
import './App.css'
import Routing from './routing/routing'
import { store } from './redux/store'

function App() {


  return (
    <>
      <Provider store={store}>
        <Routing />
      </Provider>
    </>
  )
}

export default App
