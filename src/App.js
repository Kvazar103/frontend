
import './App.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Router, Routes} from "react-router-dom";
import Home from "./components/Home"
import lviv_sunrises_and_sunsets from './images/lviv_city/lviv_sunrises_and_sunsets.jpg';
import css from './images/lviv_city/lviv_sunrises_and_sunsets.module.css'
import Recommended_offers from "./components/Recommended_offers/Recommended_offers";
import AddUser from "./components/AddUser/AddUser";
import Background from "./components/Background/Background";
import Login from "./components/Login/Login";


function App() {
  return (
    <div className="App">
        <Header/>
        {/*<img src={lviv_sunrises_and_sunsets} alt={"lviv_background"} className={css.lviv_sunrises_and_sunsets}/>*/}
        <Routes>
            <Route exact path="/" element={<Background />} />

            <Route exact path="/register" element={<AddUser />} />
            <Route exact path="/login" element={<Login/>}/>
        </Routes>
<Footer/>
    </div>
  );
}

export default App;
