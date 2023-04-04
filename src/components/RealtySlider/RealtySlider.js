import {Component, useEffect, useState} from "react";
import Slider from "react-slick";

import css from "./slider.module.css";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import {useNavigate} from "react-router-dom";


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
        window.location.reload()
    }
    let x=`http://localhost:8080/images/${nameSurname}/${images[0]}`;
    console.log(x)


        return (<div className={css.card} onClick={handleClick}>
                <img src={x} height="175px" width="398px"/>
                        <b class="size18">{item.price?item.price.sum:"0"} {item.price?item.price.currency:"0"}</b>
                        <h3>{item.address} </h3>
                        <p>{item.distinct}</p>
                        <p>{item.rooms}rooms * {item.square}square</p>
                    </div>
        );

}



// import {Button, Card, Carousel} from "react-bootstrap";
// import css from './slider.module.css'
// import {useEffect, useState} from "react";
//
// function RealtySlider() {
//
//     const [realtyObjects,setRealtyObjects]=useState([]);
//
//     let x=[];
//
//       useEffect(()=>{
//           fetch("http://localhost:8080/get12RandomRealtyObject")
//               .then(value => value.json())
//               .then(value => {
//                   setRealtyObjects(value)
//                   // console.log(value);
//
//
//               })
//       },[])
//
//
//     // console.log(realtyObjects)
//     x=realtyObjects
//
//
//     return(<div>
//             {realtyObjects.map((value)=>(
//                     <Carousel>
//                 <Carousel.Item interval={1000}>
//                     <div className={css.slider}>
//                         <div className={css.inCard}>
//                             <img
//                                 className={css.card}
//                                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                                 alt="Second slide"
//                             />
//                             <div className={css.info}>
//                                 <h3>{JSON.stringify(value[0])}</h3>
//                                 {/*<h3>{JSON.stringify(realtyObjects)}</h3>*/}
//                                 {/*<p>{JSON.stringify(realtyObjects)}</p>*/}
//                                 <p>rooms square</p>
//                             </div>
//
//                         </div>
//                         <div>
//                             <img
//                                 className={css.card}
//                                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                                 alt="Second slide"
//                             />
//                             <div className={css.info}>
//                                 <h3>price</h3>
//                                 <h3>Title</h3>
//                                 <p>address</p>
//                                 <p>rooms square</p>
//                             </div>
//                         </div>
//                         <div>
//                             <img
//                                 className={css.card}
//                                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                                 alt="Second slide"
//                             />
//                             <div className={css.info}>
//                                 <h3>price</h3>
//                                 <h3>Title</h3>
//                                 <p>address</p>
//                                 <p>rooms square</p>
//                             </div>
//                         </div>
//                         <div>
//                             <img
//                                 className={css.card}
//                                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                                 alt="Second slide"
//                             />
//                             <div className={css.info}>
//                                 <h3>price</h3>
//                                 <h3>Title</h3>
//                                 <p>address</p>
//                                 <p>rooms square</p>
//                             </div>
//                         </div>
//                     </div>
//
//                 </Carousel.Item>
//                 <Carousel.Item interval={1000}><div className={css.slider}>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//
//                 </div>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//                 </div>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//                 </div>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//                 </div>
//                 </div>
//                 </Carousel.Item>
//                 <Carousel.Item >
//                 <div className={css.slider}>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//
//
//                 </div>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//                 </div>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//                 </div>
//                 <div>
//                 <img
//                 className={css.card}
//                 src="https://www.chapeau-melon.fr/wp-content/uploads/2017/09/800x400.png"
//                 alt="Second slide"
//                 />
//                 <div className={css.info}>
//                 <h3>price</h3>
//                 <h3>Title</h3>
//                 <p>address</p>
//                 <p>rooms square</p>
//                 </div>
//                 </div>
//                 </div>
//
//                 </Carousel.Item>
//                     </Carousel>
//             ))}
//         </div>
//
//     );
//
// }
//
// export default RealtySlider
