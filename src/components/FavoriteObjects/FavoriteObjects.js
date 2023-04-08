import {useMemo, useState} from "react";
import AuthService from "../../services/auth.service";
import {useEffect} from "react";
import Pagination from "../Profile/Pagination";
import axios from "axios";
import css from "../Profile/profile.module.css";
import {Navigate} from "react-router-dom";


let pageSize=4;
export default function FavoriteObjects() {

    let currentUser=AuthService.getCurrentUser();
    const [currentPage, setCurrentPage] = useState(1);

    const [realtyCustomers,setRealtyCustomers]=useState([]);


    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        console.log("current table data")
        console.log(Object.values(realtyCustomers))

        return Object.values(realtyCustomers).slice(firstPageIndex, lastPageIndex);
    }, [currentPage, realtyCustomers]);




    useEffect(()=>{
        axios.get(`http://localhost:8080/customer/favorites/${currentUser.id}`)
            .then(value => {
                console.log(value.data)
                console.log("favorites")
                setRealtyCustomers(value.data)
                console.log(value.data)
                for(let x of value.data){
                    console.log(x)
                    console.log(Object.keys(x));
                    console.log(Object.values(x));
                }
                // setFavoriteRealtyObjectList(value.data)
            })
    },[currentUser.id])


    return(<div>
        <br/><br/><br/>
        <h1 style={{textAlign:"left",marginLeft:"20px"}}>Favorites objects</h1>

        {currentTableData.map(realtyObjectAndIdOfCustomer => {
            console.log("mapping")
            console.log(realtyObjectAndIdOfCustomer)
            let realtyObjectInObject=Object.values(realtyObjectAndIdOfCustomer)
            let customerId=Object.keys(realtyObjectAndIdOfCustomer)
            console.log(realtyObjectInObject)
            let realtyObject=realtyObjectInObject[0];


            let x = `http://localhost:8080/images/${customerId}id/${realtyObject.images[0]}`;
            console.log(x)
            // console.log(value)
            let monthOrDay = "";
            if (realtyObject.price != null && realtyObject.price.type_of_order_of_real_estate === "Rent_for_a_month") {
                monthOrDay = "/month";
            } else if (realtyObject.price != null && realtyObject.price.type_of_order_of_real_estate === "Rent_per_day") {
                monthOrDay = "/day"
            } else {
                monthOrDay = ""
            }
            return (<div className={css.one_realty}>
                <div>
                    <a href={`http://localhost:3000/object/${realtyObject.id}`}> <img src={x} width="120px" height="93px"/></a>
                </div>
                <div style={{textAlign: "left", width: "142px"}}>
                    {/*{item.address}*/}
                    <span>{realtyObject.real_estate} for {realtyObject.price.type_of_order_of_real_estate === "Sell" ? "sale" : "rent"}</span><br/>
                    <span>{realtyObject.price ? realtyObject.price.sum : "0"} {realtyObject.price ? realtyObject.price.currency : "0"}{monthOrDay ? monthOrDay : ""}</span>
                </div>
                <div style={{textAlign: "left", width: "350px"}}>
                    <a href={`http://localhost:3000/object/${realtyObject.id}`}>
                        <span>{realtyObject.address} {realtyObject.apt_suite_building},{realtyObject.city},{realtyObject.district} district</span></a><br/>
                    <span>{realtyObject.square} sq.m</span>
                </div>

            </div>)
        })}
        <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={realtyCustomers.length}
            pageSize={pageSize}
            onPageChange={page=>setCurrentPage(page)}
        />

    </div>)
}