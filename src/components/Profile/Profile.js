import AuthService from "../../services/auth.service";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import css from './profile.module.css'
import {Button, Form, Stack} from "react-bootstrap";
import Pagination from "./Pagination";
import {useNavigate} from "react-router-dom";
// import RealtyObjectPaginationElement from "./RealtyObjectPaginationElement";

let pageSize = 5;
function Profile (){

   let currentUser=AuthService.getCurrentUser();

   const [img,setImg]=useState('http://localhost:8080/images/profile/profile_picture.jpg');
   const [customer,setCustomer]=useState('');
   const [customerRealtyList,setCustomerRealtyList]=useState([]);
   const [customerAddedToFavorite,setCustomerAddedToFavorite]=useState([]);
   const [customerIdFromUrl,setCustomerIdFromUrl]=useState('');

   let navigate=useNavigate();


    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return customerRealtyList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, customerRealtyList]);



   useEffect(()=>{
       let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
       console.log(url.split('/',4))
       let splitUrl=url.split('/',4)
       let customerIdFromUrl=splitUrl.slice(-1)
       setCustomerIdFromUrl(customerIdFromUrl)
   },[])


    useEffect(()=>{
        axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
            .then(value => {
                console.log(value)
                setCustomer(value.data)
                setCustomerRealtyList(value.data.my_realty_objectList)
                setCustomerAddedToFavorite(value.data.added_to_favorites)


            })
    },[customerIdFromUrl])

    // useEffect(()=>{
    //       axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
    //         .then(value => {
    //             if (((currentUser!=null) && (currentUser.id !== value.data.id))||(currentUser==null)) {
    //                 console.log(currentUser)
    //                 console.log("curr and cus")
    //                 // console.log(customer)
    //                 document.getElementById("edit_profile_button").hidden=true;
    //             }
    //         })
    //
    // },[currentUser, customer, customer.id, customerIdFromUrl])

    // useEffect(()=>{
    //     // axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
    //     //     .then(value => {
    //     //         if (((currentUser!=null) && (currentUser.id !== value.data.id))||(currentUser==null)) {
    //     //             console.log(currentUser)
    //     //             console.log("curr and cus")
    //     //             // console.log(customer)
    //     //             document.getElementById("edit_profile_button").hidden=true;
    //     //         }
    //     //     })
    //     const fetchCustomer=async ()=>{
    //         let res=await axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
    //                 if (((currentUser!=null) && (currentUser.id === res.data.id))) {
    //                     console.log(currentUser)
    //                     console.log("curr and cus")
    //                     // console.log(customer)
    //                     document.getElementById("edit_profile_button").hidden=false;
    //                 }
    //     };
    //     fetchCustomer();
    //
    // },[currentUser, customer, customer.id, customerIdFromUrl])

    useEffect(()=>{
              axios.get("http://localhost:8080/customer/"+customerIdFromUrl)
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

    },[currentUser, customer, customer.id, customerIdFromUrl])



    useEffect(()=>{
        let customer_img=`http://localhost:8080/images/${customer.name}${customer.surname}_avatar/${customer.avatar}`;

        if(customer.avatar!=null){
            setImg(customer_img)
        }
    },[customer.avatar, customer.name, customer.surname])

    const onUpdateClick = () => {
            navigate(`/${customerIdFromUrl}/updateProfile`)
    }
    const onChangePasswordClick = () => {
       navigate(`/${customerIdFromUrl}/changePassword`)
    }
    const onSavedObjectsClick = () => {
      navigate(`/${customerIdFromUrl}/favoriteObjects`)
    }


    return (
     <div>
       <div className={css.header_and_form}>
        <div className={css.profile_header}>
            <img className={css.profile_image} src={img}/>
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
                <Button id="edit_profile_button" onClick={onUpdateClick} style={{marginRight:"83px",marginTop:"18px"}} variant="success" hidden={true}>Update profile</Button>
                <Button id="change_password_profile_button" onClick={onChangePasswordClick}  style={{position:"absolute",top:"216px",right:"850px"}} variant="success" hidden={true}>Change password</Button>
                <Button id="saved_objects_button" onClick={onSavedObjectsClick} style={{position:"absolute",top:"216px",right:"710px"}} hidden={true}>Saved objects</Button>
                <Button id="delete_profile_button" style={{position:"absolute",top:"216px",right:"570px"}} variant="danger" hidden={true}>Delete profile</Button>
            </div>
            {/*style={{position:"absolute",bottom:"470px",left:"600px"}}*/}
        </div>
           <Form className={css.form}><br/>
               <p style={{textAlign:"left"}}>Contact with {customer.name} {customer.surname}</p>
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
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter message">

                    </textarea>
                   <br/>
               </Form.Group>
               <Button variant="primary" type="submit">
                   Contact with agent
               </Button><br/><br/>

           </Form>
      </div>
    <div className={css.my_realty_objects}>
        <h4 style={{display:"flex",marginLeft:"30px"}}>My realty objects({customerRealtyList.length})</h4>
        {currentTableData.map(item=>{
            let x=`http://localhost:8080/images/${customer.id}id/${item.images[0]}`;
            console.log(x)
            console.log(item)
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
                        <a href={`http://localhost:3000/object/${item.id}`}> <img src={x} width="120px" height="93px"/></a>
                    </div>
                    <div style={{textAlign:"left",width:"142px"}}>
                        {/*{item.address}*/}
                        <span>{item.real_estate} for {item.price.type_of_order_of_real_estate==="Sell"?"sale":"rent"}</span><br/>
                        <span>{item.price?item.price.sum:"0"} {item.price?item.price.currency:"0"}{monthOrDay?monthOrDay:""}</span>
                    </div>
                    <div style={{textAlign:"left",width:"350px"}}>
                        <a href={`http://localhost:3000/object/${item.id}`}>
                            <span>{item.address} {item.apt_suite_building},{item.city},{item.district} district</span></a><br/>
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