import css from './FooterStyle.module.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

 function Footer(){
    return(

        <Navbar  expand="lg" variant="dark" bg="dark" style={{height:"360px"}}>
            <Container style={{textAlign:"left"}}>
                {/*<Navbar.Brand className={css.FooterStyle} href="#">Львів 2023</Navbar.Brand>*/}
                <Navbar.Brand style={{marginBottom:"210px"}}>
                    <h6 style={{textAlign:"left"}}>Call-центр</h6>
                    <div>
                        +38 0XX XXX XX XX
                    </div>
                    <div>
                        +38 0XX XXX XX XX
                    </div>
                    <div>
                        +38 0XX XXX XX XX
                    </div>
                </Navbar.Brand>
                <Navbar.Brand>
                    <h6 style={{textAlign:"left"}}>Офіси оренди нерухомості</h6>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 10
                    </div>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 1
                    </div>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 9
                    </div>
                    <h6 style={{textAlign:"left"}}>Офіси продажу нерухомості</h6>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 6
                    </div>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 2a
                    </div>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 39
                    </div>
                    <div style={{textAlign:"left"}}>
                        м.Львів,xxxxx 202
                    </div>
                    <div style={{marginTop:"40px",textAlign:"center"}}>
                        Львів 2023
                    </div>
                </Navbar.Brand>
                <Navbar.Brand style={{textAlign:"left",marginBottom:"210px"}}>
                    <h6>Графік роботи офісів</h6>
                    <div>
                        9:00-20:00(понеділок-пятниця)
                    </div>
                    <div>
                        10:00-19:00(субота)
                    </div>
                    <div>
                        вихідний(неділя)
                    </div>
                </Navbar.Brand>

            </Container>



        </Navbar>

    )
}
export default Footer;