import  axios  from "axios";

axios.defaults.baseURL = process.env.VUE_APP_ROUTE_API 

const provider = {
 getBrandsAll: async() =>  {
     return await axios.get('/brand/all')
 },
 saveBrand: async(formData) =>{
    return await axios.post('/brand/save', formData,{headers: {"Content-Type": "multipart/form-data"}})
 },
 getProductsAll: async() => {
    return await axios.get('/product/all')
 },
 saveProductsPost: async(editedItem)=> {
    return await axios.post('/product/save', editedItem)
 },
 saveProductsPut: async(uuid,editedItem)=> {
    return await axios.put(`/product/uuid/${uuid}`,editedItem)
 },
 deleteProducts: async(uuid) => {
    return await axios.delete(`/product/uuid/${uuid}`)
 },
 baseURL: ()=>{
    return process.env.VUE_APP_ROUTE_API 
 }
}
export default  provider;