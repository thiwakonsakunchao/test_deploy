import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Date',
        selector: row => row.date,
    },
    {
        name: 'Time',
        selector: row => row.time,
    },
    {
        name: 'License plate number',
        selector: row => row.number,
    },
    {
        name: 'Province of license plate',
        selector: row => row.province,
    },
    {	
        name: 'Status',
        selector: row => row.status,
    }
];


function TableListEntranceExit() {
   
    const [data, setData] = useState([]);

    


    useEffect(() => {
        axios
            .get("http://localhost:3000/entranceexit")
            .then((response) => {
                const result = response.data;
                setData(result)
                console.log(result);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    

 
    return (
        <>
            <div className="mb-5 mt-5"></div>
         
                <div className="">
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
               
        </>
    );
}

export default TableListEntranceExit;
