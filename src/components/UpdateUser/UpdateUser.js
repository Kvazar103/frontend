import {useNavigate, Navigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import css from "../AddObject/FormStyle.module.css";
import AuthService from "../../services/auth.service";
import {Button, CloseButton} from "react-bootstrap";



export default function UpdateUser() {

    const navigate=useNavigate();
    let currentUser=AuthService.getCurrentUser();
    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    console.log(url.split('/',4))
    let arrayOfUrl=url.split('/',4)
    let idFromUrl=arrayOfUrl.slice(-1);
    console.log(idFromUrl[0])

    const [imageToShow,setImageToShow]=useState(`http://localhost:8080/images/${currentUser ? currentUser.name : ""}${currentUser ? currentUser.surname : ""}_avatar/${currentUser ? currentUser.avatar : ""}`);
    const [avatar,setAvatar]=useState('avatar');

    const [user, setUser] = useState({
        name: `${currentUser?currentUser.name:""}`,
        surname: `${currentUser?currentUser.surname:""}`,
        email: `${currentUser?currentUser.email:""}`,
        login:`${currentUser?currentUser.login:""}`,
        // password:`${currentUser?currentUser.password:""}`,
        phone_number:`${currentUser?currentUser.phone_number:""}`,
    });


    if((currentUser == null)||(currentUser && ((currentUser.id > idFromUrl[0])||(currentUser.id < idFromUrl[0])))){   ///захист від не авторизованих користувачів
        return <Navigate to={"/login"}/>
    }


    const { name, surname, email,login, phone_number } = user;

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageToShow(URL.createObjectURL(event.target.files[0]));
                setAvatar(event.target.files)

        }
    }
    const onDeleteImage=(e)=>{
       document.getElementById("input").value=null

        setImageToShow('http://localhost:8080/images/profile/profile_picture.jpg')
        setAvatar('')
    }
    const onUpdateImage=(e)=>{
        document.getElementById("input").click()
        if (e.target.files && e.target.files[0]) {
            setImageToShow(URL.createObjectURL(e.target.files[0]));
            setAvatar(e.target.files)
        }
    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    // const onFileChange = (e) => {
    //     setAvatar(e.target.files)
    // }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData=new FormData();
        formData.append("customer",JSON.stringify(user))
        // formData.append("avatar",avatar[0])
        console.log(user)
        console.log("user and avatar")
        console.log(avatar)
        if(avatar === "avatar"){
            console.log("avatar is not changed")
            formData.append("message",'NotChanged')
        }else if(avatar===""){
            console.log("avatar deleted")
            formData.append("message",'Deleted')
        }
        else {
            console.log("new avatar")
            formData.append("avatar",avatar[0])
        }
        console.log(formData)
        await axios.patch(`http://localhost:8080/${idFromUrl[0]}/updateProfile`,formData);

        const c=await axios.get(`http://localhost:8080/customer/${idFromUrl[0]}`);
        localStorage.setItem('customer',JSON.stringify(c.data))

        navigate(`/${idFromUrl[0]}/profile`);
        window.location.reload();


    };


    return(<div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Update Profile</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Surname" className="form-label">
                                Surname
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your surname"
                                name="surname"
                                value={surname}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Login" className="form-label">
                                Login
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your login"
                                name="login"
                                value={login}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Phone number" className="form-label">
                                Phone number
                            </label>
                            <input
                                type={"tel"}
                                className="form-control"
                                placeholder="Enter your phone number"
                                name="phone_number"
                                value={phone_number}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">

                            <label htmlFor="Choose your avatar" className="form-label">
                                Choose your avatar
                            </label><br/>
                            <input type={"file"}
                                   className="form-control"
                                   id="input"
                                   name="avatar"
                                   accept="image/png, image/jpeg"
                                   onChange={onImageChange}/>
                            <img id="img" style={{width:"150px",height:"150px"}} src={imageToShow}/><br/>
                            <Button onClick={onDeleteImage}  variant="danger">delete avatar</Button><br/>
                            <Button onClick={onUpdateImage}  variant="success">change avatar</Button>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to={`/${idFromUrl[0]}/profile`}>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

