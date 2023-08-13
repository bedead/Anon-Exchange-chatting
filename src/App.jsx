import React from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Chatroom from './components/Chatroom';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/"
                    element={<Home/>}/>
                <Route path="/chat_room/:roomCode"
                    element={<Chatroom/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App
