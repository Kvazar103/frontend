import { useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import css from "./slider.module.css";


export default function RealtySlider(props){

    let {item}=props;
    let images = item.images;
    let [nameSurname,setNameSurname]=useState('');
    let [user,setUser]=useState({});
    let navigate=useNavigate();

    useEffect(()=>{
        let allCustomers=axios.get("http://localhost:8080/getAllCustomers")
        allCustomers.then(value => {
            let customers=value.data;
            for(let customer of customers){
                let realtyObjectList=customer.my_realty_objectList;
                if(realtyObjectList!=null){
                    for (let realty of realtyObjectList){
                        // console.log(realty)
                        if(realty.id===item.id){
                            console.log(realty)
                            setNameSurname(customer.id+"id")
                            setUser(customer)
                        }
                    }
                }
            }
        })
    },[item.id])

    console.log(nameSurname.toString())

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/object/"+item.id)
        // window.location.reload()
    }
    let x=`http://localhost:8080/images/${nameSurname}/${images[0]}`;
    console.log(x)


        return (<div className={css.card} onClick={handleClick} style={{padding:"0px 10px 10px 0px"}}>
                <img src={x} height="175px" width="398px" style={{borderRadius:"18px"}}/>
                        <b class="size18">{item.price?item.price.sum:"0"} {item.price?item.price.currency:"0"}</b>
                        <h3>{item.address} </h3>
                        <p>{item.distinct}</p>
                        <p>{item.rooms}rooms * {item.square}square</p>
                    </div>
        );

}

