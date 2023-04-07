import React from 'react';
import SideAndNav from '../../components/admin/SideAndNav';
import AppointmentsList from '../../components/admin/AppointmentsList';

function Appointments() {
  return (
    <div>
      <SideAndNav />
      <AppointmentsList />
    </div>
  )
}

export default Appointments;