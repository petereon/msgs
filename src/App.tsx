import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";
import Editor from "./components/editor/editor";
import HookCreator from "./components/editor-creator/hook-creator";


function App() {

    return (
        <div className="container">
            <Navbar />

            <div className='main-pane'>
                <Sidebar />
                <BrowserRouter>
                    <Routes>
                        <Route path='/hook' element={<HookCreator />} />
                        <Route path='/hook/:id' element={<Editor />} />
                        <Route path="*" element={<Navigate to='/hook' />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
