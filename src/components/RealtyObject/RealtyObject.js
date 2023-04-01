import axios from "axios";
import {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import css from './RealtyObject.module.css'
import {Button, Form} from "react-bootstrap";
import deleteIcon from '../../images/realtyObject_image_icons/delete-1487-svgrepo-com.svg';
import editIcon from '../../images/realtyObject_image_icons/edit-svgrepo-com.svg';
import heartIcon from '../../images/realtyObject_image_icons/heart-01-svgrepo-com.svg';
import heartRedIcon from '../../images/realtyObject_image_icons/heart-red-svgrepo-com.svg';
import reportIcon from '../../images/realtyObject_image_icons/report-flag-1420-svgrepo-com.svg';
import shareIcon from '../../images/realtyObject_image_icons/share-ios-export-svgrepo-com.svg';
import AuthService from "../../services/auth.service";


function RealtyObject(){

    const [realtyObject,setRealtyObject]=useState("");
    const [realtyObjectImages,setRealtyObjectImages]=useState([]);
    const [userObject,setUserObject]=useState("");
    const [nameSurname,setNameSurname]=useState('');
    const [currentIndex, setCurrentIndex] = useState();
    const [phoneNumber,setPhoneNumber]=useState('');
    const [slicedPhoneNumber,setSlicedPhoneNumber]=useState('');

    const [messageInTextArea,setMessageInTextAre]=useState('');
    const [img,setImg]=useState('http://localhost:8080/images/profile/profile_picture.jpg');
    const [typeOfOrder,setTypeOfOrder]=useState('');
    const [monthOrDay,setMonthOrDay]=useState('');
    const [currencySign,setCurrencySign]=useState('');
    const [rooms,setRooms]=useState('');
    const [realtyDetails,setRealtyDetails]=useState('');


    // const currentUser=AuthService.getCurrentUser();
    //
    // console.log("curr")
    // console.log(currentUser)
    // console.log("curr")
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

    useEffect(()=>{
        setMessageInTextAre(`I'm interested in: ${realtyObject.real_estate} that located at the address: ${realtyObject.address},${realtyObject.apt_suite_building}.Please contact me as soon as possible.`)
        // setRealtyDetails(`${realtyObject.details}`)
        setRealtyDetails(realtyObject.details)


    },[realtyObject.address, realtyObject.apt_suite_building, realtyObject.dateOfCreation, realtyObject.details, realtyObject.real_estate])
    useEffect(()=>{
        if(realtyObject.price != null && realtyObject.price.currency === "USD"){
            setCurrencySign("$")
        }else if(realtyObject.price != null && realtyObject.price.currency === "UAH"){
            setCurrencySign("грн")
        }else if(realtyObject.price != null && realtyObject.price.currency === "EUR"){
            setCurrencySign("eur")
        }
        if(realtyObject.price!=null && realtyObject.price.type_of_order_of_real_estate === "Sell"){
            if(realtyObject.real_estate === "House"){
                setTypeOfOrder("House for sale");
                setRooms(realtyObject.rooms+" bedroom")
            }else if(realtyObject.real_estate === "Apartment"){
                setTypeOfOrder("Apartment for sale")
                setRooms(realtyObject.rooms+" bedroom")
            }else if(realtyObject.real_estate==="Garage"){
                setTypeOfOrder("Garage for sale")
            }else if(realtyObject.real_estate==="Land"){
                setTypeOfOrder("Land for sale")
            }
        }else if(realtyObject.price!=null && realtyObject.price.type_of_order_of_real_estate==='Rent_for_a_month'){
            setMonthOrDay("/month")
            if(realtyObject.real_estate === "House"){
                setRooms(realtyObject.rooms+" bedroom")
                setTypeOfOrder("House for rent");
            }else if(realtyObject.real_estate === "Apartment"){
                setRooms(realtyObject.rooms+" bedroom")
                setTypeOfOrder("Apartment for rent")
            }else if(realtyObject.real_estate==="Garage"){
                setTypeOfOrder("Garage for rent")
            }else if(realtyObject.real_estate==="Land"){
                setTypeOfOrder("Land for rent")
            }
        }else if(realtyObject.price!=null && realtyObject.price.type_of_order_of_real_estate==='Rent_per_day'){
            setMonthOrDay("/day")
            if(realtyObject.real_estate === "House"){
                setRooms(realtyObject.rooms+" bedroom")
                setTypeOfOrder("House for rent");
            }else if(realtyObject.real_estate === "Apartment"){
                setRooms(realtyObject.rooms+" bedroom")
                setTypeOfOrder("Apartment for rent")
            }else if(realtyObject.real_estate==="Garage"){
                setTypeOfOrder("Garage for rent")
            }else if(realtyObject.real_estate==="Land"){
                setTypeOfOrder("Land for rent")
            }
        }

    },[ realtyObject.price, realtyObject.real_estate, realtyObject.rooms])

    let currentUser=JSON.parse(localStorage.getItem("customer"));
    console.log("currentUsser")
    // console.log(currentUser)
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
                                setPhoneNumber(customer.phone_number)
                                console.log(phoneNumber)
                                let phoneToString=phoneNumber.toString()
                                console.log(phoneToString)
                                let slicedPhone=phoneToString.slice(0,3)
                                console.log(slicedPhone)
                                setSlicedPhoneNumber(slicedPhone)

                                   if(currentUser!=null && currentUser.id !== customer.id){
                                   console.log("id>")
                                   console.log(currentUser.id)
                                   console.log(customer.id)
                                   console.log("<id")
                                   document.getElementById("delete").hidden=true
                                   document.getElementById("button_for_delete").hidden=true
                                   document.getElementById("edit").hidden=true
                                   document.getElementById("button_for_edit").hidden=true
                                   document.getElementById("buttons").style.marginLeft="140px"
                                }
                            }
                        }
                    }
                }
            })
    },[currentUser, currentUser.id, phoneNumber, realtyObject.id])
    console.log(userObject)
    console.log("uo");
    // useEffect(()=>{
    //
    // },[currentUser.id, userObject.id])

    function handleChange(index) {
        setCurrentIndex(index);
    }

    const renderSlides=realtyObjectImages.map((image)=>(
        <div>
            <br/><br/><br/>
            <img src={`http://localhost:8080/images/${nameSurname}/${image}`} className={css.img}/>

        </div>
    ))

    useEffect(()=>{
        let customer_img=`http://localhost:8080/images/${userObject.name}${userObject.surname}_avatar/${userObject.avatar}`;

        if(userObject.avatar!=null){
            setImg(customer_img)
        }
    },[userObject.avatar, userObject.name, userObject.surname])


    const phoneShow=(e)=>{
        e.preventDefault();//для того, щоб сторінка не перезавантажувалася
        document.getElementById("phone").innerHTML=`+380 ${userObject.phone_number}`
        document.getElementById("butt").hidden=true
    }
    const onHeartClick = (e) => {
      // e.preventDefault();
      //   let x=e.target.getAttribute('src')
        if(e.target.getAttribute('src')===heartIcon){
            e.target.setAttribute('src',heartRedIcon)
        }else {
            e.target.setAttribute('src',heartIcon)
        }


    }

    console.log(typeOfOrder)
    const renderCustomThumbs = () => {  //функція для рендерінгу thumb(картинки під головною картинкою в каруселі) з фіксованою висотою
        const thumbList=realtyObjectImages.map((image,index)=>
            <picture key={index}>
                <source data-srcSet={`http://localhost:8080/images/${nameSurname}/${image}`} type="image/jpg"/>
                <img src={`http://localhost:8080/images/${nameSurname}/${image}`} height="70"/>
            </picture>
        )
        return(thumbList)
    }


    return(
        <div>

        <div className={css.carousel_and_form}>
        <div className="carousel-wrapper" >

        <Carousel
            showArrows={true}
            // autoPlay={true}
            infiniteLoop={true}
            selectedItem={realtyObjectImages[currentIndex]}
            onChange={handleChange}
            // className="carousel-container"
            className={css.carousel_container}
            renderThumbs={renderCustomThumbs}
            
        >
            {renderSlides}
        </Carousel>
        </div>
        <div>
            <Form className={css.form}><br/>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Control type="tel" placeholder="Enter your phone number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter your email" />

                </Form.Group>
                <Form.Group>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={messageInTextArea} placeholder="Enter message">

                    </textarea>
                    <br/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Contact with agent
                </Button><br/><br/>
                <Form.Group className={css.form_image}>
                    <div>
                        <a href={`/${userObject.id}/profile`}>
                    <img src={img} width="80px" height="80px"/>
                        </a>
                    </div>
                    <div className={css.image_in_form}>
                        <div>{userObject.name} {userObject.surname}</div>
                        <div id="phone">+380 {slicedPhoneNumber}...</div>
                        <button id="butt" onClick={phoneShow} className="btn btn-link btn-xs font-normal col-dense-left">Show</button>

                    </div>
                </Form.Group>


            </Form>

        </div>
        </div>
            <div className={css.buttons} id="buttons">
                <Button className={css.button} onClick={onHeartClick} variant="light"><img id="heart" width="24px" height="24px" src={heartIcon}/></Button>
                <Button className={css.button} variant="light"><img width="24px" height="24px" src={shareIcon}/></Button>
                <Button className={css.button} id="button_for_edit" variant="light"><img id="edit" width="24px" height="24px" src={editIcon}/></Button>
                <Button className={css.button} id="button_for_delete" variant="light"><img id="delete" width="24px" height="24px" src={deleteIcon}/></Button>
                <Button className={css.button} variant="light"><img width="24px" height="24px" src={reportIcon}/></Button>

            </div>
            <div className={css.address_and_sum}>
                <div>
                    <h1>{realtyObject.address} street,{realtyObject.apt_suite_building}</h1>
                    <h3 className={css.for_gray}>{realtyObject.city} ,{realtyObject.district} district</h3>
                </div>
                <div>
                    <h1>{realtyObject.price?realtyObject.price.sum:0}{currencySign}{monthOrDay}</h1>
                    <h5 className={css.for_gray}>{typeOfOrder}</h5>
                </div>
            </div>
            <div><br/>
                <h4 className={css.for_h4_ul}>{rooms} {typeOfOrder} {realtyObject.square} sq.m:</h4>
                <div className={css.for_two_ul}>
                <ul className={css.for_ul}>
                    <li className={css.for_li}>Price:{realtyObject.price?realtyObject.price.sum:0}&nbsp;{currencySign}</li>
                    <li className={css.for_li}>Rooms:{realtyObject.rooms}</li>
                    <li className={css.for_li}>Square:{realtyObject.square}</li>
                    <li className={css.for_li}>Created:{realtyObject.dateOfCreation}</li>


                </ul>
                    <ul className={css.for_ul}>
                        <li className={css.for_li}>ID:{realtyObject.id}</li>
                        <li className={css.for_li}>Real&nbsp;estate:{realtyObject.real_estate}</li>
                        <li className={css.for_li}>Last&nbsp;updated:</li>
                        {/*<li className={css.for_li}>Days&nbsp;published:</li>*/}

                    </ul>

                </div>
            </div>
            <div className={css.for_details}>
               {/*<h3 className={css.for_details_h3}>details</h3>*/}
                 <p className={css.p_wrap}>
                     {realtyDetails}
                 </p>
            </div>
        </div>)


}
export default RealtyObject