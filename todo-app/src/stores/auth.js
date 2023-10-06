import { defineStore } from 'pinia';
import { computed, ref ,reactive} from 'vue';

import {  login, register, logout, getUser } from '../http/auth-api';


export const useAuthStore = defineStore('authStore', ()=>{
    const user = ref({})
    const errors = ref({})
    const isLoggedIn = computed(()=> !!user.value)
    
    const fetchUser = async ()=>{
      try{
          const {data}  = await getUser();
          user.value =  data
      }catch(error){
        user.value = null
        errors.value =  error.response
      }
    }

    const handleLogin = async (credentials) => {
        try {
            const response = await login(credentials)
            localStorage.setItem('jwt_token', response.data.token)
            await fetchUser()
            errors.value= {};
        } catch (error) {
           if(error.response.status === 422){
            errors.value =  error.response.data.errors
           }else{
            errors.value =  error.response
           }
        }

    };

    const handleRegister = async (newUser) => {
        try {
          await register(newUser);
          await handleLogin({
            email: newUser.email,
            password: newUser.password,
          });
        } catch (error) {
          if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
          }
        }
      };

    const handleLogout = async() => {
        await logout()
        localStorage.removeItem('jwt_token');
        user.value = null
    };

    return{
        user, errors, isLoggedIn, fetchUser, handleLogin, handleRegister, handleLogout
    }
});