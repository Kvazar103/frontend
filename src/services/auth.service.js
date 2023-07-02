import axios from "axios";


const API_URL="http://localhost:8080/"
let token=JSON.parse(localStorage.getItem('token'));
let config={
    headers:{
        Authorization:`${token}`
    }
}

const register=(name,surname,email,login,password,phone_number)=>{
    return axios.post(API_URL+"save",{
        name,
        surname,
        email,
        login,
        password,
        phone_number
    })
}
const saveObject = (address,distinct,rooms,square,real_estate,sum,currency,type_of_order_of_real_estate) => {
    const customer=JSON.parse(localStorage.getItem("customer"));
  return axios.post(API_URL+customer.id+"/addObject",{
      address,
      distinct,
      rooms,
      square,
      real_estate,
      sum,
      currency,
      type_of_order_of_real_estate
  })
}

const saveObjectV2 = (object,img) => {
    const customer=JSON.parse(localStorage.getItem("customer"));
    return axios.post(API_URL+customer.id+"/addObject",{
        object,
        img
    })
}

const login=async (login,password)=>{
    return await axios.post(API_URL+"login",{
        login,
        password
    })
        .then((response)=>{
            if(response.headers.authorization){
                console.log(response)
                console.log(response.headers.authorization)
                console.log(response.data)
                localStorage.setItem("customer",JSON.stringify(response.data))
                localStorage.setItem("token",JSON.stringify(response.headers.authorization))
            }
            return response;
        });
};
const addUser = (formData) => {
    return axios.post(API_URL+"save",formData)
}
const addObject=(customerID,formData)=>{
    return axios.post(API_URL+customerID+"/addObject",formData,config)
}
const getCustomer =async (customerID) => {
    return await axios.get(API_URL+"customer/"+customerID)
}
const getCustomerWithPassword = (customerID) => {
  return axios.get(API_URL+"updated/customerWithPassword/"+customerID,config)
}
const changePassword = (formData,customerID) => {
    return axios.patch(API_URL+customerID+"/checkPassword",formData,config)
}
const getFavorites = (customerID) => {
  return axios.get(API_URL+"customer/favorites/"+customerID)
}
const getRealtyObject=(realtyObjectID)=>{
    return axios.get(API_URL+"object/"+realtyObjectID)
}
const getAllCustomers = () => {
  return axios.get(API_URL+"getAllCustomers")
}

const logout = () => {
  localStorage.removeItem("customer");
  localStorage.removeItem("token");
}

const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("customer"));
}
const addRealtyObjectToFavorite = (customerID,formData) => {
    return axios.patch(API_URL+"update/customer/"+customerID+"/addedToFavoriteList",formData,config)
}
const deleteRealtyObjectFromFavoriteList = (customerID,realtyObjectID) => {
    return axios.delete(API_URL+"delete/customer/"+customerID+"/addedToFavoriteRealtyObject/"+realtyObjectID,config)
}
const deleteRealtyObject = (customerID,realtyObjectID) => {
    return axios.delete(API_URL+"customer/"+customerID+"/realtyObject/"+realtyObjectID,config)
}
const get12RandomRealtyObjects = () => {
    return axios.get(API_URL+"get12RandomRealtyObject")
}
const getSelectedRealtyObject = (formData) => {
    return axios.post(API_URL+"getSelectedRealtyObjects",formData)
}
const updateRealtyObject = (formData,realtyObjectID,customerID) => {
    return axios.patch(API_URL+realtyObjectID+"/"+customerID+"/updateRealtyObject",formData,config)
}
const updateProfile =async (formData,customerID) => {
    return await axios.patch(API_URL+customerID+"/updateProfile",formData,config)
}

const AuthService={
    register,
    login,
    logout,
    getCurrentUser,
    saveObject,
    saveObjectV2,
    addUser,
    addObject,
    getCustomer,
    changePassword,
    getFavorites,
    getRealtyObject,
    getAllCustomers,
    addRealtyObjectToFavorite,
    deleteRealtyObjectFromFavoriteList,
    deleteRealtyObject,
    get12RandomRealtyObjects,
    getSelectedRealtyObject,
    updateRealtyObject,
    updateProfile,
    getCustomerWithPassword
}
export default AuthService;