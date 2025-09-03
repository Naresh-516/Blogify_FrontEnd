import { useContext,createContext,useState,useEffect } from "react"

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const[user,setUser]=useState(()=>{
        const savedUser=localStorage.getItem("user") ;
         return savedUser?JSON.parse(savedUser):null; })
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    const login=(userData,tokenData)=>{
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("token",tokenData);
        setUser(userData);
        setToken(tokenData);
    }
    const logout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken("");
    }
    return (
        <AuthContext.Provider value={{user,token,login,logout}}>
{children}
        </AuthContext.Provider>
    )

}
export const useAuth=()=>useContext(AuthContext);