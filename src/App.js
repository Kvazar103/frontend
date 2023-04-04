
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
import Profile from "./components/Profile/Profile";
import AddObject from "./components/AddObject/AddObject";
import RealtyObject from "./components/RealtyObject/RealtyObject";
import RealtyObjectsSlider from "./components/RealtySlider/RealtyObjectsSlider";
import UpdateUser from "./components/UpdateUser/UpdateUser";



function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route exact path="/" element={<Background />} />
            <Route exact path="/register" element={<AddUser />} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/:id/profile" element={<Profile/>}/>
            <Route exact path="/:id/addObject" element={<AddObject/>}/>
            <Route exact path="/object/:id" element={<RealtyObject/>}/>
            <Route exact path="/" element={<RealtyObjectsSlider />} />
            <Route exact path="/:id/updateProfile" element={<UpdateUser/>}/>
        </Routes>


        <br/><br/> <br/>
   <Footer/>

    </div>
  );
}

export default App;
