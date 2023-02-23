import css from './FooterStyle.module.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

 function Footer(){
    return(

        <Navbar  expand="lg" variant="dark" bg="dark">
            <Container>
                <Navbar.Brand className={css.FooterStyle} href="#">Львів 2023</Navbar.Brand>
            </Container>
        </Navbar>

    )
}
export default Footer;