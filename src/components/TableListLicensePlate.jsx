import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import AddLicensePlate from './AddLicensePlate';
import PropTypes from 'prop-types';

const handleButtonClick = (id, fetchData) => {
    console.log('Deleting license plate with ID:', id);
    axios.delete(`http://13.214.18.38:8000/api/deleteLicense/${id}`)
        .then((response) => {
            console.log(response.data.message);
            fetchData(); // Fetch data after deleting to refresh the table
        })
        .catch((error) => {
            console.error("Error deleting license plate:", error);
            if (error.response) {
                console.error("Server responded with status:", error.response.status);
                console.error("Error message from server:", error.response.data.message);
            } else {
                console.error("Request failed:", error.message);
            }
        });
};

const downloadCSV = (data) => {
    const csv = data.map(row => ({
        firstName: row.first_name,
        lastName: row.last_name,
        licenseNumber: row.license_number,
        province: row.province
    }));

    const csvContent = [
        ['FirstName', 'LastName', 'LicenseNumber', 'Province'],
        ...csv.map(row => [row.firstName, row.lastName, row.licenseNumber, row.province])
    ]
    .map(e => e.join(","))
    .join("\n");

    // Add BOM to support UTF-8
    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "license_plates.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const Export = ({ onExport }) => (
    <button onClick={onExport} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
        Export CSV
    </button>
);

Export.propTypes = {
    onExport: PropTypes.func.isRequired
};

function TableListLicensePlate() {
    const [data, setData] = useState([]);
    const [recordData, setRecordData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [isAnyRowSelected, setIsAnyRowSelected] = useState(false);

    const fetchData = () => {
        axios.get("http://13.214.18.38:8000/api/licensePlates")
            .then((response) => {
                const result = response.data;
                setData(result);
                setRecordData(result);
                console.log(result);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilter = (e) => {
        const filterData = recordData.filter(row =>
            row.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.license_number.toLowerCase().includes(e.target.value.toLowerCase()) ||
            row.province.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setData(filterData);
    };

    const handleChange = ({ selectedRows }) => {
        setSelectedRows(selectedRows);
        setIsAnyRowSelected(selectedRows.length > 0);
    };

    const deleteAll = () => {
        if (window.confirm(`Are you sure you want to delete selected items?`)) {
            const deleteRequests = selectedRows.map(row =>
                axios.delete(`http://13.214.18.38:8000/api/deleteLicense/${row.id}`)
            );

            Promise.all(deleteRequests)
                .then(() => {
                    setToggleCleared(!toggleCleared);
                    fetchData(); // Refetch data to update table
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error deleting selected license plates:", error);
                });
        }
    };

    const columns = [
        {
            name: 'FirstName',
            selector: row => row.first_name,
            sortable: true,
        },
        {
            name: 'LastName',
            selector: row => row.last_name,
            sortable: true,
        },
        {
            name: 'License plate number',
            selector: row => row.license_number,
            sortable: true,
        },
        {
            name: 'Province of license plate',
            selector: row => row.province,
            sortable: true,
        },
        {
            cell: (row) => (
                !isAnyRowSelected && (
                    <button
                        onClick={() => handleButtonClick(row.id, fetchData)}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                )
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const actions = (
        <div className="flex items-center space-x-2 ">
            <Export onExport={() => downloadCSV(data)} />
            <input
                type="text"
                onChange={handleFilter}
                placeholder="Search..."
                className="border-2 border-blue-500 rounded-md p-2 text-sm"
            />
            <button onClick={() => setShowModal(true)} className="mr-5">
                <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            </button>
        </div>
    );

    const contextActions = (
        <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded text-sm" onClick={deleteAll}>Delete Selected</button>
    );

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                backgroundColor: "#98FB98 ",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
            },
        },
        cells: {
            style: {
                fontSize: "14px",
                color: "#333",
                textAlign: "center",
                borderRight: "none", // นำออกเส้นขอบทางขวาของเซลล์สุดท้าย
            },
        },
    };
    
    return (
        <>
            <div className="mb-5 mt-5"></div>
            <div className="ml-5 mr-5 mt-2 drop-shadow-xl">
                <div className="flex justify-end mb-5">
                    {actions}
                </div>
                <DataTable
                    title="License Plates"
                    columns={columns}
                    data={data}
                    pagination
                    contextActions={contextActions}
                    onSelectedRowsChange={handleChange}
                    clearSelectedRows={toggleCleared}
                    selectableRows
                    customStyles={customStyles}
                />
            </div>
            <AddLicensePlate
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                fetchData={fetchData}
            />
        </>
    );
}

export default TableListLicensePlate;
export { Export };
