import CountCar from "../components/CountCar"
import CameraCCTV from "../components/CameraCCTV"
import CameraPlate from "../components/CameraPlate"
import PlatePass from "../components/PlatePass";
import PlateNoPass from "../components/PlateNoPass";
import { useState, useEffect} from "react";
import axios from "axios";

function UserDashboard(){
    
    const [status, setStatus] = useState([]);
    const [haveCars, setHaveCars] = useState(false);
    const [resultScan, setResultScan] = useState(false);


    const fetchStatus = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/events')
            setStatus(response.data[0]);
            setHaveCars(status.haveCars);
            setResultScan(status.resultScan);
        } catch (error) {
            console.log('error', error)
        }

    }

    useEffect(()=>{
        fetchStatus()
        console.log(status);
     }, [status])


    return(
        <>

            {haveCars ? (
                resultScan ? (
                    <PlatePass />
                ) : (
                    <PlateNoPass />
                )
            ) : (
                <div className="grid grid-cols-2 h-full">
                <div className="left-side flex justify-center items-center ">
                    <CountCar />
                </div>
                <div className="right-side grid grid-cols-1">
                     <div className="grid" style={{ gridTemplateRows: "2fr 1fr" }}>
                        <CameraCCTV />
                        <CameraPlate />
                     </div>
                </div>
                </div>
            )}

        </>

    )
}

export default UserDashboard
