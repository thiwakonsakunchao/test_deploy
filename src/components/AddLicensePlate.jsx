import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

function AddLicensePlate({ isVisible, onClose, fetchData }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        license_number: '',
        province_id: ''
    });
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        axios.get("http://13.214.18.38:8000/api/province")
            .then((response) => {
                console.log("Provinces fetched:", response.data.users);
                setProvinces(response.data.users);
                
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    }, []);

    useEffect(() => {
        console.log("Provinces fetched:", provinces);
    }, [provinces]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('http://13.214.18.38:8000/api/addLicense', formData)
            .then((response) => {
                console.log(response.data.message);
                onClose();
                fetchData(); // Fetch data after adding to refresh the table
                // Reset form data
                setFormData({
                    first_name: '',
                    last_name: '',
                    license_number: '',
                    province_id: ''
                });
            })
            .catch((error) => {
                console.error("Error adding license plate:", error);
                if (error.response) {
                    console.error("Server responded with status:", error.response.status);
                    console.error("Error message from server:", error.response.data.message);
                } else {
                    console.error("Request failed:", error.message);
                }
            });
    };
    

    if (!isVisible) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-2xl mb-7 leading-6 font-bold text-gray-900" id="modal-title">
                                    Add License Plate
                                </h3>
                                <div className="mt-2">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="flex mb-4 space-x-4">
                                            <div className="w-1/2">
                                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                                <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                                <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">License Number</label>
                                            <input type="text" name="license_number" value={formData.license_number} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700">Province</label>
                                            <select name="province_id" value={formData.province_id} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                                                <option value="">Select a province</option>
                                                {provinces.map(province => (
                                                    <option key={province.id} value={province.id}>{province.province}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Add</button>
                                            <button type="button" onClick={onClose} className=" hover:bg-gray-700 hover:text-white hover:border-white text-gray-500 border-solid border-2 border-gray-500 py-2 px-4 rounded ml-2">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddLicensePlate.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired
};

export default AddLicensePlate;
