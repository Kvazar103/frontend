import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from "react-bootstrap";
import {useState} from "react";
import icon from '../../images/register_icon/icon.png';
import css from '../../images/register_icon/icon.module.css';
import AddUser from "../AddUser/AddUser";
import {Link} from "react-router-dom";


function Header() {
    const [showForRent, setShowForRent] = useState(false);
    const [showForSell, setShowForSell] = useState(false);
    const [showForDaily, setShowForDaily] = useState(false);

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
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Оренда" id="navbarScrollingDropdown"
                                     onMouseEnter={showDropdownForRent}
                                     onMouseLeave={hideDropdownForRent}
                                     show={showForRent}>
                            <NavDropdown.Item href="#action3">Квартира</NavDropdown.Item>
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

                        <div>

                            {/*<Nav.Link href="/login"> <img src={icon} className={css.icon}/></Nav.Link>*/}
                            {/*<img src={icon} className={css.icon}/>*/}
                           <Link to={'/register'}><img src={icon} className={css.icon}/></Link>
                            <Link to={'/login'}>Login</Link>
                        </div>

                    </Nav>
                </Container>
            </Navbar>

        </>
    );
}

export default Header;