import axios from "axios";
import {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import css from './RealtyObject.module.css'


function RealtyObject(){

    const [realtyObject,setRealtyObject]=useState("");
    const [realtyObjectImages,setRealtyObjectImages]=useState([]);
    const [userObject,setUserObject]=useState("");
    const [nameSurname,setNameSurname]=useState('');
    const [currentIndex, setCurrentIndex] = useState();


    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    console.log(url.substring(29));
    let realtyIdFromUrl=url.substring(29);
    useEffect(()=>{
        axios.get("http://localhost:8080/object/"+realtyIdFromUrl)
            .then(value => {
                setRealtyObject(value.data)
                console.log(value.data)
                setRealtyObjectImages(value.data.images)

            })
      },[realtyIdFromUrl])

    // console.log(realtyObject)

    useEffect(()=>{
        axios.get("http://localhost:8080/getAllCustomers")
            .then(value => {
                let customers=value.data
                for(let customer of customers){
                    let realtyObjectList=customer.my_realty_objectList;
                    if(realtyObjectList!=null){
                        for (let realty of realtyObjectList){
                            if(realty.id===realtyObject.id){
                                setUserObject(customer)
                                setNameSurname(customer.name+customer.surname)
                            }
                        }
                    }
                }
            })
    },[realtyObject.id])
    // console.log(userObject)

    function handleChange(index) {
        setCurrentIndex(index);
    }


    const renderSlides=realtyObjectImages.map((image)=>(
        <div>
            <br/><br/><br/>
            <img src={`http://localhost:8080/images/${nameSurname}/${image}`} className={css.img}/>
        </div>
    ))


    return(
        <div className={css.carousel}>
        <Carousel
            showArrows={true}
            // autoPlay={true}
            infiniteLoop={true}
            selectedItem={realtyObjectImages[currentIndex]}
            onChange={handleChange}
            className="carousel-container"
        >
            {renderSlides}
        </Carousel>
            </div>)


}
export default RealtyObject