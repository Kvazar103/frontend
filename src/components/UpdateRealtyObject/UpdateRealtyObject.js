import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

import AuthService from "../../services/auth.service";
import css from "../AddObject/FormStyle.module.css";
import {useForm} from "react-hook-form";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
export default function UpdateRealtyObject() {

    const navigate=useNavigate();
    let currentUser=AuthService.getCurrentUser();
    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    let arrayOfUrl=url.split('/',4)
    let idFromUrl=arrayOfUrl.slice(-1);
    console.log(idFromUrl[0])
    let token=JSON.parse(localStorage.getItem('token'));
    let config={
        headers:{
            Authorization:`${token}`
        }
    }
    const [realtyImagesUrl,setRealtyImagesUrl]=useState([]);
    const [imageUrlsToDelete,setImageUrlsToDelete]=useState([]);

    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);

    const result=currentUser.my_realty_objectList.filter(realty=>realty.id===Number(idFromUrl[0]));
    console.log(result)
    console.log(currentUser)
    console.log(typeof idFromUrl[0])
    console.log(typeof currentUser.my_realty_objectList[0].id)

    useEffect(() => {
        let urlForThisUseEffect=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
        let arrayOfUrlForThisUseEffect=urlForThisUseEffect.split('/',4)
        let idFromUrlForThisUseEffect=arrayOfUrlForThisUseEffect.slice(-1);
        let currentUserForThisUseEffect=AuthService.getCurrentUser()
        const resultForUseEffect=currentUserForThisUseEffect.my_realty_objectList.filter(realty=>realty.id===Number(idFromUrlForThisUseEffect[0]))
        let c = []
        for (let x of resultForUseEffect[0].images) {
            c.push(`http://localhost:8080/images/${currentUserForThisUseEffect.id}id/` + x)
        }
        setRealtyImagesUrl(c);
        document.getElementById("inputAddImageId").hidden=true;
    },[])

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

    const [requiredFieldForRooms,setRequiredFieldForRooms]=useState("");
    const [requiredFieldForSquare,setRequiredFieldForSquare]=useState("");
    const [requiredFieldForPriceSum,setRequiredFieldForPriceSum]=useState("")

    const {
        register,
        formState: { errors }
    } = useForm({ mode: 'all'});

    const onSumChange = (e) => {
        setRequiredFieldForPriceSum("")
        setRealtyObject({...realtyObject,price:{
                ...realtyObject.price,
                sum: e.target.value
            }})
    }
    const onRoomsChange=(e)=>{
        setRealtyObject({ ...realtyObject, rooms: e.target.value });
        setRequiredFieldForRooms("")
    }
    const onSquareChange = (e) => {
        setRequiredFieldForSquare("")
        setRealtyObject({ ...realtyObject, [e.target.name]: e.target.value });
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
        }
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    const onDeleteImageClick = (e) => {
        let img=document.getElementById(e.target.value)
        img.hidden=true
        let butt=document.getElementById(e.target.value+"b")
        butt.hidden=true
        console.log(e)
        console.log(e.target.value)
        setImageUrlsToDelete(imageUrlsToDelete=>[...imageUrlsToDelete,e.target.value])
        console.log(imageUrlsToDelete)
    }

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
        if(realtyObject.price.sum===""){
            setRequiredFieldForPriceSum("Sum cannot be null")
        }else if(realtyObject.price.sum<=0){
            setRequiredFieldForPriceSum("Please select a value that is no less than 1")
        }

        if(realtyObject.square===""){
            setRequiredFieldForSquare("Square cannot be null")
        }else if(realtyObject.square<=0){
            setRequiredFieldForSquare("Please select a value that is no less than 1")
        }

        if(realtyObject.rooms===""){
            setRequiredFieldForRooms("Rooms cannot be null")
        }else if(realtyObject.rooms<=0){
            setRequiredFieldForRooms("Please select a value that is no less than 1")
        }

        if(realtyObject.price.sum!=="" && realtyObject.price.sum>=0 &&
            realtyObject.square!=="" && realtyObject.square>=0 &&
            realtyObject.rooms!=="" && realtyObject.rooms>=0) {
            const formData = new FormData();
            formData.append("realty_object", JSON.stringify(realtyObject))
            console.log(imageFiles)
            if (imageFiles != null) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append("images_to_add", imageFiles[i])
                }
            }
            console.log(imageUrlsToDelete)
            if (imageUrlsToDelete != null) {
                for (let i = 0; i < imageUrlsToDelete.length; i++) {
                    formData.append("currentImages_to_delete", imageUrlsToDelete[i])
                }
            }
            console.log(formData)
            AuthService.updateRealtyObject(formData,idFromUrl[0],currentUser.id,config)
                .then(()=>{
                    AuthService.getCustomer(currentUser.id)
                        .then((value)=>{
                            localStorage.setItem('customer', JSON.stringify(value.data));
                            navigate(`/object/${idFromUrl[0]}`)
                        })
                })
        }
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
                            <input type="number" className="form-control" name="rooms" value={realtyObject.rooms}
                                   {...register("rooms",{required:true,valueAsNumber:true})}
                                   onChange={(e) => onRoomsChange(e)} id="inputEmail4"
                            />
                            {requiredFieldForRooms&&(<span style={{color:"red"}}>{requiredFieldForRooms}</span>)}<br/>
                            {errors.rooms&&<span style={{color:'red'}}>Only numbers!</span>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputPassword4" className="form-label">Square</label>
                            <input type="number" className="form-control" name="square" value={realtyObject.square}
                                   {...register("square",{required:true,valueAsNumber:true})}
                                   onChange={(e) => onSquareChange(e)} id="inputPassword4"/>
                            {requiredFieldForSquare&&(<span style={{color:"red"}}>{requiredFieldForSquare}</span>)}<br/>
                            {errors.square&&<span style={{color:'red'}}>Only numbers!</span>}
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
                                   {...register("sum",{required:true,valueAsNumber:true})}

                                   onChange={(e) => onSumChange(e)}
                                   className="form-control" id="inputCity"/>
                            {requiredFieldForPriceSum&&(<span style={{color:"red"}}>{requiredFieldForPriceSum}</span>)}<br/>
                            {errors.sum&&<span style={{color:'red'}}>Only numbers!</span>}
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
                                <img id={`${value}`} style={{width:"400px",height:"210px"}} src={value} alt="delete_icon"/>
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