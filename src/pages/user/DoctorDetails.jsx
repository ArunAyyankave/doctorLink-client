import React from 'react';
import UserNavbar from '../../components/user/UserNavbar';
import DocDetails from '../../components/user/DocDetails';
import BookingSection from '../../components/user/BookingSection';
import UserFooter from '../../components/user/UserFooter';

function DoctorDetails() {
  return (
    <div>
      <UserNavbar />
      <DocDetails />
      <BookingSection />
      <UserFooter />
    </div>
  )
}

export default DoctorDetails;
