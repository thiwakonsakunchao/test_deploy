
import axios from "axios";
import Navbar from "../components/Navbar"
import TableListEntranceExit from "../components/TableListEntranceExit"
import { useEffect } from "react";


function EntranceExitPage(){
    
    useEffect(() => {
        const getUsers = async () => {
            try {
              const authToken = localStorage.getItem("token");
              if (!authToken) {
                // Redirect to login page if token is missing
                window.location = "/login";
                return;
              }
              const response = await axios.get("http://13.214.18.38:8000/api/auth", {
                headers: {
                  Authorization: `Bearer ${authToken}` // Fix: Added space after 'Bearer'
                }
              })
              console.log("user data", response.data);
              console.log(authToken);
            } catch (error) {
              // Handle errors
              console.log("error", error);
              if (error.response && error.response.status === 401) {
                // Token is invalid or expired, remove token from localStorage and redirect to login page
                localStorage.removeItem("token");
                window.location = "/login";
              } else {
                // Other error occurred, log it
                localStorage.removeItem("token");
                window.location = "/login";
                console.error("Error fetching user data:", error);
              }
            }
          };
          
    
        getUsers();
      }, []);

    return(
        <>
           <Navbar/>
           <TableListEntranceExit/>
        </>

    )
}

export default EntranceExitPage