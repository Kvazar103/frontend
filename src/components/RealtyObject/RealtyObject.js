import axios from "axios";
import {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import css from './RealtyObject.module.css'
import {Alert, Button,Form} from "react-bootstrap";
import deleteIcon from '../../images/realtyObject_image_icons/delete-1487-svgrepo-com.svg';
import editIcon from '../../images/realtyObject_image_icons/edit-svgrepo-com.svg';
import heartIcon from '../../images/realtyObject_image_icons/heart-01-svgrepo-com.svg';
import heartRedIcon from '../../images/realtyObject_image_icons/heart-red-svgrepo-com.svg';
import reportIcon from '../../images/realtyObject_image_icons/report-flag-1420-svgrepo-com.svg';
import shareIcon from '../../images/realtyObject_image_icons/share-ios-export-svgrepo-com.svg';
import closeButton from '../../images/close_icon/211652_close_icon.png';
import copyLinkButton from '../../images/copy_link_icon/copy-link-icon-3.jpg'
import AuthService from "../../services/auth.service";
import realtyObjectNoImage from "../../images/realtyObjectImageIfNoImage/realtyObjectNoImage.jpg";
import {Link, Navigate, useNavigate} from "react-router-dom";
import toast from "bootstrap/js/src/toast";
import modal from "bootstrap/js/src/modal";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CloseButton from 'react-bootstrap/CloseButton';
import { FacebookShareButton, FacebookIcon,TwitterShareButton, TwitterIcon } from 'react-share';
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

    const [userObjectId,setUserObjectId]=useState('');
    const [shareButt,setShareButt]=useState(false);
    const [copy,setCopy]=useState(false);

    let currentUser=AuthService.getCurrentUser();
    let navigate=useNavigate();
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


    },[realtyObject.address, realtyObject.apt_suite_building, realtyObject.details, realtyObject.real_estate])
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

    useEffect( () => {

              axios.get("http://localhost:8080/getAllCustomers")
            .then(value => {

                let customers = value.data
                for (let customer of customers) {
                    let realtyObjectList = customer.my_realty_objectList;
                    if (realtyObjectList != null) {
                        for (let realty of realtyObjectList) {
                            if (realty.id === realtyObject.id) {
                                setUserObject(customer)
                                setUserObjectId(customer.id)
                                setNameSurname(customer.name + customer.surname)
                                setPhoneNumber(customer.phone_number)
                                console.log(phoneNumber)
                                let phoneToString = phoneNumber.toString()
                                console.log(phoneToString)
                                let slicedPhone = phoneToString.slice(0, 3)
                                console.log(slicedPhone)
                                setSlicedPhoneNumber(slicedPhone)
                                if (((currentUser != null) && (currentUser.id !== customer.id)) || (currentUser == null)) {
                                    document.getElementById("delete").hidden = true
                                    document.getElementById("button_for_delete").hidden = true
                                    document.getElementById("edit").hidden = true
                                    document.getElementById("button_for_edit").hidden = true
                                    document.getElementById("buttons").style.marginLeft = "140px"
                                }
                            }
                        }
                    }
                }
            })
    },[currentUser, phoneNumber, realtyObject.id])
    console.log(userObject)
    console.log("uo");

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    function handleChange(index) {
        setCurrentIndex(index);
    }

    const renderSlides=realtyObjectImages.map((image)=>(
      <div>
            <br/><br/><br/>
            <img src={`http://localhost:8080/images/${userObjectId}id/${image}`} className={css.img}/>

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
    const onHeartClick = async (e) => {
        e.preventDefault();
        //   let x=e.target.getAttribute('src')
        const formData=new FormData();
        if (e.target.getAttribute('src') === heartIcon) {
              if(currentUser==null){
                navigate("/login");
            }
            e.target.setAttribute('src', heartRedIcon)
            formData.append("realtyObject",JSON.stringify(realtyObject));
            // formData.append("userObject",JSON.stringify(currentUser));
            await axios.patch(`http://localhost:8080/update/customer/${currentUser.id}/addedToFavoriteList`,formData)
            const c=await axios.get(`http://localhost:8080/customer/${currentUser.id}`)
            localStorage.setItem('customer',JSON.stringify(c.data));
        } else {
            e.target.setAttribute('src', heartIcon)

            await axios.patch(`http://localhost:8080/delete/customer/${currentUser.id}/addedToFavoriteRealtyObject/${realtyObject.id}`)
            const t=await axios.get(`http://localhost:8080/customer/${currentUser.id}`)
            localStorage.setItem('customer',JSON.stringify(t.data));
        }


    }
    const onUpdateRealtyObjectClick = () => {
      navigate(`/${realtyIdFromUrl}/${currentUser.id}/updateRealtyObject`)
    }
    console.log("added to favorite")
    // console.log(currentUser.added_to_favorites)

    if(currentUser && currentUser.added_to_favorites){
        console.log(currentUser.added_to_favorites)
        for(let x of currentUser.added_to_favorites){
            if(x === realtyObject.id){
               let element= document.getElementById("heart")
                element.setAttribute("src",heartRedIcon)
            }
        }
    }


    console.log(typeOfOrder)
    const renderCustomThumbs =() => {  //функція для рендерінгу thumb(картинки під головною картинкою в каруселі) з фіксованою висотою
        const thumbList=realtyObjectImages.map((image,index)=>
            <picture key={index}>
                <source data-srcSet={`http://localhost:8080/images/${userObjectId}id/${image}`} type="image/jpg"/>
                <img src={`http://localhost:8080/images/${userObjectId}id/${image}`} height="70"/>
            </picture>
        )
        return(thumbList)
    }
    
    async function copyToClip(){
        // eslint-disable-next-line no-restricted-globals
        await navigator.clipboard.writeText(location.href);  //copy current url
        setCopy(true);
    }

    const deleteRealtyObject =async (e) => {
        if(window.confirm("Ви дійсно хочете видалити об'єкт?")) {
            try {
                await axios.patch(`http://localhost:8080/customer/${currentUser.id}/realtyObject/${realtyIdFromUrl}`)
            } catch (e) {
                console.log(e)
            }
            const c = await axios.get(`http://localhost:8080/customer/${currentUser.id}`)
            localStorage.setItem('customer', JSON.stringify(c.data))
            navigate(`/${currentUser.id}/profile`)
            window.location.reload();
        }
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
                   <img src={`http://localhost:8080/images/realtyObjectEmptyImages/no_image_found.png`} className={css.img} style={{marginTop:"80px"}}/>

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
                <Button className={css.button} onClick={() => setShareButt(el=>!el)} variant="light"><img width="24px" height="24px" src={shareIcon}/></Button>

                <Button className={css.button} onClick={onUpdateRealtyObjectClick} id="button_for_edit" variant="light"><img id="edit" width="24px" height="24px" src={editIcon}/></Button>
                <Button className={css.button} onClick={deleteRealtyObject} id="button_for_delete" variant="light"><img id="delete" width="24px" height="24px" src={deleteIcon}/></Button>
                <Button className={css.button} onClick={() => setOpen(o => !o)} variant="light"><img width="24px" height="24px" src={reportIcon}/></Button>
                {shareButt&&
                    <div style={{width:"200px",height:"100px",background:"white",marginLeft:"550px",display:"flex",flexDirection:"column",paddingRight:"130px"}}>
                        <FacebookShareButton
                            url={'https://www.example.com'}
                            quote={'Dummy text!'}
                            hashtag="#muo"
                        >
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={'https://www.example.com'}
                            quote={'Dummy text!'}
                            hashtag="#muo"
                        >
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <div style={{display:"flex",marginLeft:"20px"}}>
                            <img src={copyLinkButton} onClick={copyToClip} style={{cursor:"pointer"}} height="24px" width="24px"/>
                            {copy&&<div>&nbsp;&nbsp;copied!</div>}
                        </div>
                        <img src={closeButton} style={{cursor:"pointer",marginLeft:"160px",marginTop:"-88px"}} onClick={()=>{setShareButt(o=>!o)}} width="24px" height="24px"/>

                    </div>}
                {open&&<Popup contentStyle={{ width: "520px",height:"430px",padding:"10px" }} open={open} closeOnDocumentClick onClose={closeModal}>

                          <form >
                              <div style={{display:"flex",gap:"110px"}}> <h3>Повідомити про проблему </h3>
                                  {/*<Button style={{width:"24px",height:"24px",backgroundColor:"white",borderColor:"white",outline:"none"}}  onClick={()=>{setOpen(false)}}><img src={closeButton} width="24px" height="24px"/></Button>*/}
                                <img src={closeButton} style={{cursor:"pointer"}} onClick={()=>{setOpen(false)}} width="24px" height="24px"/>

                              </div>
                              <hr/>
                              <label>Причина</label><br/>
                              <select style={{width:"500px",height:"35px"}}>
                                  <option defaultValue={""}></option>
                                  <option>Об'єкт зданий/проданий</option>
                                  <option>Недоречне оголошення</option>
                                  <option>Спам</option>
                                  <option>Хибні контактні дані</option>
                                  <option>Змінилась ціна</option>
                                  <option>Фото не відповідає дійсності</option>
                                  <option>У автора багато некоректних оголошень</option>
                              </select><br/>
                              <label>Подробиці</label>
                              <textarea style={{width:500,height:100,whiteSpace:"pre-line",borderRadius:"12px"}} name="details" rows="5" cols="30" placeholder="write something about your object"></textarea>
                              <label>Ваш e-mail</label><br/>
                              <input style={{borderRadius:"8px",height:"35px",width:"500px"}} type="email"/><br/><br/>
                              <Button variant="primary" type="submit">
                                  Відправити
                              </Button>&nbsp;&nbsp;
                              <Button variant="outline-secondary" onClick={()=>setOpen(false)}>
                                  Cancel
                              </Button>
                          </form>
                      </Popup>}
                </div>



            {/*</div>*/}
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
                        <li className={css.for_li}>Last&nbsp;updated:{realtyObject.dateOfUpdate}</li>
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