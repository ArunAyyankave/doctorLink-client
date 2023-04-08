import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';

function DocDashboard() {

  const [slots, setSlots] = useState();
  const [info, setInfo] = useState();
  const [aps, setAps] = useState();

  useEffect(() => {
    const token = localStorage.getItem('doc');
    const getSlots = async () => {
      try {
        const { data } = await axios.get('doctor/dashboard', {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          withCredentials: true,
        });
        setSlots(data.timeSlots);
        setInfo(data.apDetails);
        setAps(data.appointments)
      } catch (error) {
        console.log(error.message);
      }
    }
    getSlots();
  }, [])

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">TOTAL PATIENTS</p>
            <p className='text-4xl text-gray-700 font-bold'>{info && info[0]?.uniqueUsers}</p>
          </div>
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">TOTAL APPOINTMENTS</p>
            <p className='text-4xl text-gray-700 font-bold'>{info && info[0]?.totalAppointments}</p>
          </div>
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">APPOINTMENTS BOOKED TODAY</p>
            <p className='text-4xl text-gray-700 font-bold'>{info && info[0]?.todayAppointments}</p>
          </div>
          <div className="flex flex-col p-2 items-center shadow-md justify-center space-y-2 h-auto rounded bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gray-800">
            <p className="text-sm font-roboto text-gray-500 dark:text-gray-500">REMAINING SLOTS</p>
            <p className='text-4xl text-gray-700 font-bold'>{slots && slots?.length}</p>
          </div>
        </div>
        <div className="flex-col sm:flex-row h-auto justify-center md:justify-start mb-4 rounded border bg-gray-50 dark:bg-gray-800">
          <div className='p-2'>
            <h1 className='text-md bg-gradient-to-r from-gray-100 to-gray-300 p-3 border'>REMAINING SLOTS</h1>
          </div>
          <div>
            <div className=' rounded-lg'>
              <div className='flex px-4 py-5  space-x-9 '>
                {slots && slots.map(slot => (
                  <div className='border rounded-md' key={slot._id}>
                    <div className='p-3'>
                      <h1 className='font-semibold text-xl text-green-500 '>{new Date(slot.start).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}-{new Date(slot.end).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</h1>
                    </div>
                    <div className='border p-2 flex justify-between items-center bg-[#F3F5F9] rounded-b-md'>
                      <h1 className='text-bold text-xl'>{new Date(slot.start).toLocaleDateString('en-US', { day: 'numeric' })}</h1>
                      <h1 className='pl-3 bg-green-400 px-2 rounded'>{new Date(slot.start).toLocaleString('en-US', { month: 'short' })}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 gap-4 mb-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <p className='my-2'>UPCOMING APPOINTMENTS</p>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    PATIENT NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MOBILE
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TIME
                  </th>
                </tr>
              </thead>
              <tbody>
                {aps && aps.map(ap => (
                  <tr className="border-b border-gray-200 dark:border-gray-700" key={ap._id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {ap.user.name}
                    </th>
                    <td className="px-6 py-4">
                      {ap.user.mobile}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {new Date(ap.timeSlotStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(ap.timeSlotStart).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}-{new Date(ap.timeSlotEnd).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocDashboard;