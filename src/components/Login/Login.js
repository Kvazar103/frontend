import {Link, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import axios from "axios";
import AuthService from "../../services/auth.service";
import CheckButton from "react-validation/build/button";



    const Login = () => {
        let navigate = useNavigate();



        const [login, setLogin] = useState("");
        const [password, setPassword] = useState("");
        // const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState(null);

        const onChangeLogin = (e) => {
            const login = e.target.value;
            setLogin(login);
            setMessage(null)
        }
        const onChangePassword = (e) => {
            const password = e.target.value;
            setPassword(password);
            setMessage(null)
        }

        const handleLogin = (e) => {
            e.preventDefault();


                AuthService.login(login, password).then(
                    () => {
                        navigate("/");
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        console.log(resMessage)
                        console.log(error)
                        setMessage("Wrong login or password");

                    }
                );
            }




        return (
           <div className="container">
               <br/><br/><br/><br/><br/>
                <div className="row">
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                       <h2 className="text-center m-4">Login</h2>
                        <form onSubmit={handleLogin}>
                            {message}
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
                                    onChange={onChangeLogin}
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
                                    onChange={onChangePassword}
                                />
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
    export default Login;