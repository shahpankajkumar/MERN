import axios from 'axios'
const URL = "http://localhost:5000/api/departments"
let token = localStorage.getItem('token');

const addDept = async(data) => {
  let instance = await  axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
 let res = instance.post('/add', data)
    return res
 };

 const display = async() => {
   let instance = await  axios.create({
     baseURL: URL,
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
  let res = instance.get(`/get`)
     return res
  };

  const findDept = async(id) => {
     let instance = await  axios.create({
       baseURL: URL,
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
    let res = instance.get(`/get/${id}`)
       return res
    };

    const deleteDept = async({data}) => {
       let instance = await  axios.create({
         baseURL: URL,
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
      let res = instance.post(`/delete`, data)
         return res
      };

      const UpdateApi = async({data}) => {
         let instance = await  axios.create({
           baseURL: URL,
           headers: {
             Authorization: `Bearer ${token}`
           }
         });
        let res = instance.put(`/updateDept`, data)
           return res
        };

const UserService = {
  addDept,
  display,
  findDept,
  deleteDept,
  UpdateApi,
};

export default UserService;