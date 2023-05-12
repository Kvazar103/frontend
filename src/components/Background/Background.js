import lviv_sunrises_and_sunsets from "../../images/lviv_city/lviv_sunrises_and_sunsets.jpg";
import css from "../../images/lviv_city/lviv_sunrises_and_sunsets.module.css";
import RealtyObjectsSlider from "../RealtySlider/RealtyObjectsSlider";
import search_black_and_yellow from "../../images/search_icon/search_black_and_yellow.png"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import './titleStyle.css'


export default function Background(props){

    console.log(props)
    const navigate=useNavigate();
    // const[data,setData]=useState({
    //     selectData:``,
    //     inputData:``
    // })
    // const onInputChange = (e) => {
    //   setData({...data,[e.target.name]:e.target.value})
    // }
    function onClickSelect() {
        document.getElementById("select_type").style.width="200px";
    }
    function onClickSearchButton(e) {
        e.preventDefault();
        console.log(e);
        console.log(e.target[0].value);
        let x=e.target[1].value;
        if(x===""){
            x=" ";
        }
        console.log(e.target[1].value);
        // navigate(`${data.selectData}/${data.inputData}/search`)
        navigate(`${e.target[0].value}/${x}/search`)
    }
    return(<div>
        <img src={lviv_sunrises_and_sunsets} alt={"lviv_background"} className={css.lviv_sunrises_and_sunsets}/>
        <div style={{position:"relative",top:"-340px"}}>
            <form onSubmit={(e)=>onClickSearchButton(e)}>
                <div style={{color:"yellow",fontSize:"100px"}} className="for_title">
                    Нерухомість Львів
                </div>
            <select id="select_type" name="selectData" style={{height:"45px",width:"100px"}}
                    // value={data.selectData}
                    // onChange={(e)=>onInputChange(e)}
            >
                <option value="" disabled selected>Виберіть тип</option>
                <option onClick={onClickSelect} value="Apartment:Rent_for_a_month">Apartment:rent for a month</option>
                <option onClick={onClickSelect} value="Apartment:Sell">Apartment:sell</option>
                <option onClick={onClickSelect} value="Apartment:Rent_per_day">Apartment:rent per day</option>
                <option onClick={onClickSelect} value="House:Rent_for_a_month">House:rent for a month</option>
                <option onClick={onClickSelect} value="House:Sell">House:sell</option>
                <option onClick={onClickSelect} value="House:Rent_per_day">House:rent per day</option>
                <option onClick={onClickSelect} value="Garage:Rent_for_a_month">Garage:rent for a month</option>
                <option onClick={onClickSelect} value="Garage:Sell">Garage:sell</option>
                <option onClick={onClickSelect} value="Garage:Rent_per_day">Garage:rent per day</option>
                <option onClick={onClickSelect} value="Land:Rent_for_a_month">Land:rent for a month</option>
                <option onClick={onClickSelect} value="Land:Sell">Land:sell</option>
                <option onClick={onClickSelect} value="Land:Rent_per_day">Land:rent per day</option>



            </select>

            <input type="search"
                   id="site-search"
                   name="inputData"
                   placeholder={"Введіть район,вулицю або місто "}
                   // value={data.inputData}
                   style={{width:"500px",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px",height:"45px"}}
                   // onChange={(e)=>onInputChange(e)}
            />

            <button type="submit" style={{border:"none",background:"black",width:"50px",height:"45px"}}><img src={search_black_and_yellow} style={{width:"25px",height:"25px"}}/></button>
            </form>
        </div>
        <div style={{marginTop:"-170px"}}>
        <h1>Гарячі пропозиції</h1>
        <RealtyObjectsSlider/>
        <br/><br/><br/><br/><br/>
        </div>
        <div style={{width:"100%",height:"460px",backgroundColor:"#FFEF00"}}>
            <div><br/><br/>
                <h2 style={{fontSize:"40px"}}>Найнадійніший сайт для розміщення/пошуку нерухомості</h2>
            </div>
            <div style={{display:"flex",gap:"100px",marginTop:"30px",justifyContent:"center"}}>
                <div style={{width:"180px"}}>
                    <div>
                        понад
                    </div>
                    <h2>
                        900
                    </h2>
                    <div>
                        квартир, що здаються під оренду
                    </div>
                </div>
                <div style={{width:"180px"}}>
                    <div>
                        понад
                    </div>
                    <h2>
                        700
                    </h2>
                    <div>
                        квартир,будинків,<br/>земельних ділянок,гаражів, що продаються
                    </div>

                </div>
                <div style={{width:"180px"}}>
                    <div>
                        понад
                    </div>
                    <h2>
                        1400
                    </h2>
                    <div>
                        оголошень які розміщенні на сайті
                    </div>

                </div>
            </div><br/><br/>
            <div>
                Сайт допоможе вам з вибором нерухомості а також представляє всі необхідні інструменти для виставлення свого власного оголошення.
            </div><br/>
            <div>
                Надаємо консультацію, відповідаємо на запитання, слідкуємо за якістю оголошенням і беремо в участі складанню договору між замовником і виконавцем.
            </div>
        </div>
    </div>)
}