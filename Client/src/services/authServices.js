import  axiosInstance  from "./axios.config";

export const login =  async (email , password) => {
   const urlLogin = "auth/login";
   const requestLogin = await axiosInstance.post(
    urlLogin,
    {
        email ,
        password
    }
   );
   return requestLogin.data;
};
export const register = async(full_name,email,password , role) =>{
    const urlLogin = "auth/register";
    console.log(full_name ,email , password , role);    
    const requestRegister = await axiosInstance.post(
     urlLogin,
     {
        full_name ,
         email,
         password,
         role
     }
    );
    return requestRegister.data;
};

export const logout = async () => {
    const urlLogout = "auth/logout";
    const requestLogout = await axiosInstance.post(urlLogout);
    console.log(requestLogout);
    return requestLogout;
}

export const getUserbyToken = async () => {
    const urlGetUser = "auth/get-token";
    const requestGetUser = await axiosInstance.get(urlGetUser);
    return requestGetUser.data;
}