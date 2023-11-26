import './app.scss'
import MessagePaneView from './components/message-pane/message-pane'
import NavbarPane from './components/navbar/navbar-pane'
import SidebarPane from './components/sidebar/sidebar-pane'

function App() {


  return (
    <>
      <NavbarPane />
      <div className="app">
        <SidebarPane />
        <div className="app__content">
          <MessagePaneView />
        </div>
      </div>

    </>
  )
}

export default App
