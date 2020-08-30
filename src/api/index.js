import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent,global.Promise);
const API_ROOT = 'http://127.0.0.1:8080';

const responseBody = res => res.body;

let token = localStorage.getItem("jwtToken");

const tokenPlugin = secured =>{
   return(request)=>{
   if (token && secured)  {
      request.set('Authorization', `Bearer ${token}`)
   }
   };
};

export const api = {
   get:(url,secured = true) =>{
      return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody)
   },
   post:(url,body = null,secured = true)=>{
      return superagent.post(`${API_ROOT}${url}`,body).use(tokenPlugin(secured)).then(responseBody)
   },
   put:(url,body = null,secured = true)=>{
      return superagent.put(`${API_ROOT}${url}`,body).use(tokenPlugin(secured)).then(responseBody)
   },
   upload: (url,file,secured = true)=>{
      return superagent.post(`${API_ROOT}${url}`).attach('file',file).use(tokenPlugin(secured)).then(responseBody)
   },
   delete:(url,secured = true) =>{
     return superagent.del(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody);
   },
   setToken:(newToken) => token = newToken
};