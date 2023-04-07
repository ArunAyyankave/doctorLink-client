import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

function Dashboard() {

  const [info, setInfo] = useState();
  const [docs, setDocs] = useState([]);

  const token = localStorage.getItem('admin');
  useEffect(() => {
    axios.get('/admin/dashboard', {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      withCredentials: true,
    }).then(({ data }) => {
      setInfo(data)
      setDocs(data.docsPending)
    })
  }, []);

  const data = {
    labels: ['Patients', "Doctors", "Appointments"],
    datasets: [
      {
        data: [info && info.totalUsers, info && info.totalDoctors, info && info.totalBookings],
        backgroundColor: ['#05445E', '#189AB4', '#75E6DA', "#D4F1F4"]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-4 sm:ml-64 bg-[#05445E] h-screen">
      <div className="p-4 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-4">
          <div className="flex items-center justify-between px-6 py-4 rounded bg-[#189AB4] dark:bg-gray-800">
            <div>
              <p className="text-[#D4F1F4] text-sm sm:text-base">Total Users</p>
              <p className="font-bold text-[#D4F1F4] text-lg sm:text-xl">{info && info.totalUsers}</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4 rounded bg-[#189AB4] dark:bg-gray-800">
            <div>
              <p className="text-[#D4F1F4] text-sm sm:text-base">Total Doctors</p>
              <p className="font-bold text-[#D4F1F4] text-lg sm:text-xl">{info && info.totalDoctors}</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4 rounded bg-[#189AB4] dark:bg-gray-800">
            <div>
              <p className="text-[#D4F1F4] text-sm sm:text-base">Total Bookings</p>
              <p className="font-bold text-[#D4F1F4] text-lg sm:text-xl">{info && info.totalBookings}</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4 rounded bg-[#189AB4] dark:bg-gray-800">
            <div>
              <p className="text-[#D4F1F4] text-sm sm:text-base">Bookings Today</p>
              <p className="font-bold text-[#D4F1F4] text-lg sm:text-xl">{info && info.bookingsToday}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-4 mb-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <p className="text-lg m-1 capitalize text-[#D4F1F4]">New Doctor Requests</p>
            <table className="w-full text-left text-[#D4F1F4] dark:text-blue-100">
              <thead className="text-xs text-[#D4F1F4] uppercase bg-[#05445E] dark:text-white">
                <tr className="border border-[#189AB4]">
                  <th scope="col" className="px-6 py-3">
                    Doctor Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Specialisation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Place
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs.length ? docs.map(doc =>
                  <tr className="bg-[#189AB4] border-b border-[#05445E]">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-[#D4F1F4] whitespace-nowrap dark:text-[#D4F1F4]"
                    >
                      {doc.name}
                    </th>
                    <td className="px-6 py-4">{doc.mobile}</td>
                    <td className="px-6 py-4">{doc.specialisation}</td>
                    <td className="px-6 py-4">{doc.place}</td>
                  </tr>
                ) : <tr className="p-4"><td>No Pending requests</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center rounded dark:bg-gray-800">
            <div className="p-2 w-full">
              <Pie
                data={data}
                options={options}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
