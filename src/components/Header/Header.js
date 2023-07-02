import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from "react-bootstrap";
import React, { useState} from "react";
import {useNavigate} from "react-router-dom";

import AuthService from "../../services/auth.service";
import css from './addOrder.module.css'
import "./addOrder.module.css"


function Header() {
    const [showForRent, setShowForRent] = useState(false);
    const [showForSell, setShowForSell] = useState(false);
    const [showForDaily, setShowForDaily] = useState(false);

    const [currentUser,setCurrentUser]=useState("");
    const [url,setUrl]=useState("")

    let navigate = useNavigate();

    const customer=AuthService.getCurrentUser();

    const logOut=()=>{
        AuthService.logout();
        setCurrentUser(undefined);
        navigate("/");
    };

    const showDropdownForRent = (e)=>{
        setShowForRent(!showForRent);
    }
    const hideDropdownForRent = e => {
        setShowForRent(false);
    }
    const showDropdownForSell = (e)=>{
        setShowForSell(!showForSell);
    }
    const hideDropdownForSell = e => {
        setShowForSell(false);
    }
    const showDropdownForDaily = (e)=>{
        setShowForDaily(!showForDaily);
    }
    const hideDropdownForDaily = e => {
        setShowForDaily(false);
    }
    // const onClickRealEstateHeaderDropdown = (e) => {
    //   console.log(e.target.attributes[0].nodeValue)
    //
    //   console.log("on click trig")
    // }
    return (
        <>
            <Navbar bg="dark" variant="dark"  fixed="top">
                <Container>
                    <Navbar.Brand className={"for_title"} onClick={()=>(navigate("/"))} style={{cursor:"pointer"}}
                    >Нерухомості України</Navbar.Brand>
                    {/*<Navbar.Brand id="search_on_header" hidden={true}><input type="search"/></Navbar.Brand>*/}
                    <Nav className="me-auto" >

                        {customer&&<Nav.Link className={css.addOrder} onClick={()=>navigate("/:id/addObject")}>Додати оголошення</Nav.Link>}
                        <NavDropdown title="Оренда" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForRent}
                                     onMouseLeave={hideDropdownForRent}
                                     show={showForRent}>
                            {/*{currentUser&& <NavDropdown.Item href="#action3">Квартира</NavDropdown.Item>}*/}
                             <NavDropdown.Item value={`Apartment:Rent_for_a_month`} onClick={()=>{navigate(`/Apartment:Rent_for_a_month/ /search`);}}>
                                 Квартира
                             </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate(`/House:Rent_for_a_month/ /search`);}}>
                                Будинок
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate(`/Garage:Rent_for_a_month/ /search`);}}>
                                Гараж
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{navigate(`/Land:Rent_for_a_month/ /search`);}}>
                                Земельна ділянка
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Продаж" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForSell}
                                     onMouseLeave={hideDropdownForSell}
                                     show={showForSell}
                        >
                            <NavDropdown.Item onClick={()=>{navigate(`/Apartment:Sell/ /search`);}}>
                                Квартира
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate(`/House:Sell/ /search`);}}>
                                Будинок
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate(`/Garage:Sell/ /search`);}}>
                                Гараж
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{navigate(`/Land:Sell/ /search`);}}>
                                Земельна ділянка
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Подобово" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForDaily}
                                     onMouseLeave={hideDropdownForDaily}
                                     show={showForDaily}>
                            <NavDropdown.Item onClick={()=>{navigate(`/Apartment:Rent_per_day/ /search`);}}>
                                Квартира
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate(`/House:Rent_per_day/ /search`);}}>
                                Будинок
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{navigate(`/Garage:Rent_per_day/ /search`);}}>
                                Гараж
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{navigate(`/Land:Rent_per_day/ /search`);}}>
                                Земельна ділянка
                            </NavDropdown.Item>
                        </NavDropdown>

                        {customer&&(<Navbar.Collapse  className="justify-content-end">
                            <Navbar.Text id={"signed"} >
                                &nbsp;&nbsp;Signed in as: <a style={{cursor:"pointer"}} onClick={()=>navigate(`${customer.id}/profile`)}>{customer.name}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>)}

                        {customer?(<Nav.Link to={'/login'} onClick={logOut}>&nbsp;&nbsp;LogOut</Nav.Link>):
                            (<Nav.Link onClick={()=>navigate(`/login`)}>Login</Nav.Link>)
                        }
                        {
                            customer?(<Nav.Link onClick={()=>navigate(`/login`)}></Nav.Link>):(<Nav.Link onClick={()=>navigate(`/register`)}>Register</Nav.Link>)
                        }



                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;