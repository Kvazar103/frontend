import { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import css from "./slider.module.css";
import noImage from '../../images/realtyObjectImageIfNoImage/realtyObjectNoImage.jpg'
import AuthService from "../../services/auth.service";

export default function RealtySlider(props){

    let {item}=props;
    let images = item.images;
    let [nameSurname,setNameSurname]=useState('');
    let [url,setUrl]=useState('');
    let navigate=useNavigate();

    useEffect(()=>{
        AuthService.getAllCustomers()
            .then((value)=>{
                let customers=value.data;
                for(let customer of customers){
                    let realtyObjectList=customer.my_realty_objectList;
                    if(realtyObjectList!=null){
                        for (let realty of realtyObjectList){
                            if(realty.id===item.id){
                                setNameSurname(customer.id+"id")
                            }
                        }
                    }
                }
            })
    },[item.id])

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/object/"+item.id)
    }
    useEffect(()=>{
        if(nameSurname!==""){
            setUrl((images[0])?(`http://localhost:8080/images/${nameSurname}/${images[0]}`):(noImage))
        }
    },[images, nameSurname])

        return (<div className={css.card} onClick={handleClick} style={{padding:"0px 10px 10px 0px"}}>
            <img src={(nameSurname)?url:noImage} height="175px" width="398px" style={{borderRadius:"18px"}} alt="img"/>
                        <b id="size18">{item.price?item.price.sum:"0"} {item.price?item.price.currency:"0"}</b>
                        <h3>{item.address} </h3>
                        <p>{item.distinct}</p>
                        <p>{item.rooms}rooms * {item.square}square</p>
                    </div>
        );
}