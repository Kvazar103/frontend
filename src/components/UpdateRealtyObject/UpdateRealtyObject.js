import {Link, Navigate, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import css from "../AddObject/FormStyle.module.css";


export default function UpdateRealtyObject() {

    const navigate=useNavigate();
    let currentUser=AuthService.getCurrentUser();
    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    // console.log(url.split('/',4))
    let arrayOfUrl=url.split('/',4)
    let idFromUrl=arrayOfUrl.slice(-1);
    // console.log(idFromUrl[0])

    const [currentRealtyObject,setCurrentRealtyObject]=useState('');
    const [currentRealtyObjectImages,setCurrentRealtyObjectImages]=useState([]);
    const [realtyImagesUrl,setRealtyImagesUrl]=useState([]);
    const [imageUrlsToDelete,setImageUrlsToDelete]=useState([]);

    const [imagesToAdd,setImagesToAdd]=useState([]);
    const [imagesToShow,setImagesToShow]=useState(undefined);

    const [selectedImages,setSelectedImages]=useState([]);



    useEffect( () => {
         axios.get(`http://localhost:8080/object/${idFromUrl[0]}`)
            .then(value => {
                let c=[]
                setCurrentRealtyObject(value.data)
                for (let x of value.data.images){
                    c.push(`http://localhost:8080/images/${currentUser.id}id/`+x)
                }
                setRealtyImagesUrl(c);
                // console.log(realtyImagesUrl)

            })
    },[currentUser.id, idFromUrl, realtyImagesUrl])

    useEffect(()=>{
        
    },[])


    const [realtyObject, setRealtyObject] = useState({
        district: "",
        address: "",
        apt_suite_building: "",
        rooms:"",
        square:"",
        details:"",
        real_estate:"",
        price:{
            sum:"",
            currency:"",
            type_of_order_of_real_estate:""
        }
    });


    // if((currentUser == null)||(currentUser && ((currentUser.id > idFromUrl[0])||(currentUser.id < idFromUrl[0])))){   ///захист від не авторизованих користувачів
    //     return <Navigate to={"/login"}/>
    // }

    const onSumChange = (e) => {
        setRealtyObject({...realtyObject,price:{
                ...realtyObject.price,
                sum: e.target.value
            }})
    }
    const onCurrencyChange=(e)=>{
        setRealtyObject({...realtyObject,price:{
                ...realtyObject.price,
                currency: e.target.value
            }})
    }
    const onTypeOfRealEstateChange=(e)=>{
        setRealtyObject({...realtyObject,price:{
                ...realtyObject.price,
                type_of_order_of_real_estate: e.target.value
            }})
    }


    const onInputChange = (e) => {
        setRealtyObject({ ...realtyObject, [e.target.name]: e.target.value });
    };


    const onSubmit = async (e) => {
        e.preventDefault();


    };
    
    const onFileChange = (e) => {
        setImagesToAdd(imagesToAdd=>[...imagesToAdd,...e.target.files])
        const selectedFiles=e.target.files;
        const selectedFilesArray=Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    }
    // console.log("selected images")
    // console.log(selectedImages)
    // console.log(imagesToAdd)

    const onDeleteImageClick = (e) => {

        let img=document.getElementById(e.target.value)
        img.hidden=true
        let butt=document.getElementById(e.target.value+"b")
        butt.hidden=true

        console.log("for ee")
        console.log(e)
        console.log(e.target.value)

        setImageUrlsToDelete(imageUrlsToDelete=>[...imageUrlsToDelete,e.target.value])

        console.log(imageUrlsToDelete)
    }
    const onDeleteImageClickTwo = (image) => {
        console.log("for two")
        console.log(image)
        setSelectedImages(selectedImages.filter((e) => e !== image));
        setImagesToAdd(imagesToAdd.filter((e) => e !== image));
        URL.revokeObjectURL(image);
        console.log(selectedImages)
        console.log(imagesToAdd)
        let file=new File([imagesToAdd[0]],"example")
        console.log(file)
    }
    // console.log(selectedImages)

    // console.log("out from function")
    // console.log(selectedImages)
    // console.log(imagesToAdd)

    // console.log("urls to delete")
    // console.log(imageUrlsToDelete)



    return(<div className="container"><br/><br/><br/>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <form className="row g-3" onSubmit={(e)=>onSubmit(e)}>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">City</label>
                            <select id="inputState2" name="city"  className={css.d} >
                                <option defaultValue={"Lviv"}>Lviv</option>

                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">District</label>
                            <select id="inputState2" name="district" value={currentRealtyObject.district} onChange={(e) => onInputChange(e)} className={css.d} >
                                <option defaultValue={""}>Choose District</option>
                                <option value="Galickiy">Galickiy</option>
                                <option value="Zaliznichniy">Zaliznichniy</option>
                                <option value="Lichakivskiy">Lichakivskiy</option>
                                <option value="Sikhivskiy">Sikhivskiy</option>
                                <option value="Frankivskiy">Frankivskiy</option>
                                <option value="Shevchenkivskiy">Shevchenkivskiy</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Street Address</label>
                            <input type="text" className="form-control" name="address" value={currentRealtyObject.address} onChange={(e) => onInputChange(e)} id="inputAddress" placeholder="1234 Main St"/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Apt,suite or building</label>
                            <input type="text" className="form-control" name="apt_suite_building" value={currentRealtyObject.apt_suite_building} onChange={(e) => onInputChange(e)} id="inputAddress2"
                                   placeholder="Apt,suite or building"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputEmail4" className="form-label">Rooms</label>
                            <input type="number" className="form-control" name="rooms" value={currentRealtyObject.rooms} onChange={(e) => onInputChange(e)} id="inputEmail4"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputPassword4" className="form-label">Square</label>
                            <input type="number" className="form-control" name="square" value={currentRealtyObject.square} onChange={(e) => onInputChange(e)} id="inputPassword4"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">Real estate</label>
                            <select id="inputState2" name="real_estate" value={currentRealtyObject.real_estate} onChange={(e) => onInputChange(e)} className={css.d} >
                                <option defaultValue={""}>Choose...</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Garage">Garage</option>
                                <option value="Land">Land</option>
                            </select>
                        </div>
                        <div className="col-12"><br/>
                            Price
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Sum</label>
                            <input type="number" name="sum" value={currentRealtyObject.price?currentRealtyObject.price.sum:""}
                                   onChange={(e) => onSumChange(e)}
                                   className="form-control" id="inputCity"/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Currency</label>
                            <select id="inputState2" name="currency" value={currentRealtyObject.price?currentRealtyObject.price.currency:""}
                                    onChange={(e) => onCurrencyChange(e)}
                                    className={css.c} >
                                <option defaultValue={""}>Choose...</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Type of real estate</label>
                            <select id="inputState" className={css.b} name="type_of_real_estate" value={currentRealtyObject.price?currentRealtyObject.price.type_of_order_of_real_estate:""}
                                    onChange={(e) => onTypeOfRealEstateChange(e)}
                            >
                                <option defaultValue={""}>Choose...</option>
                                <option value="Sell">Sell</option>
                                <option value="Rent_for_a_month">Rent for a month</option>
                                <option value="Rent_per_day">Rent per day</option>
                            </select>
                        </div>
                        <section>
                            <label>
                                + Add Images
                                <br />
                                <span>up to 10 images</span>
                                <input
                                    type="file"
                                    name="images"
                                    onChange={onFileChange}
                                    // value={images}
                                    multiple
                                    accept="image/png , image/jpeg, image/webp"
                                />
                            </label>
                            <br />


            {/*                {selectedImages.length>10?(          <p className="error">*/}
            {/*                    You can't upload more than 10 images! <br />*/}
            {/*                    <span>*/}
            {/*  please delete <b> {selectedImages.length - 10} </b> of them{" "}*/}
            {/*</span>*/}
            {/*                </p>):<div></div>}*/}

                        </section>
                        <div className="col-12">
                            <label htmlFor="inputDetails" className="form-label">Details</label>
                            <textarea style={{width:500,height:200,whiteSpace:"pre-line"}} name="details" value={currentRealtyObject.details} onChange={onInputChange} rows="5" cols="30" placeholder="write something about your object">
                            </textarea>
                        </div>
                        {/*<img id="img" style={{width:"150px",height:"150px"}} src={}/><br/>*/}
                        {/* eslint-disable-next-line array-callback-return */}
                        {selectedImages.map((image,index)=>{

                            // console.log(image)
                            // console.log(43)
                            return (
                                // <div key={image} className="image">
                                //     <img src={image} height="200" alt="upload" />
                                //
                                //
                                // </div>
                                <div>
                                    <img id={`${image}`} style={{width:"400px",height:"210px"}} src={image} height="200" alt="upload" />
                                    <Button id={`${image}b`} value={image} onClick={onDeleteImageClickTwo} variant={'danger'}>delete</Button>
                                </div>
                            );
                        })}
                        {realtyImagesUrl.map(value => {
                            return(<div>
                                <img id={`${value}`} style={{width:"400px",height:"210px"}} src={value}/>
                                <Button id={`${value}b`} value={value} onClick={onDeleteImageClick} variant={'danger'}>delete</Button>
                            </div>)
                        })}
                        {/*{imagesToShow&&(<div><img src={imagesToShow}/></div>)}*/}


                        {/*{selectedImages.length>10?(<div className="col-12">   <br/>*/}
                        {/*    <button type="submit" disabled className="btn btn-primary">Add new object</button>*/}
                        {/*</div>):(<div className="col-12">   <br/>*/}
                        {/*    <button type="submit" className="btn btn-primary">Add new object</button>*/}
                        {/*</div>)}*/}
                    </form>
                </div>
            </div>
        </div>
    );
}