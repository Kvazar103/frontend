import {Link, Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button} from "react-bootstrap";

import AuthService from "../../services/auth.service";


export default function ChangePassword() {

    let url=window.location.toString()  //присвоюємо стрінгову урлу даної сторінки
    console.log(url.split('/',4))
    let arrayOfUrl=url.split('/',4)
    let idFromUrl=arrayOfUrl.slice(-1);
    console.log(idFromUrl[0])
    let currentUser=AuthService.getCurrentUser();
    let navigate=useNavigate();
    let token=JSON.parse(localStorage.getItem('token'));
    let config={
        headers:{
            Authorization:`${token}`
        }
    }

    const [old_password,setOld_password]=useState('');
    const [new_password,setNew_password]=useState('');
    const [ReEntered_New_password,setReEntered_New_password]=useState('');
    const [messagePasswordMatches,setMessagePasswordMatches]=useState('')
    const [messageOldPasswordMatch,setMessageOldPasswordMatch]=useState('');
    const [messageCanNotBeNull,setMessageCanNotBeNull]=useState('');

    if((currentUser == null)||(currentUser && ((currentUser.id > idFromUrl[0])||(currentUser.id < idFromUrl[0])))){   ///захист від не авторизованих користувачів
        return <Navigate to={"/login"}/>
    }
    const onChangeOldPassword =(e) => {
      const old_password=e.target.value;
      setOld_password(old_password);
      setMessageOldPasswordMatch("");
    }
    const onChangeNewPassword = (e) => {
        const new_password=e.target.value;
        setNew_password(new_password);
        setMessageCanNotBeNull("")
        if(new_password!==ReEntered_New_password){
            setMessagePasswordMatches("Passwords don't match")
            document.getElementById("buttonSubmit").disabled=true;
            if(new_password===""){
                document.getElementById("buttonSubmit").disabled=true;
            }
        } else {
            setMessagePasswordMatches("")
            document.getElementById("buttonSubmit").disabled=false;
        }
    }
    const onChangeReEnteredNewPassword = (e) => {
        const ReEntered_New_password=e.target.value;
        setReEntered_New_password(ReEntered_New_password);
        setMessageCanNotBeNull("");
        if(new_password!==ReEntered_New_password){
            setMessagePasswordMatches("Passwords don't match")
            document.getElementById("buttonSubmit").disabled=true;
        } else {
            setMessagePasswordMatches("")
            document.getElementById("buttonSubmit").disabled=false;
        }
    }

    const Submit =async (e) => {
      e.preventDefault();
      const formData=new FormData();
      formData.append("new_password",new_password);
      formData.append("old_password",old_password);
      if(new_password==="" && ReEntered_New_password===""){
          setMessageCanNotBeNull("Password cannot be null")
          return false;
      }else {
          setMessageCanNotBeNull("")
      }

        AuthService.changePassword(formData,idFromUrl[0],config)
            .then((response)=> {
                    console.log(response)
                    navigate(`/${idFromUrl[0]}/profile`)
                }
            )
            .catch((error)=>{
                console.log(error)
                setMessageOldPasswordMatch("The current password is incorrect")
            })

    }

    return(<div className="container">
        <br/><br/><br/><br/><br/>
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Change password</h2>
                <form onSubmit={Submit}>
                    <div className="mb-3">
                        <div style={{color:"red"}}>{messageOldPasswordMatch}</div>
                        <input
                            type={"password"}
                            className="form-control"
                            placeholder="Old password"
                            name="old_password"
                            value={old_password}
                            onChange={onChangeOldPassword}
                        />
                    </div>
                <hr/>
                    <div style={{color:"red"}}>{messagePasswordMatches}</div>
                    <div style={{color:"red"}}>{messageCanNotBeNull}</div>
                    <div className="mb-3">
                        <input
                            type={"password"}
                            className="form-control"
                            placeholder="New password"
                            name="new_password"
                            value={new_password}
                            onChange={onChangeNewPassword}
                        />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="Re_Enter_New_Password" className="form-label">

                    </label>
                    <input
                        type={"password"}
                        className="form-control"
                        placeholder="Re-enter new password"
                        name="ReEntered_New_password"
                        value={ReEntered_New_password}
                        onChange={onChangeReEnteredNewPassword}
                    />
                    </div>
                    <Button variant="primary" type="submit" id="buttonSubmit">
                        Submit
                    </Button>
                    <Link className="btn btn-outline-danger mx-2" to={`/${idFromUrl[0]}/profile`}>
                        Cancel
                    </Link><br/><br/>
                </form>
            </div>
        </div>
    </div>)
}