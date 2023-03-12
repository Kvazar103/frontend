import lviv_sunrises_and_sunsets from "../../images/lviv_city/lviv_sunrises_and_sunsets.jpg";
import css from "../../images/lviv_city/lviv_sunrises_and_sunsets.module.css";
import RealtyObjectsSlider from "../RealtySlider/RealtyObjectsSlider";


export default function Background(){
    return(<div>
        <img src={lviv_sunrises_and_sunsets} alt={"lviv_background"} className={css.lviv_sunrises_and_sunsets}/>
        <h2>Hot offers</h2>
        <RealtyObjectsSlider/>
        <br/><br/><br/><br/><br/>
    </div>)
}