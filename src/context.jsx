import { createContext , useState , useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({children}) =>{
    const [userID , setUserID] = useState("");
    return (<AppContext.Provider value={{ userID , setUserID}}> {children} </AppContext.Provider>)
}

export const userContext = () => {
    return useContext(AppContext);
}