import lviv_sunrises_and_sunsets from "../../images/lviv_city/lviv_sunrises_and_sunsets.jpg";
import css from "../../images/lviv_city/lviv_sunrises_and_sunsets.module.css";


export default function Background(){
    return(<div>
        <img src={lviv_sunrises_and_sunsets} alt={"lviv_background"} className={css.lviv_sunrises_and_sunsets}/>

    </div>)
}