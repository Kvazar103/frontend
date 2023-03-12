import {Button, Col, Form, Row} from "react-bootstrap";
import css from './FormStyle.module.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function AddObject(){

    let navigate = useNavigate();

    const [object,setObject]=useState({
        address:"",
        distinct:"",
        rooms:"",
        square:"",
        real_estate:"",
        price:{
            sum:"",
            currency:"",
            type_of_order_of_real_estate:""
        },
        images:""
    })



    const handleSave =async (e) => {
      e.preventDefault();
        const customer=JSON.parse(localStorage.getItem("customer"));
      await axios.post(`http://localhost:8080/${customer.id}/addObject`,object)
      const c= await axios.get(`http://localhost:8080/customer/${customer.id}`);
        localStorage.setItem('customer', JSON.stringify(c.data));
        navigate("/object/:id")
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
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        setObject({...object,[event.target.name]:event.target.files})
        // const selectedFiles = event.target.files;
        // const selectedFilesArray = Array.from(selectedFiles);
        //
        // const imagesArray = selectedFilesArray.map((file) => {
        //     return URL.createObjectURL(file);
        //
        // });
        //
        // setSelectedImages((previousImages) => previousImages.concat(imagesArray));
        //
        // // FOR BUG IN CHROME
        // event.target.value = "";
    };

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }


    return(<div className="container">
            <br/><br/><br/><br/>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <form className="row g-3" onSubmit={(e)=>handleSave(e)}>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Address</label>
                <input type="text" className="form-control" name="address" value={object.address} onChange={(e) => onInputChange(e)} id="inputAddress" placeholder="1234 Main St"/>
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">Distinct</label>
                <input type="text" className="form-control" name="distinct" value={object.distinct} onChange={(e) => onInputChange(e)} id="inputAddress2"
                       placeholder="Apartment, studio, or floor"/>
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
                    <option>...</option>
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
                    <option>...</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                </select>
            </div>
            <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">Type of real estate</label>
                <select id="inputState" className={css.b} name="type_of_real_estate" value={object.price.type_of_order_of_real_estate} onChange={(e) => onTypeOfRealEstateChange(e)}>
                    <option defaultValue={""}>Choose...</option>
                    <option>...</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent_for_a_month">Rent for a month</option>
                    <option value="Rent_per_day">Rent per day</option>
                </select>
            </div>
            {/*<div>*/}
            {/*    <div>*/}
            {/*        add photos*/}
            {/*    </div>*/}
            {/*    <input type="file"/>*/}
            {/*</div>*/}
            <section>
                <label>
                    + Add Images
                    <br />
                    <span>up to 10 images</span>
                    <input
                        type="file"
                        name="images"
                        onChange={onInputChange}
                        value={object.images}
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

                <div className="images">
                    {selectedImages &&
                        selectedImages.map((image, index) => {
                            return (
                                <div key={image} className="image">
                                    <img src={image} height="200" alt="upload" />
                                    <button onClick={() => deleteHandler(image)}>
                                        delete image
                                    </button>
                                    <p>{index + 1}</p>
                                </div>
                            );
                        })}
                </div>
            </section>



            {selectedImages.length>10?(<div className="col-12">   <br/>
                <button type="submit" disabled className="btn btn-primary">Add new object</button>
            </div>):(<div className="col-12">   <br/>
                <button type="submit" className="btn btn-primary">Add new object</button>
            </div>)}
        </form>
                </div></div></div>

    )
}