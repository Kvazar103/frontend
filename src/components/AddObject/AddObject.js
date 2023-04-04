import {Button, Col, Form, Row} from "react-bootstrap";
import css from './FormStyle.module.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import realtyObject from "../RealtyObject/RealtyObject";


export default function AddObject(){

    let navigate = useNavigate();

    const [object,setObject]=useState({
        district:"",
        address:"",
        apt_suite_building:"",
        rooms:"",
        square:"",
        details:"",
        real_estate:"",
        price:{
            sum:"",
            currency:"",
            type_of_order_of_real_estate:""
        }
    })
    const [images,setImages]=useState('');
    const [selectedImages, setSelectedImages] = useState([]);


    const handleSave =async (e) => {
        e.preventDefault();

        const customer=JSON.parse(localStorage.getItem("customer"));
        const formData = new FormData();
        formData.append("body",JSON.stringify(object))
        for (let i = 0; i < images.length; i++) {
            formData.append(`images`, images[i])
        }
        // formData.append("images", images[0]);
        console.log(images[0])
        console.log(object)
        // formData.append("body",JSON.stringify(object));
        await axios.post(`http://localhost:8080/${customer.id}/addObject`,formData)
        // await AuthService.saveObjectV2(object, formData)
        const c= await axios.get(`http://localhost:8080/customer/${customer.id}`);

        localStorage.setItem('customer', JSON.stringify(c.data));
        console.log(c.data.my_realty_objectList)
        // setRealtyList(c.data.my_realty_objectList)
        let realtyList=c.data.my_realty_objectList;
        console.log(realtyList)
        let lastElement=realtyList.slice(-1)
        console.log(lastElement[0].id)

        navigate(`/object/${lastElement[0].id}`)
        window.location.reload()
    }

    const onInputChange = (e) => {    ///обовязкове інакше поля просто будуть read only
        setObject({ ...object,[e.target.name]: e.target.value });
    };
    const onSumChange = (e) => {
        setObject({...object,price:{
                ...object.price,
                sum: e.target.value
            }})
    }
    const onCurrencyChange=(e)=>{
        setObject({...object,price:{
                ...object.price,
                currency: e.target.value
            }})
    }
    const onTypeOfRealEstateChange=(e)=>{
        setObject({...object,price:{
                ...object.price,
                type_of_order_of_real_estate: e.target.value
            }})
    }

    const onFileChangeHandler=(e)=>{


        setImages(e.target.files);


        const selectedFiles = e.target.files;

        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));

        // FOR BUG IN CHROME
        // event.target.value = "";

    }

    return(<div className="container">
            <br/><br/><br/><br/>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <form className="row g-3" onSubmit={(e)=>handleSave(e)}>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">City</label>
                            <select id="inputState2" name="city"  className={css.d} >
                                <option defaultValue={"Lviv"}>Lviv</option>

                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">District</label>
                            <select id="inputState2" name="district" value={object.district} onChange={(e) => onInputChange(e)} className={css.d} >
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
                            <input type="text" className="form-control" name="address" value={object.address} onChange={(e) => onInputChange(e)} id="inputAddress" placeholder="1234 Main St"/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Apt,suite or building</label>
                            <input type="text" className="form-control" name="apt_suite_building" value={object.apt_suite_building} onChange={(e) => onInputChange(e)} id="inputAddress2"
                                   placeholder="Apt,suite or building"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputEmail4" className="form-label">Rooms</label>
                            <input type="number" className="form-control" name="rooms" value={object.rooms} onChange={(e) => onInputChange(e)} id="inputEmail4"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputPassword4" className="form-label">Square</label>
                            <input type="number" className="form-control" name="square" value={object.square} onChange={(e) => onInputChange(e)} id="inputPassword4"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">Real estate</label>
                            <select id="inputState2" name="real_estate" value={object.real_estate} onChange={(e) => onInputChange(e)} className={css.d} >
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
                            <input type="number" name="sum" value={object.price.sum} onChange={(e) => onSumChange(e)}  className="form-control" id="inputCity"/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Currency</label>
                            <select id="inputState2" name="currency" value={object.price.currency} onChange={(e) => onCurrencyChange(e)} className={css.c} >
                                <option defaultValue={""}>Choose...</option>
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="UAH">UAH</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">Type of real estate</label>
                            <select id="inputState" className={css.b} name="type_of_real_estate" value={object.price.type_of_order_of_real_estate} onChange={(e) => onTypeOfRealEstateChange(e)}>
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
                                    onChange={onFileChangeHandler}
                                    // value={images}
                                    multiple
                                    accept="image/png , image/jpeg, image/webp"
                                />
                            </label>
                            <br />

                            {selectedImages.length>10?(          <p className="error">
                                You can't upload more than 10 images! <br />
                                <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
                            </p>):<div></div>}

                        </section>
                        <div className="col-12">
                            <label htmlFor="inputDetails" className="form-label">Details</label>
                            <textarea style={{width:500,height:200,whiteSpace:"pre-line"}} name="details" onChange={onInputChange} rows="5" cols="30" placeholder="write something about your object">
                            </textarea>
                        </div>

                        {selectedImages.length>10?(<div className="col-12">   <br/>
                            <button type="submit" disabled className="btn btn-primary">Add new object</button>
                        </div>):(<div className="col-12">   <br/>
                            <button type="submit" className="btn btn-primary">Add new object</button>
                        </div>)}
                    </form>
                </div>
            </div>
    </div>

    )
}