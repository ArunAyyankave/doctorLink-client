import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';

function DocProfileEdit() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [facility, setFacility] = useState("");
  const [spec, setSpec] = useState("");
  const [qual, setQual] = useState("");
  const [exp, setExp] = useState("");
  const [fees, setFees] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const errors = {};

    // Validating name field
    if (!name.trim()) {
      errors.name = "Name is required";
    }

    // Validating email field
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    // Validating facility field
    if (!facility.trim()) {
      errors.facility = "Facility is required";
    }

    // Validating spec field
    if (!spec.trim()) {
      errors.spec = "Specialisation is required";
    }

    // Validating qual field
    if (!qual.trim()) {
      errors.qual = "Qualification is required";
    }

    // Validating exp field
    if (!exp.trim()) {
      errors.exp = "Experience is required";
    }

    // Validating fees field
    if (!fees.trim()) {
      errors.fees = "Fees is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(fees)) {
      errors.fees = "Fees is invalid";
    }

    // Validating place field
    if (!place.trim()) {
      errors.place = "Place is required";
    }

    // Validating image field
    if (!image) {
      errors.image = "Image is required";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    try {
      formData.append('file', image);
      formData.append('upload_preset', import.meta.env.VITE_uploadPreset);

      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloudname}/image/upload`, formData);
      const imageUrl = data.secure_url;

      const token = localStorage.getItem('doc')
      const response = await axios.post(
        `/doctor/completeprofile`,
        JSON.stringify({ name, email, facility, spec, qual, exp, fees, place, imageUrl }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          withCredentials: true,
        }
      );
      navigate("/doctor");
    }
    catch (error) {
      if (!error?.response) {
        setErr("no server response");
      } else {
        setErr("failed to update");
      }
    }
  }

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
        <div className='bg-gradient-to-r from-emerald-50 to-emerald-100 py-32 lg:px-1 xl:px-20 '>
          <div className='container'>
            <div className='w-full h-45 bg-white shadow-md rounded-md p-8 space-y-6 '>
              <div className='space-y-1'>
                <h1 className='font-semibold'> <span className='text-3xl font-roboto font-bold'>Edit Profile</span></h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2'>
                  <div>
                    <input type="text " className='input_Field' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                  </div>
                  <div>
                    <input type="text" className='input_Field' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                  </div>
                  <div>
                    <input type="text" className='input_Field' placeholder='Hospital/Clinic' value={facility} onChange={(e) => setFacility(e.target.value)} />
                    {errors.facility && <span className="text-red-500">{errors.facility}</span>}
                  </div>
                  <div>
                    <input type="text " className='input_Field' placeholder='Specialisation' value={spec} onChange={(e) => setSpec(e.target.value)} />
                    {errors.spec && <span className="text-red-500">{errors.spec}</span>}
                  </div>
                  <div>
                    <input type="text" className='input_Field' placeholder='Qualification' value={qual} onChange={(e) => setQual(e.target.value)} />
                    {errors.qual && <span className="text-red-500">{errors.qual}</span>}
                  </div>
                  <div>
                    <input type="text" className='input_Field' placeholder='Experience' value={exp} onChange={(e) => setExp(e.target.value)} />
                    {errors.exp && <span className="text-red-500">{errors.exp}</span>}
                  </div>
                  <div>
                    <input type="text" className='input_Field' placeholder='Fees' value={fees} onChange={(e) => setFees(e.target.value)} />
                    {errors.fees && <span className="text-red-500">{errors.fees}</span>}
                  </div>
                  <div>
                    <input type="text" className='input_Field' placeholder='Place' value={place} onChange={(e) => setPlace(e.target.value)} />
                    {errors.place && <span className="text-red-500">{errors.place}</span>}
                  </div>
                  <div>
                    <input type="file" className='input_Field p-2.5' placeholder='Image' onChange={(e) => setImage(e.target.files[0])} />
                    {errors.image && <span className="text-red-500">{errors.image}</span>}
                  </div>
                </div>
                <button type='submit' className='w-40  select-none p-1 rounded-full text-white  font-roboto  h-12 font-semibold bg-green-400 hover:bg-green-600'>Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocProfileEdit;