import {useEffect, useMemo, useState} from "react";
import { Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import css from './profile.module.css'
import Pagination from "./Pagination";
import AuthService from "../../services/auth.service";
import noImage from '../../images/realtyObjectImageIfNoImage/realtyObjectNoImage.jpg'



let pageSize = 5;
function Profile (){

   let currentUser=AuthService.getCurrentUser();
   let token=JSON.parse(localStorage.getItem('token'));
   let config={
        headers:{
            Authorization:`${token}`
        }
    }

   const [img,setImg]=useState('http://localhost:8080/images/profile/profile_picture.jpg');
   const [customer,setCustomer]=useState('');
   const [customerRealtyList,setCustomerRealtyList]=useState([]);
   // const [customerAddedToFavorite,setCustomerAddedToFavorite]=useState([]);
   const [customerIdFromUrl,setCustomerIdFromUrl]=useState('');

    let navigate=useNavigate();

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'all'
    });

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return customerRealtyList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, customerRealtyList]);

   // useEffect(()=>{
   //     let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
   //     console.log(url.split('/',4))
   //     let splitUrl=url.split('/',4)
   //     let customerIdFromUrl=splitUrl.slice(-1)
   //     setCustomerIdFromUrl(customerIdFromUrl)
   // },[])
    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    useEffect(()=>{

        console.log(url.split('/',4))
        let splitUrl=url.split('/',4)
        let customerIdFromUrl=splitUrl.slice(-1)
        setCustomerIdFromUrl(customerIdFromUrl)
    },[url])


    useEffect(()=>{
        if(customerIdFromUrl){
            // axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
            AuthService.getCustomer(customerIdFromUrl)
                .then(value => {
                    console.log(value)
                    console.log("f")
                    setCustomer(value.data)
                    setCustomerRealtyList(value.data.my_realty_objectList)
                    // setCustomerAddedToFavorite(value.data.added_to_favorites)


                })
        }

    },[customerIdFromUrl])

    useEffect(()=>{
        if(customerIdFromUrl){
            console.log("useEffect second")
            // axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
            AuthService.getCustomer(customerIdFromUrl)
                .then(value => {
                    if (((currentUser!=null) && (currentUser.id === value.data.id))) {
                        console.log(currentUser)
                        console.log("curr and cus")
                        // console.log(customer)
                        document.getElementById("edit_profile_button").hidden=false;
                        document.getElementById("change_password_profile_button").hidden=false;
                        document.getElementById("delete_profile_button").hidden=false;
                        document.getElementById("saved_objects_button").hidden=false;
                    }
                })
        }
    },[currentUser, customerIdFromUrl,currentUser.id])



    useEffect(()=>{
        let customer_img=`http://localhost:8080/images/${customer.name}${customer.surname}_avatar/${customer.avatar}`;

        if(customer.avatar!=null){
            setImg(customer_img)
        }
    },[customer.avatar, customer.name, customer.surname,url])

    const onUpdateClick = () => {
            navigate(`/${customerIdFromUrl}/updateProfile`)
    }
    const onChangePasswordClick = () => {
       navigate(`/${customerIdFromUrl}/changePassword`)
    }
    const onSavedObjectsClick = () => {
      navigate(`/${customerIdFromUrl}/favoriteObjects`)
    }
    const onDeleteProfileButtonClick = () => {
       let customer= JSON.parse(localStorage.getItem("customer"))
        console.log("delete1")
        if(window.confirm("Ви дійсно хочете видалити профіль?")) {
            try{
                AuthService.deleteProfile(Number(customer.id),config)
                    .then((value) => {
                        console.log("delete2")
                        AuthService.logout()
                        navigate("/")
                    })
            }catch (e){
                console.log(e)
            }
        }
    }
    
    const onContactFormSubmit =  (obj) => {
       console.log("contact form trig")
       console.log(obj)
       alert("Success")
    }


    return (
     <div>
       <div className={css.header_and_form}>
        <div className={css.profile_header}>
            <img className={css.profile_image} src={img} alt="profile_image"/>
            <div>
                <h1>{customer.name}&nbsp;{customer.surname}</h1>
                <div className={css.for_info}>
                    <div className="col-4 text-muted ">Address:</div>
                    <div className="col-8">&nbsp;&nbsp;Lviv</div>
                </div>
                <div className={css.for_info}>
                    <div className="col-4 text-muted ">Phone:</div>
                    <div className="col-8">&nbsp;&nbsp;{customer.phone_number}</div>
                </div>
                <div className={css.for_info}>
                    <div className="col-4 text-muted ">Email:</div>
                    <div className="col-8">&nbsp;&nbsp;{customer.email}</div>
                </div>
                <Button id="edit_profile_button" onClick={onUpdateClick} style={{position:"absolute",top:"216px",right:"1020px"}} variant="success" hidden={true}>Update profile</Button>
                <Button id="change_password_profile_button" onClick={onChangePasswordClick}  style={{position:"absolute",top:"216px",right:"850px"}} variant="success" hidden={true}>Change password</Button>
                <Button id="saved_objects_button" onClick={onSavedObjectsClick} style={{position:"absolute",top:"216px",right:"710px"}} hidden={true}>Saved objects</Button>
                <Button id="delete_profile_button" onClick={onDeleteProfileButtonClick} style={{position:"absolute",top:"216px",right:"570px"}} variant="danger" hidden={true}>Delete profile</Button>
            </div>

        </div>
           <form onSubmit={handleSubmit(onContactFormSubmit)} className={css.form}><br/>
               <p style={{textAlign:"left"}}>Contact with {customer.name} {customer.surname}</p>
               <Form.Group className="mb-3" controlId="formBasicName">
                   <input type="text" name={"name"} placeholder="Enter your name" style={{width:"299px",height:"38px",borderColor:"lightgray",borderRadius:"5px"}}
                          {...register('name',{required:true})}
                   />
                   {errors.name&&<span style={{color:"red"}}>Поле ім'я є обовязковим</span>}
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                   <input type="tel" name="phone_number" placeholder="Enter your phone number" style={{width:"299px",height:"38px",borderColor:"lightgray",borderRadius:"5px"}}
                          {...register('phone_number',{required:true,pattern: /^\d{10}$/})}
                   />
                   {errors.phone_number?.type === 'required' && (
                       <span style={{color:"red"}}>Поле Телефон є обов'язковим</span>
                   )}
                   {errors.phone_number?.type === 'pattern' && (
                       <span style={{color:"red"}}>Неправильний формат Телефону (10 цифр)</span>
                   )}
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                   <input type="email" name="email" placeholder="Enter your email" style={{width:"299px",height:"38px",borderColor:"lightgray",borderRadius:"5px"}}
                          {...register('email',{required:true,pattern: /^\S+@\S+$/i})}/>
                   {errors.email?.type === 'required' && (
                       <span style={{color:"red"}}>Поле Електрона пошта є обов'язковим</span>
                   )}
                   {errors.email?.type === 'pattern' && (
                       <span style={{color:"red"}}>Неправильний формат Електроної пошти</span>
                   )}
               </Form.Group>
               <Form.Group>
                    <textarea className="form-control" name="message" id="exampleFormControlTextarea1" rows="3" placeholder="Enter message" {...register('message',{required:true})}>

                    </textarea>
                   {errors.message && <span style={{color:"red"}}>Поле Повідомлення є обов'язковим</span>}

                   <br/>
               </Form.Group>
               <Button disabled={!isValid} variant="primary" type="submit">
                   Contact with agent
               </Button><br/><br/>

           </form>
      </div>
    <div className={css.my_realty_objects}>
        <h4 style={{display:"flex",marginLeft:"30px"}}>My realty objects({customerRealtyList.length})</h4>
        {currentTableData.map(item=>{
            // let x=`http://localhost:8080/images/${customer.id}id/${item.images[0]}`;
            let x=(item.images[0])?(`http://localhost:8080/images/${customer.id}id/${item.images[0]}`):(noImage);
            let monthOrDay="";
            if(item.price!=null && item.price.type_of_order_of_real_estate==="Rent_for_a_month"){
                monthOrDay="/month";
            }else if(item.price!=null && item.price.type_of_order_of_real_estate==="Rent_per_day"){
                monthOrDay="/day"
            }else {
                monthOrDay=""
            }

            return(
                <div className={css.one_realty}>
                    <div>
                        <span onClick={()=>navigate(`/object/${item.id}`)} style={{cursor:"pointer"}}> <img src={x} width="120px" style={{border:"1px solid black"}} height="93px" alt="realty_image"/></span>
                    </div>
                    <div style={{textAlign:"left",width:"142px"}}>
                        {/*{item.address}*/}
                        <span>{item.real_estate} for {item.price.type_of_order_of_real_estate==="Sell"?"sale":"rent"}</span><br/>
                        <span>{item.price?item.price.sum:"0"} {item.price?item.price.currency:"0"}{monthOrDay?monthOrDay:""}</span>
                    </div>
                    <div style={{textAlign:"left",width:"350px"}}>
                        <span onClick={()=>navigate(`/object/${item.id}`)} style={{cursor:"pointer",color:"blue"}}>
                            <span>{item.address} {item.apt_suite_building},{item.city},{item.district} district</span></span><br/>
                        <span>{item.square} sq.m</span>
                    </div>
                </div>)
        })}
        <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={customerRealtyList.length}
            pageSize={pageSize}
            onPageChange={page => setCurrentPage(page)}
        />
    </div>
</div>

    );

}

export default Profile;