import axios from "axios";

const API_URL="http://localhost:8080/"
const register=async (name,surname,email,login,password,phone_number)=>{
    return await axios.post(API_URL+"save",{
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
const addUser = async (formData) => {
    return await axios.post(API_URL+"save",formData)
}
const addObject=async (customerID,formData,config)=>{
    return await axios.post(API_URL+customerID+"/addObject",formData,config)
}
const getCustomer =async (customerID) => {
    return await axios.get(API_URL+"customer/"+customerID)
}
const getCustomerWithPassword =async (customerID,config) => {
    return await axios.get(API_URL+"updated/customerWithPassword/"+customerID,config)
}
const changePassword = async (formData,customerID,config) => {
    return await axios.patch(API_URL+customerID+"/checkPassword",formData,config)
}
const getFavorites = async (customerID) => {
  return await axios.get(API_URL+"customer/favorites/"+customerID)
}
const getRealtyObject= async (realtyObjectID)=>{
    return await axios.get(API_URL+"object/"+realtyObjectID)
}
const getAllCustomers =async () => {
  return await axios.get(API_URL+"getAllCustomers")
}
const getCustomerAfterLoginUpdate =async (customerID) => {
  return await axios.get(API_URL+"customerAfterLoginUpdate/"+customerID)
      .then((value)=>{
          console.log(value)
          console.log("customer after login update")
      })
}
const getCustomerLoginAndPasswordAfterLoginUpdate =async (customerID) => {
    return await axios.get(API_URL+"customerLoginAndPasswordAfterLoginUpdate/"+customerID)
}
const logout = () => {
  localStorage.removeItem("customer");
  localStorage.removeItem("token");
}

const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("customer"));
}
const addRealtyObjectToFavorite =async (customerID,formData,config) => {
    return await axios.patch(API_URL+"update/customer/"+customerID+"/addedToFavoriteList",formData,config)
}
const deleteRealtyObjectFromFavoriteList =async (customerID,realtyObjectID,config) => {
    return await axios.delete(API_URL+"delete/customer/"+customerID+"/addedToFavoriteRealtyObject/"+realtyObjectID,config)
}
const deleteRealtyObject =async (customerID,realtyObjectID,config) => {
    return await axios.delete(API_URL+"customer/"+customerID+"/realtyObject/"+realtyObjectID,config)
}
const get12RandomRealtyObjects =async () => {
    return await axios.get(API_URL+"get12RandomRealtyObject")
}
const getSelectedRealtyObject =async (formData) => {
    return await axios.post(API_URL+"getSelectedRealtyObjects",formData)
}
const updateRealtyObject =async (formData,realtyObjectID,customerID,config) => {
    return await axios.patch(API_URL+realtyObjectID+"/"+customerID+"/updateRealtyObject",formData,config)
}
const updateProfile =async (formData,customerID,config) => {
    return await axios.patch(API_URL+customerID+"/updateProfile",formData,config)
}
const deleteProfile =async (customerID,config) => {
    return await axios.delete(API_URL+"customer/deleteProfile/"+customerID,config)
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
    getCustomerWithPassword,
    deleteProfile,
    getCustomerAfterLoginUpdate,
    getCustomerLoginAndPasswordAfterLoginUpdate
}
export default AuthService;