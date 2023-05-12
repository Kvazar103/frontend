
import './App.css';

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, Router, Routes} from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";
import Background from "./components/Background/Background";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import AddObject from "./components/AddObject/AddObject";
import RealtyObject from "./components/RealtyObject/RealtyObject";
import RealtyObjectsSlider from "./components/RealtySlider/RealtyObjectsSlider";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import FavoriteObjects from "./components/FavoriteObjects/FavoriteObjects";
import UpdateRealtyObject from "./components/UpdateRealtyObject/UpdateRealtyObject";
import Search from "./components/Search/Search";
import React, {useEffect} from "react";



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
            <Route exact path="/:id/changePassword" element={<ChangePassword/>}/>
            <Route exact path="/:id/favoriteObjects" element={<FavoriteObjects/>}/>
            <Route exact path=":uId/:id/updateRealtyObject" element={<UpdateRealtyObject/>}/>
            <Route exact path=":type/:input/search" element={<Search/>}/>
        </Routes>


        <br/><br/> <br/>
   <Footer/>

    </div>
  );
}

export default App;
