import {Link, Navigate, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import css from "../AddObject/FormStyle.module.css";


const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
export default function UpdateRealtyObject() {

    const navigate=useNavigate();
    let currentUser=AuthService.getCurrentUser();
    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    // console.log(url.split('/',4))
    let arrayOfUrl=url.split('/',4)
    let idFromUrl=arrayOfUrl.slice(-1);
    // console.log(idFromUrl[0])

    // const [currentRealtyObject,setCurrentRealtyObject]=useState('');
    const [realtyImagesUrl,setRealtyImagesUrl]=useState([]);
    const [imageUrlsToDelete,setImageUrlsToDelete]=useState([]);


    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    // const [currentRealtyObjectFromCurrentUser,setCurrentRealtyObjectFromCurrentUser]=useState('');

    //
    // useEffect(  () => {
    //     axios.get(`http://localhost:8080/object/${idFromUrl[0]}`)
    //         .then(value => {
    //             let c = []
    //             // setCurrentRealtyObject(value.data)
    //             for (let x of value.data.images) {
    //                 c.push(`http://localhost:8080/images/${currentUser.id}id/` + x)
    //             }
    //             setRealtyImagesUrl(c);
    //             // console.log(realtyImagesUrl)
    //
    //
    //         })
    // },[currentUser.id, idFromUrl, realtyImagesUrl])




    const result=currentUser.my_realty_objectList.filter(realty=>realty.id==idFromUrl[0]);

    useEffect(  () => {

                let c = []
                // setCurrentRealtyObject(value.data)
                for (let x of result[0].images) {
                    c.push(`http://localhost:8080/images/${currentUser.id}id/` + x)
                }
                setRealtyImagesUrl(c);
                // console.log(realtyImagesUrl)
        document.getElementById("inputAddImageId").hidden=true;



    },[currentUser.id, result])



    const [realtyObject, setRealtyObject] = useState({
        district: `${result[0].district?result[0].district:""}`,
        address:`${result[0].address?result[0].address:""}`,
        apt_suite_building: `${result[0].apt_suite_building?result[0].apt_suite_building:""}`,
        rooms:`${result[0].rooms}`,
        square:`${result[0].square}`,
        details:`${result[0].details?result[0].details:""}`,
        real_estate:`${result[0].real_estate}`,
        price:{
            sum:`${result[0].price?result[0].price.sum:""}`,
            currency:`${result[0].price?result[0].price.currency:""}`,
            type_of_order_of_real_estate:`${result[0].price?result[0].price.type_of_order_of_real_estate:""}`
        }
    });



    // currentUser.my_realty_objectList.map(value=>{
    //     if(value.id==idFromUrl[0]){
    //         return value.address;
    //     }
    // }),

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



    
    const onFileChange = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match(imageTypeRegex)) {
                validImageFiles.push(file);
            }
        }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    }

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(images);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    // console.log(images);
    // console.log("images to show and to backend")
    // console.log(imageFiles)


    const onDeleteImageClick = (e) => {

        let img=document.getElementById(e.target.value)
        img.hidden=true
        let butt=document.getElementById(e.target.value+"b")
        butt.hidden=true

        console.log("for ee")
        console.log(e)
        console.log(e.target.value)

        setImageUrlsToDelete(imageUrlsToDelete=>[...imageUrlsToDelete,e.target.value])

        console.log("delete current image click")
        console.log(imageUrlsToDelete)
    }
    // console.log("below current images of realty object that should be deleted")
    // console.log(imageUrlsToDelete)


    const onDeletePartTWO = (e) => {
        console.log(e)
        console.log(e.target.id)
        let indexForRemoval=e.target.id;
        let x=images;
        let y=imageFiles;
        x.splice(indexForRemoval,1);
        y.splice(indexForRemoval,1)
        console.log(x)
        console.log(y)
        setImages(x);
        setImageFiles(y);

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append("realty_object",JSON.stringify(realtyObject))
        console.log("imageFiles")
        console.log(imageFiles)
        if(imageFiles!=null){
            for (let i=0;i<imageFiles.length;i++){
                formData.append("images_to_add",imageFiles[i])
            }
        }
        console.log("imageUrlsToDelte")
        console.log(imageUrlsToDelete)
        if(imageUrlsToDelete!=null){
            for(let i=0;i<imageUrlsToDelete.length;i++){
                formData.append("currentImages_to_delete",imageUrlsToDelete[i])
            }
        }
        console.log(formData)
        await axios.patch(`http://localhost:8080/${idFromUrl[0]}/${currentUser.id}/updateRealtyObject`,formData);
        const c=await axios.get(`http://localhost:8080/customer/${currentUser.id}`);
        localStorage.setItem('customer',JSON.stringify(c.data));

        navigate(`/object/${idFromUrl[0]}`)
        window.location.reload();
    };




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
                            <select id="inputState2" name="district" value={realtyObject.district} onChange={(e) => onInputChange(e)} className={css.d} >
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
                            <input type="text" className="form-control" name="address" value={realtyObject.address} onChange={(e) => onInputChange(e)} id="inputAddress" placeholder="1234 Main St"/>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Apt,suite or building</label>
                            <input type="text" className="form-control" name="apt_suite_building" value={realtyObject.apt_suite_building} onChange={(e) => onInputChange(e)} id="inputAddress2"
                                   placeholder="Apt,suite or building"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputEmail4" className="form-label">Rooms</label>
                            <input type="number" className="form-control" name="rooms" value={realtyObject.rooms} onChange={(e) => onInputChange(e)} id="inputEmail4"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputPassword4" className="form-label">Square</label>
                            <input type="number" className="form-control" name="square" value={realtyObject.square} onChange={(e) => onInputChange(e)} id="inputPassword4"/>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">Real estate</label>
                            <select id="inputState2" name="real_estate" value={realtyObject.real_estate} onChange={(e) => onInputChange(e)} className={css.d} >
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
                            <input type="number" name="sum" value={realtyObject.price?realtyObject.price.sum:""}
                                   onChange={(e) => onSumChange(e)}
                                   className="form-control" id="inputCity"/>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Currency</label>
                            <select id="inputState2" name="currency" value={realtyObject.price?realtyObject.price.currency:""}
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
                            <select id="inputState" className={css.b} name="type_of_order_of_real_estate" value={realtyObject.price?realtyObject.price.type_of_order_of_real_estate:""}
                                    onChange={(e) => onTypeOfRealEstateChange(e)}
                            >
                                <option defaultValue={""}>Choose...</option>
                                <option value="Sell">Sell</option>
                                <option value="Rent_for_a_month">Rent for a month</option>
                                <option value="Rent_per_day">Rent per day</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputDetails" className="form-label">Details</label>
                            <textarea style={{width:500,height:200,whiteSpace:"pre-line"}} name="details" value={realtyObject.details} onChange={onInputChange} rows="5" cols="30" placeholder="write something about your object">
                            </textarea>
                        </div>
                        <section>
                            <label style={{marginLeft:"220px"}}>
                                + Add Images
                                <br />
                                {/*<span>up to 10 images</span>*/}
                                <input
                                    type="file"
                                    name="images"
                                    onChange={onFileChange}
                                    // value={images}
                                    multiple
                                    accept="image/png , image/jpeg, image/webp"
                                    id="inputAddImageId"
                                />
                            </label>
                            <br />
                            {
                                images.length > 0 ?
                                    <div>
                                        {
                                            images.map((image, idx) => {
                                                return <p key={idx}> <img style={{width:"400px",height:"210px"}} src={image} alt="" />
                                                    <Button id={`${idx}`} value={image} onClick={onDeletePartTWO} variant={'danger'}>delete</Button>

                                                </p>
                                            })
                                        }
                                    </div> : null
                            }


                        </section>


                        {realtyImagesUrl.map(value => {
                            return(<div>
                                <img id={`${value}`} style={{width:"400px",height:"210px"}} src={value}/>
                                <Button id={`${value}b`} value={value} onClick={onDeleteImageClick} variant={'danger'}>delete</Button>
                            </div>)
                        })}



                        <div className="col-12">   <br/>
                            <button type="submit" className="btn btn-primary">Update object</button>
                            <Link className="btn btn-outline-danger mx-2" to={`/object/${idFromUrl[0]}`}>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}