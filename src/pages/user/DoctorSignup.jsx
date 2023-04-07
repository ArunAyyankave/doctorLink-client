import React from 'react';
import UserFooter from '../../components/user/UserFooter';
import DocSignup from '../../components/user/doctorSignup/DoctorSignup';

function DoctorSignup() {
  return (
    <div>
      <DocSignup />
      <UserFooter />
    </div>
  )
}

export default DoctorSignup;
