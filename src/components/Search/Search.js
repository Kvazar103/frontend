import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import search_black_and_yellow from "../../images/search_icon/search_black_and_yellow.png";
import axios from "axios";
import css from "../Profile/profile.module.css";
import async from "async";
import {Dropdown} from "react-bootstrap";
import _ from "lodash";


export default function Search() {
    let url=window.location.toString();

    // console.log(url);
    // console.log(url.split("/",5))
    let splittedUrl=url.split("/",5)

    let typedByUserText=splittedUrl[splittedUrl.length-1]
    let selectedByUserType=splittedUrl[splittedUrl.length-2]
    console.log("uuu")
    console.log(selectedByUserType)
    let splitRealEstateAndType=selectedByUserType.split(":",2);
    console.log(splitRealEstateAndType)
    let decodedTypedText=decodeURIComponent(typedByUserText); //decode if the text is in cyrillic
    const[searchedRealtyObjectList,setSearchedRealtyObjectList]=useState([]);
    const[filter,setFilter]=useState("null")

    const[data,setData]=useState({
        selectData:`${selectedByUserType}`,
        inputData:`${decodedTypedText}`
    })
    const [currency,setCurrency]=useState("");
    const [sumFrom,setSumFrom]=useState(0);
    const [sumTo,setSumTo]=useState(0);
    const [rooms,setRooms]=useState(null);
    const [district,setDistrict]=useState("");
    const [allRealtyObjectList,setAllRealtyObjectList]=useState([]);

    useEffect(()=>{
            const formData=new FormData();
            formData.append("selectType",selectedByUserType)
            formData.append("inputData",decodedTypedText);
            axios.post(`http://localhost:8080/getSelectedRealtyObjects`,formData)
                .then(value => {
                    console.log("axios post")
                    console.log(value.data)
                    setSearchedRealtyObjectList(value.data);
                    setAllRealtyObjectList(value.data);
                })
    },[decodedTypedText, selectedByUserType])
    const onInputChange=(e)=>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value})
    }

    const onClickFilterPriceAscending=async (e)=> {
        // document.getElementById("select_type").style.width="200px";
        document.getElementById("dropdown-button-dark-example1").style.marginLeft="-180px"
        console.log("on click trig")
        console.log(e);
        console.log(e.target.attributes.value.value);
        setFilter(e.target.attributes.value.value)
        const data = searchedRealtyObjectList.sort((a, b) => {
            let A = Object.values(a);
            let B = Object.values(b);
            return (A[0].price.sum - B[0].price.sum)
        })
        console.log(filter)
        console.log("filter")
        console.log(data)
        console.log(data[0])
        document.getElementById("dropdown-button-dark-example1").innerText="Ціна(від дешевих до дорогих)"
        setSearchedRealtyObjectList(data)
    }
    const onClickFilterPriceDescending =async (e) => {

        document.getElementById("dropdown-button-dark-example1").style.marginLeft="-180px"
        console.log(e.target.attributes.value.value);
        setFilter(e.target.attributes.value.value)
        const data = searchedRealtyObjectList.sort((a, b) => {
            let A = Object.values(a);
            let B = Object.values(b);
            return (B[0].price.sum - A[0].price.sum)
        })
        console.log(data)
        document.getElementById("dropdown-button-dark-example1").innerText="Ціна(від дорогих до дешевих)"
        setSearchedRealtyObjectList(data)

    }
    const onClickFilterHot =async (e) => {
        document.getElementById("dropdown-button-dark-example1").style.marginLeft="-180px"
        console.log(e.target.attributes.value.value);
        setFilter(e.target.attributes.value.value)
       // const data=searchedRealtyObjectList.sort(()=>Math.random()-0.5);
        const data=_.shuffle(searchedRealtyObjectList);//перемішка об'єктів
        console.log(data)
        document.getElementById("dropdown-button-dark-example1").innerText="Гарячі"
        setSearchedRealtyObjectList(data);


    }


    const onSubmit=async(e)=> {
        e.preventDefault();
        // console.log(e);
        // console.log(e.target[0].value)
        // console.log(e.target[1].value)
        // console.log(data)
        const formData=new FormData();
        formData.append("selectType",data.selectData)
        formData.append("inputData",data.inputData);
        await axios.post(`http://localhost:8080/getSelectedRealtyObjects`,formData)
            .then(value => {
                console.log(value)
                // console.log(value.data)
                // eslint-disable-next-line no-restricted-globals
                location.replace(`http://localhost:3000/${data.selectData}/${data.inputData}/search`)

                setSearchedRealtyObjectList(value.data);
            })
    }

    const onClickOnCurrency=(e)=>{
        console.log("on click currency")
        console.log(e)
        const arrOfCurrencyName= ["USD","EUR","UAH"]

        for(let el of arrOfCurrencyName){
            if((document.getElementById(el).style.color === "white")){
                document.getElementById(el).style.color="black";
                document.getElementById(el).style.background="white";
            }
        }
        document.getElementById(e.target.id).style.color="white"
        document.getElementById(e.target.id).style.background="black"

        setCurrency(e.target.id)

    }
    const onChangeSumFrom = (e) => {
      console.log("on change sum from")
      console.log(e)
      console.log(e.target.form[6].valueAsNumber)
      setSumFrom(e.target.form[6].valueAsNumber)
    }
    const onChangeSumTo=(e)=>{
        console.log("on change sum to")
        console.log(e)
        console.log(e.target.form[7].valueAsNumber)
        setSumTo(e.target.form[7].valueAsNumber);
    }
    const onPriceSubmit = (e) => {
        e.preventDefault();
        console.log("on price submit")
        console.log(e)
        console.log(currency)
        console.log(sumFrom)
        console.log(sumTo)
        // const data=searchedRealtyObjectList;
        const data=allRealtyObjectList;
        console.log(data)
        let currencyToShow="";
        if(currency==="USD"){
            currencyToShow="$"
        }else if(currency==="EUR"){
            currencyToShow="euro"
        }else if(currency==="UAH"){
            currencyToShow="грн"
        }
        let newArr=[];
        for(let el of data){
            let a=Object.values(el)
            console.log("on submit")
            console.log(el)
            console.log(a)
            if((a[0].price.currency === currency)&&(a[0].price.sum>=sumFrom && a[0].price.sum<=sumTo)){
                console.log(a)
                newArr.push(el)
            }
        }
        console.log(newArr);
        document.getElementById("dropdown-autoclose-false").innerText=`від ${sumFrom} до ${sumTo}${currencyToShow}`
        document.getElementById("dropdown-autoclose-false").style.color="black"
        setSearchedRealtyObjectList(newArr)
    }
    const onClickOnRoom =async (e) => {
        console.log(e)
        console.log(e.target.attributes.value.value)
        setRooms(e.target.id)
        // const data=searchedRealtyObjectList;
        const data=allRealtyObjectList;
        let newArr=[];
        for(let el of data){
            let a=Object.values(el);
            console.log(a);
            if(a[0].rooms == e.target.attributes.value.value){
                newArr.push(el)
            }else if(e.target.attributes.value.value=="4"){
                if(a[0].rooms>=4){
                    newArr.push(el)
                }
            }
        }
        document.getElementById("dropdown-autoclose-inside").innerText=`${e.target.id}`
        document.getElementById("dropdown-autoclose-inside").style.color="black"
        console.log("new arr")
        console.log(newArr)
        setSearchedRealtyObjectList(newArr)
    }

    const onClickDistrict = (e) => {
      console.log("on click district")
      console.log(e);
      // const data=searchedRealtyObjectList;
        const data=allRealtyObjectList;
        let newArr=[];
      for(let el of data){
          let a=Object.values(el)
          if(a[0].district==e.target.id){
              newArr.push(el)
          }
      }
      setSearchedRealtyObjectList(newArr)
      document.getElementById("dropdown-autoclose-inside_district").innerText=e.target.innerText;
      document.getElementById("dropdown-autoclose-inside_district").style.color="black";

    }

    return(
        <div>
            <div>
                {/*<div>*/}
                <form style={{marginRight:"660px"}} onSubmit={(e)=>onSubmit(e)}>
                    <select id="select_type" name="selectData" style={{height:"45px",width:"200px"}}
                        onChange={(e)=>onInputChange(e)}
                            value={data.selectData}>
                        <option  value="" disabled selected>Виберіть тип</option>
                        <option  value="Apartment:Rent_for_a_month">Apartment:rent for a month</option>
                        <option  value="Apartment:Sell">Apartment:sell</option>
                        <option  value="Apartment:Rent_per_day">Apartment:rent per day</option>
                        <option  value="House:Rent_for_a_month">House:rent for a month</option>
                        <option  value="House:Sell">House:sell</option>
                        <option  value="House:Rent_per_day">House:rent per day</option>
                        <option  value="Garage:Rent_for_a_month">Garage:rent for a month</option>
                        <option  value="Garage:Sell">Garage:sell</option>
                        <option  value="Garage:Rent_per_day">Garage:rent per day</option>
                        <option  value="Land:Rent_for_a_month">Land:rent for a month</option>
                        <option  value="Land:Sell">Land:sell</option>
                        <option  value="Land:Rent_per_day">Land:rent per day</option>

                    </select>
                    <input style={{marginTop:"80px",width:"500px",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px",height:"45px"}}
                           type="search"
                           name="inputData"
                           onChange={(e)=>onInputChange(e)}
                           value={data.inputData}
                           // defaultValue={`${data.inputData}`}
                           placeholder={"Введіть район,вулицю або місто "}
                    />
                    <button
                        type="submit"
                        style={{border:"none",background:"black",width:"50px",height:"47px"}}><img src={search_black_and_yellow} style={{width:"25px",height:"25px"}}/>
                    </button>
                 <div style={{display:"flex",marginLeft:"7px",marginTop:"10px"}}>
                     <Dropdown className="d-inline mx-2" autoClose="inside">
                         <Dropdown.Toggle style={{backgroundColor:"white",color:"lightgray",border:"1px solid black",borderRadius:"50px"}} id="dropdown-autoclose-inside_district">
                             Район
                         </Dropdown.Toggle>

                         <Dropdown.Menu>
                             <Dropdown.Item onClick={(e)=>onClickDistrict(e)} id={"Galickiy"}>Галицький</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickDistrict(e)} id={"Zaliznichniy"}>Залізничний</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickDistrict(e)} id={"Lichakivskiy"}>Личаківський</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickDistrict(e)} id={"Sikhivskiy"}>Сихівський</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickDistrict(e)} id={"Frankivskiy"}>Франківський</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickDistrict(e)} id={"Shevchenkivskiy"}>Шевченківський</Dropdown.Item>
                         </Dropdown.Menu>
                     </Dropdown>
                     <Dropdown className="d-inline mx-2" autoClose="inside">
                         <Dropdown.Toggle style={{backgroundColor:"white",color:"lightgray",border:"1px solid black",borderRadius:"50px"}} id="dropdown-autoclose-inside">
                             Кімнат
                         </Dropdown.Toggle>

                         <Dropdown.Menu>
                             <Dropdown.Item onClick={(e)=>onClickOnRoom(e)} value="1" id={"1"}>1</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickOnRoom(e)} value="2" id={"2"}>2</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickOnRoom(e)} value="3" id={"3"}>3</Dropdown.Item>
                             <Dropdown.Item onClick={(e)=>onClickOnRoom(e)} value="4" id={"4+"}>4+</Dropdown.Item>
                         </Dropdown.Menu>
                     </Dropdown>
                    <Dropdown className="d-inline mx-2" autoClose={false}>
                        <Dropdown.Toggle style={{backgroundColor:"white",color:"lightgray",border:"1px solid black",borderRadius:"50px"}} id="dropdown-autoclose-false">
                            Ціна
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{borderRadius:"50px",width:"600px",height:"200px"}}>
                            <div style={{width:"600px"}}>
                            <div style={{marginLeft:"60px",marginTop:"20px"}}>
                              <input onChange={onChangeSumFrom} id="from" type="number" style={{borderRadius:"50px",marginRight:"15px"}} placeholder={"від"}/>
                              <input onChange={onChangeSumTo} id="to" type="number" style={{borderRadius:"50px"}} placeholder={"до"}/>
                            </div>
                            <div style={{display:"flex",textAlign:"center",marginLeft:"55px",marginTop:"10px"}} >
                                <Dropdown.Item style={{height:"40px",width:"160px",borderRadius:"50px",border:"1px solid black"}} id={"USD"} onClick={(e)=>onClickOnCurrency(e)}>
                                    $
                                </Dropdown.Item>
                                <Dropdown.Item style={{height:"40px",width:"160px",borderRadius:"50px",border:"1px solid black"}} id={"UAH"} onClick={(e)=>onClickOnCurrency(e)}>
                                    грн
                                </Dropdown.Item>
                                <Dropdown.Item style={{height:"40px",width:"160px",borderRadius:"50px",border:"1px solid black"}} id={"EUR"} onClick={(e)=>onClickOnCurrency(e)}>
                                    євро
                                </Dropdown.Item>
                            </div>
                                <button onClick={(e)=>onPriceSubmit(e)} style={{borderRadius:"50px",background:"yellow",border:"2px solid black",width:"485px",marginLeft:"50px",marginTop:"15px"}}>Застосувати фільтри -></button>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>


                 </div>


                </form>
                <Dropdown style={{marginLeft:"1250px",position:"relative",bottom:"50px"}}>
                    <Dropdown.Toggle  id="dropdown-button-dark-example1"  variant="secondary" >
                        Фільтер
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark">
                        <Dropdown.Item value="hot" onClick={(e)=>onClickFilterHot(e)}>
                            Гарячі
                        </Dropdown.Item>
                        <Dropdown.Item value="price_ascending" onClick={(e)=>onClickFilterPriceAscending(e)}>
                            Ціна(від дешевих до дорогих)
                        </Dropdown.Item>
                        <Dropdown.Item value="price_descending" onClick={(e)=>onClickFilterPriceDescending(e)} >
                            Ціна(від дорогих до дешевих)
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/*</div>*/}

                {searchedRealtyObjectList.map((item) => {
                    let realtyObjectInArray=Object.values(item);
                    let realtyObject=realtyObjectInArray[0];
                    let customerId=Object.keys(item);
                    let x=`http://localhost:8080/images/${customerId}id/${realtyObject.images[0]}`;
                    // console.log(x)
                    console.log(item)
                    // console.log(realtyObject)
                    console.log(realtyObjectInArray);


                    let monthOrDay="";
                    if(realtyObject.price!=null && realtyObject.price.type_of_order_of_real_estate==="Rent_for_a_month"){
                        monthOrDay="/month";
                    }else if(realtyObject.price!=null && realtyObject.price.type_of_order_of_real_estate==="Rent_per_day"){
                        monthOrDay="/day"
                    }else {
                        monthOrDay=""
                    }

                    return(
                        <div className={css.one_realty}>
                            <div>
                                <a href={`http://localhost:3000/object/${realtyObject.id}`}> <img src={x} width="120px" height="93px"/></a>
                            </div>
                            <div style={{textAlign:"left",width:"142px"}}>
                                {/*{item.address}*/}
                                <span>{realtyObject.real_estate} for {realtyObject.price.type_of_order_of_real_estate==="Sell"?"sale":"rent"}</span><br/>
                                <span>{realtyObject.price?realtyObject.price.sum:"0"} {realtyObject.price?realtyObject.price.currency:"0"}{monthOrDay?monthOrDay:""}</span>
                            </div>
                            <div style={{textAlign:"left",width:"350px"}}>
                                <a href={`http://localhost:3000/object/${item.id}`}>
                                    <span>{realtyObject.address} {realtyObject.apt_suite_building},{realtyObject.city},{realtyObject.district} district</span></a><br/>
                                <span>{realtyObject.square} sq.m ,{realtyObject.rooms} rooms</span>
                            </div>
                        </div>)
                })}
            </div>

        </div>
    )
}