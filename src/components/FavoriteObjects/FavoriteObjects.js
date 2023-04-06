import {useMemo, useState} from "react";
import AuthService from "../../services/auth.service";
import {useEffect} from "react";


let pageSize=4;
export default function FavoriteObjects() {

    let currentUser=AuthService.getCurrentUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [customerAddedToFavorite,setCustomerAddedToFavorite]=useState([]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return customerAddedToFavorite.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, customerAddedToFavorite]);

    useEffect(()=>{
        setCustomerAddedToFavorite(currentUser.added_to_favorites)
    },[currentUser.added_to_favorites])


    return(<div>
        <br/><br/><br/>
        <h1 style={{textAlign:"left",marginLeft:"20px"}}>Favorites objects</h1>
    </div>)
}