import './app.scss'
import MessagePaneView from './components/message-pane/message-pane'
import NavbarPane from './components/navbar/navbar-pane'
import Sidebar from './components/sidebar/sidebar'

function App() {


  return (
    <>
      <NavbarPane />
      <div className="app">
        <Sidebar />
        <div className="app__content">
          <MessagePaneView />
        </div>
      </div>

    </>
  )
}

export default App
