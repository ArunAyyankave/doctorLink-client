import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import DataTable from 'react-data-table-component';

function AppointmentList() {

    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState("");

    const getAppointments = async () => {
        const token = localStorage.getItem('admin');
        try {
            const { data } = await axios.get('/admin/getAps', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                withCredentials: true,
            });
            setAppointments(data);
            setFiltered(data);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            name: "Doctor",
            selector: (row) => row.doctor.name,
            sortable: true,
        },
        {
            name: "Mobile (doctor)",
            selector: (row) => row.doctor.mobile,
            sortable: true,
        },
        {
            name: "Patient",
            selector: (row) => row.user.name,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => new Date(row.timeSlotStart).toLocaleDateString([], { month: 'short', day: '2-digit' }),
            sortable: true,
            sortFunction: (a, b) => {
                const dateA = new Date(a.timeSlotStart);
                const dateB = new Date(b.timeSlotStart);
                return dateA.getTime() - dateB.getTime();
            },
        },
        {
            name: "Time Slot",
            selector: (row) => {
                const timeSlotStart = new Date(row.timeSlotStart).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
                const timeSlotEnd = new Date(row.timeSlotEnd).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
                return `${timeSlotStart} - ${timeSlotEnd}`;
            },
            sortable: true,
            sortFunction: (a, b) => {
                const timeSlotStartA = new Date(a.timeSlotStart);
                const timeSlotStartB = new Date(b.timeSlotStart);
                return timeSlotStartA.getTime() - timeSlotStartB.getTime();
            },
        },
    ];

    useEffect(() => {
        getAppointments();
    }, []);

    useEffect(() => {
        const result = appointments.filter((appointment) => {
            return appointment.doctor.name.toLowerCase().match(search.toLowerCase());
        });
        setFiltered(result);
    }, [search]);

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: 'gray',
            },
        },
        headCells: {
            style: {
                color: 'white',
                fontSize: '16px',
            },
        },
        rows: {
            style: {
                backgroundColor: 'gray',
                color: 'white',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
                color: 'black',
            },
        },
        pagination: {
            style: {
                backgroundColor: 'gray',
                color: 'white',
            },
        },
        tableWrapper: {
            style: {
                paddingBottom: '20px', // Adds some padding at the bottom of the table
            },
        },
        searchBox: {
            style: {
                color: 'white',
                backgroundColor: 'gray',
            },
        },
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
                <DataTable
                    title="Appointments"
                    columns={columns}
                    data={filtered}
                    pagination
                    fixedHeader
                    highlightOnHover
                    subHeader
                    subHeaderComponent={<input
                        type="text"
                        placeholder=" Search"
                        className='border-2 rounded'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />}
                    customStyles={customStyles}
                />
            </div>
        </div>
    )
}

export default AppointmentList;