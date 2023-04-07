import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios";
import banner from "../../assets/banner.png";

function AllDocotors(props) {

  const [doc, setDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/getDoctors').then(({ data }) => {
      setDocs(data.docDatas);
      props.onSearchData(data.docDatas);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto pt-28">
        <div className="w-full h-96 bg-red-400 bg-cover bg-no-repeat rounded-xl" style={{ backgroundImage: `url(${banner})` }}>
          <h1 className="mx-4 pt-24 pb-3 font-serif text-4xl">Book an appointment for an in-clinic</h1>
          <span className="mx-4 font-serif text-4xl">consultation</span>
          <span className="mx-4 mt-5 font-serif text-xl flex justify-start">Find experienced doctors across all specialties</span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 place-items-center 2xl:grid-cols-4 py-24 ">

          {props.results.length ? props.results.map((d, index) => (
            <div className="w-full p-4 lg:w-72 2xl:w-80 rounded-lg shadow-xl mt-20 scale-100 hover:scale-105 ease-in duration-200 bg-white" onClick={() => navigate(`/doctorDetails/${d._id}`)} key={index}>
              <div className="wrapper antialiased -mt-16">
                <img
                  src={d.imageUrl}
                  alt=""
                  className="h-44 w-full object-cover rounded-lg shadow-md "
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="bg-teal-200 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                  {d.specialisation}
                </span>
              </div>
              <h4 className="mt-1 text-md md:text-xl font-semibold uppercase leading-tight truncate">
                {d.name}
              </h4>
              <div className="sm:mt-1">{d.place}</div>
              <div className=" sm:mt-0 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="mt-3 hidden sm:block text-[#4f4c4a]">{d.facility}</p>
                  <div className="flex items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2L2 7v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7l-10-5zm5 15h-2v-2h2v2zm0-4h-2v-5h2v5zm-4 4h-2v-3h2v3zm0-4h-2v-5h2v5zm-4 4H7v-3h2v3zm0-4H7v-5h2v5z" />
                    </svg>
                  </div>
                </div>
                <div className="-mt-2 sm:-mt-0 flex flex-row sm:flex-col items-end ">
                  <h2 className="font-semibold sm:font-bold mt-3 text-start sm:text-end">
                    ₹{d.fees}
                  </h2>
                  <p className="text-[#4f4c4a] ml-1">/appoinment</p>
                </div>
              </div>
            </div>
          )) : <h1>No doctors available...</h1>}

        </div>
      </div>
    </div>
  );
}

export default AllDocotors;
