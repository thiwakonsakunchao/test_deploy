import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Times',
        selector: row => row.times,
    },
    {
        name: 'Busy spots',
        selector: row => row.amountSpaces,
    },
    {
        name: 'Total spots',
        selector: row => row.totalSpaces,
    },
    {
        name: 'Images',
        cell: row => <a href={row.imageParking} target="_blank" className="text-blue-700">Images</a>,
        selector: row => row.imageParking,
    }
];

function CarsChart() {
    const [optionList, setOptionList] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [data, setData] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:3000/days")
            .then((response) => {
                const result = response.data;
                setOptionList(result);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    

    const handleOptionChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
    };

    const handleButtonClick = () => {
        const selectedDate = optionList[selectedOption]?.date;
        if (selectedDate) {
            const selectedDateObject = optionList.find(day => day.date === selectedDate);
            if (selectedDateObject) {
                const selectedParkingData = selectedDateObject.parkings || [];
                setData(selectedParkingData);
            } else {
                setData([]);
            }
        } else {
            setData([]);
        }
    };

    return (
        <>
            <div className="mb-5 mt-5"></div>
            <div className="grid grid-cols-2">
                <div className="">
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </div>
                <div className=" flex justify-center items-center">
                    <div className="h-[300px] w-[500px] flex justify-center items-center flex-col border-2 rounded border-gray-950">
                        <div className="inline-block relative w-64">
                            <select
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleOptionChange}
                                value={selectedOption}
                            >
                                <option value="">Select a date</option>
                                {optionList.map((option, index) => (
                                    <option key={index} value={index}>
                                        {option.date}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                            onClick={handleButtonClick}
                            disabled={!selectedOption}
                        >
                            Select Date
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarsChart;
