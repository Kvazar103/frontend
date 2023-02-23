import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


export default function Login(){
    let navigate=useNavigate();

    const [user,setUser]=useState({
        login:"",
        password:""
    });

    const {login,password}=user;

    const onInputChange = (e) => {
      setUser({...user,[e.target.name]:e.target.value})
    }
    const onSubmit =async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8080/login",user)
          .then(res=>{
              console.log(res)
              console.log("***")
              console.log(res.data)
              console.log(res.headers.authorization)
              if(res.headers.authorization){
                  localStorage.setItem("user", JSON.stringify(res.data));
              }
              return res.data;
          })
        navigate("/")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Login</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
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