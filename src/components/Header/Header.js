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

    let navigate = useNavigate();

    const customer=AuthService.getCurrentUser();

    const logOut=()=>{
        AuthService.logout();
        navigate("/");
    };

    const showDropdownForRent = ()=>{
        setShowForRent(!showForRent);
    }
    const hideDropdownForRent = () => {
        setShowForRent(false);
    }
    const showDropdownForSell = ()=>{
        setShowForSell(!showForSell);
    }
    const hideDropdownForSell = () => {
        setShowForSell(false);
    }
    const showDropdownForDaily = ()=>{
        setShowForDaily(!showForDaily);
    }
    const hideDropdownForDaily = () => {
        setShowForDaily(false);
    }
    const onSignInNameClick = () => {
        navigate('/')
        navigate(`${customer.id}/profile`)
    }
    return (
        <>
            <Navbar bg="dark" variant="dark"  fixed="top">
                <Container>
                    <Navbar.Brand className={"for_title"} onClick={()=>(navigate("/"))} style={{cursor:"pointer"}}
                    >Нерухомості України</Navbar.Brand>
                    <Nav className="me-auto" >

                        {customer&&<Nav.Link className={css.addOrder} onClick={()=>navigate("/:id/addObject")}>Додати оголошення</Nav.Link>}
                        <NavDropdown title="Оренда" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForRent}
                                     onMouseLeave={hideDropdownForRent}
                                     show={showForRent}>
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
                                &nbsp;&nbsp;Signed in as: <span onClick={onSignInNameClick} style={{cursor:"pointer",color:"white"}} >{customer.name}</span>
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