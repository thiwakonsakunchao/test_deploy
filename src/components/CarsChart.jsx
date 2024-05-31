import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function CarsChart() {
  const [option, setOption] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [111, 222, 333, 444]
    }
  });

  const [serie, setSerie] = useState([
    {
      name: "cars",
      data: [0, 0, 0, 0]
    }
  ]);

  const [avgCars, setAvgCars] = useState(0);
  const [maxCarsHours, setMaxCarsHours] = useState([]);
  const [minCarsHours, setMinCarsHours] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [allHours, setAllHours] = useState([]);
  const [allCars, setAllCars] = useState([]);

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

  useEffect(() => {
    if (selectedDate !== "") {
      const selectedData = optionList.find(option => option.date === selectedDate);
      if (selectedData) {
        const hours = selectedData.hours.map((hour) => hour.hour);
        const cars = selectedData.hours.map((amountCars) => amountCars.amountCars);
        setAllHours(hours);
        setAllCars(cars);

        // Find max and min cars and their hours
        const maxCars = Math.max(...cars);
        const minCars = Math.min(...cars);
        const maxCarsHour = hours.filter((hour, index) => cars[index] === maxCars);
        const minCarsHour = hours.filter((hour, index) => cars[index] === minCars);
        setMaxCarsHours(maxCarsHour);
        setMinCarsHours(minCarsHour);
      }
    }
  }, [selectedDate, optionList]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleButtonClick = () => {
    setOption({
      ...option,
      xaxis: {
        categories: allHours
      }
    });
    setSerie([
      {
        ...serie[0],
        data: allCars
      }
    ]);
    const totalCars = allCars.reduce((acc, curr) => acc + curr, 0);
    const averageCars = totalCars / 24;
    setAvgCars(averageCars);
  };

  return (
    <>
      <div className="grid grid-cols-2 mt-10">
  <div className="bg-gray-100 p-5 rounded-lg ml-10">
    <Chart options={option} series={serie} type="bar" />
  </div>
  <div className="flex justify-center items-center h-full">
  <div className="w-[500px] bg-white p-8 rounded-lg border-2 border-gray-950 ">
    <div className="inline-block relative w-64">
      <input
        type="date"
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ml-5"
      onClick={handleButtonClick}
      disabled={!selectedDate}
    >
      Select Date
    </button>
    <div className="mb-5 mt-5">
      <h1 className="text-lg font-bold mb-2 text-gray-800">
        Average cars today: <span className="text-blue-500">{avgCars}</span>
        </h1>
      <p className="text-lg font-bold mb-2 text-gray-800">
        Most cars at: <span className="text-blue-500">{maxCarsHours.join(", ")}</span>
        </p>
      <p className="text-lg font-bold mb-2 text-gray-800">
        Least cars at: <span className="text-blue-500">{minCarsHours.join(", ")}</span>
        </p>
    </div>
  </div>
</div>

  </div>

    </>
  );
}

export default CarsChart;
