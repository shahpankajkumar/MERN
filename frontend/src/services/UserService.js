import axios from 'axios'
const URL = "http://localhost:5000/api/auth"
const URL_EMP = "http://localhost:5000/api/employees"
let token = localStorage.getItem('token');

const create = async(data) => {
  let res = axios.post(`${URL}/signup`,data);
 return res
};
;
const login = async(data) => {
 let res = await axios.post(`${URL}/login`,data);
    localStorage.setItem('email',data.email);
   localStorage.setItem('token',res.data.token);
   console.log("loginuserapi",res)
   return res
};

 const findUser = async(email) => {
   let instance = await  axios.create({
     baseURL: URL,
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
  let res = instance.get(`/user?email=${email}`)
     return res
  };


 const displayEmpApi = async() => {
   let instance = await  axios.create({
     baseURL: URL_EMP,
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
  let res = instance.get(`/employees`)
     return res
  };


  const findEmp = async(id) => {
     let instance = await  axios.create({
       baseURL: URL_EMP,
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
    let res = instance.get(`/get/${id}`)
       return res
    };

    const deleteApi = async(id) => {
       let instance = await  axios.create({
         baseURL: URL_EMP,
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
      let res = instance.delete(`/delete/${id}`)
         return res
      };

      const updateApi = async({data}) => {
         let instance = await  axios.create({
           baseURL: URL_EMP,
           headers: {
             Authorization: `Bearer ${token}`
           }
         });
        let res = instance.put(`/update`, data)
           return res
        };

const UserService = {
  create,
  login,
  findUser,
  displayEmpApi,
  deleteApi,
  updateApi,
  findEmp
};

export default UserService;