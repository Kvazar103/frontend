import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import css from "../../images/lviv_city/lviv_sunrises_and_sunsets.module.css";
import AuthService from "../../services/auth.service";


export default function AddUser(){
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        login:"",
        password:"",
        phone_number:"",
    });
    const [avatar,setAvatar]=useState('');

    const { name, surname, email,login,password,phone_number } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onFileChange = (e) => {
      setAvatar(e.target.files)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData=new FormData();
        formData.append("customer",JSON.stringify(user))
        formData.append("avatar",avatar[0])
        console.log(user)
        console.log(avatar)
        await axios.post("http://localhost:8080/save",formData);
        // navigate("/");
        AuthService.login(user.login,user.password).then(()=>{
            navigate("/");
            window.location.reload();
        })
    };



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>

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
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type={"password"}
                                className="form-control"
                                placeholder="Enter your password"
                                name="password"
                                value={password}
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
                                   name="avatar"
                                   accept="image/png, image/jpeg"
                                   onChange={onFileChange}/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}