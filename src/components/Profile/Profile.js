import AuthService from "../../services/auth.service";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import css from './profile.module.css'
import {Button, Form, Stack} from "react-bootstrap";
import Pagination from "./Pagination";
// import RealtyObjectPaginationElement from "./RealtyObjectPaginationElement";

let PageSize = 5;
function Profile (){

   // const customer=AuthService.getCurrentUser();

   const [img,setImg]=useState('http://localhost:8080/images/profile/profile_picture.jpg');
   const [customer,setCustomer]=useState('');
   const [customerRealtyList,setCustomerRealtyList]=useState([]);
   const [customerAddedToFavorite,setCustomerAddedToFavorite]=useState([]);
   const [customerIdFromUrl,setCustomerIdFromUrl]=useState('')


    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
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


    useEffect(()=>{
        let customer_img=`http://localhost:8080/images/${customer.name}${customer.surname}_avatar/${customer.avatar}`;

        if(customer.avatar!=null){
            setImg(customer_img)
        }
    },[customer.avatar, customer.name, customer.surname])




    // Get current posts


    return (
        // <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        //     <MDBContainer className="py-5 h-100">
        //         <MDBRow className="justify-content-center align-items-center h-100">
        //             <MDBCol lg="9" xl="7">
        //                 <MDBCard>
        //                     <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
        //                         <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
        //                             <MDBCardImage src={img}
        //                                           alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
        //                             <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
        //                                 Edit profile
        //                             </MDBBtn>
        //                         </div>
        //                         <div className="ms-3" style={{ marginTop: '130px' }}>
        //                             <MDBTypography tag="h5">&nbsp;{customer.name} {customer.surname}</MDBTypography>
        //                             <MDBCardText>last seen</MDBCardText>
        //                         </div>
        //                     </div>
        //                     <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
        //                         <div className="d-flex justify-content-end text-center py-1">
        //                             <div>
        //                                 <MDBCardText className="mb-1 h5">{customerRealtyList.length}</MDBCardText>
        //                                 <MDBCardText className="small text-muted mb-0">My realty</MDBCardText>
        //                             </div>
        //                             <div className="px-3">
        //                                 <MDBCardText className="mb-1 h5">{customerAddedToFavorite.length}</MDBCardText>
        //                                 <MDBCardText className="small text-muted mb-0">Added to favorites objects</MDBCardText>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <MDBCardBody className="text-black p-4">
        //                         <div className="mb-5">
        //                             <p className="lead fw-normal mb-1">About</p>
        //                             <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
        //                                 <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
        //                                 <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
        //                                 <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
        //                             </div>
        //                         </div>
        //                         <div className="d-flex justify-content-between align-items-center mb-4">
        //                             <MDBCardText className="lead fw-normal mb-0">My objects</MDBCardText>
        //                             <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
        //                         </div>
        //                         <MDBRow>
        //                             <MDBCol className="mb-2">
        //                                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
        //                                               alt="image 1" className="w-100 rounded-3" />
        //                             </MDBCol>
        //                             <MDBCol className="mb-2">
        //                                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
        //                                               alt="image 1" className="w-100 rounded-3" />
        //                             </MDBCol>
        //                         </MDBRow>
        //                         <MDBRow className="g-2">
        //                             <MDBCol className="mb-2">
        //                                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
        //                                               alt="image 1" className="w-100 rounded-3" />
        //                             </MDBCol>
        //                             <MDBCol className="mb-2">
        //                                 <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
        //                                               alt="image 1" className="w-100 rounded-3" />
        //                             </MDBCol>
        //                         </MDBRow>
        //                     </MDBCardBody>
        //                 </MDBCard>
        //             </MDBCol>
        //         </MDBRow>
        //     </MDBContainer>
        // </div>
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

            </div>
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
            let x=`http://localhost:8080/images/${customer.name}${customer.surname}/${item.images[0]}`;
            console.log(x)
            console.log(item)
            return(
                <div className={css.one_realty}>
                    <div>
                        <img src={x} width="120px" height="93px"/>
                    </div>
                    <div>
                        {item.address}
                    </div>
                </div>)
        })}
        <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={customerRealtyList.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
        />
    </div>
</div>

    );

}

export default Profile;