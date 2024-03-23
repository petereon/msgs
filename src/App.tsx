import MainPane from "./components/main-pane/main-pane";
import Sidebar from "./components/sidebar/sidebar";


function App() {

    return (
        <div className="container">
            <Sidebar />
            <MainPane />
        </div>
    );
}

export default App;
