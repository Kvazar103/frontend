import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import icon from '../../images/register_icon/icon.png';
// import css from '../../images/register_icon/icon.module.css';
import AddUser from "../AddUser/AddUser";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import css from './addOrder.module.css'


function Header() {
    const [showForRent, setShowForRent] = useState(false);
    const [showForSell, setShowForSell] = useState(false);
    const [showForDaily, setShowForDaily] = useState(false);

    const [currentUser,setCurrentUser]=useState(undefined);

    let navigate = useNavigate();

    useEffect(()=>{
        const customer=AuthService.getCurrentUser();

        if(customer){
            setCurrentUser(customer)
            console.log(customer)
        }
        // EventBus.on("logout", () => {
        //     logOut();
        // });
        //
        // return () => {
        //     EventBus.remove("logout");
        // };
    },[])

    const logOut=()=>{
        AuthService.logout();
        setCurrentUser(undefined);
        navigate("/");
        window.location.reload();
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
    return (
        <>
            <Navbar bg="dark" variant="dark"  fixed="top">
                <Container>
                    <Navbar.Brand href="/">Нерухомості Львів</Navbar.Brand>
                    <Nav className="me-auto" >

                        {currentUser&&<Nav.Link className={css.addOrder} href="/:id/addObject">Додати оголошення</Nav.Link>}
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Оренда" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForRent}
                                     onMouseLeave={hideDropdownForRent}
                                     show={showForRent}>
                            {currentUser&& <NavDropdown.Item href="#action3">Квартира</NavDropdown.Item>}
                            <NavDropdown.Item href="#action4">
                                Будинок
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Земельна ділянка
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Продаж" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForSell}
                                     onMouseLeave={hideDropdownForSell}
                                     show={showForSell}
                        >
                            <NavDropdown.Item href="#action3">Квартира</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Будинок
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Земельна ділянка
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Подобово" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForDaily}
                                     onMouseLeave={hideDropdownForDaily}
                                     show={showForDaily}>
                            <NavDropdown.Item href="#action3">Квартира</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Будинок
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Земельна ділянка
                            </NavDropdown.Item>
                        </NavDropdown>


                        {currentUser&&(<Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                &nbsp;&nbsp;Signed in as: <a href="/profile">{currentUser.name}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>)}

                        {currentUser?(<Nav.Link to={'/login'} onClick={logOut}>&nbsp;&nbsp;LogOut</Nav.Link>):
                            (<Nav.Link href="/login">Login</Nav.Link>)
                        }
                        {
                            currentUser?(<Nav.Link href="/login"></Nav.Link>):(<Nav.Link href="/register">Register</Nav.Link>)
                        }

                            {/*<Nav.Link href="/login"> <img src={icon} className={css.icon}/></Nav.Link>*/}
                            {/*<img src={icon} className={css.icon}/>*/}




                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;