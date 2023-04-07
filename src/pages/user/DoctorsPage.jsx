import React, { useState } from 'react';
import UserNavbar from '../../components/user/UserNavbar';
import AllDocotors from '../../components/user/AllDoctors';
import UserFooter from '../../components/user/UserFooter';

function DoctorsPage() {
  const [results, setResults] = useState([]);

  const handleSearchData = (data) => {
    setResults(data);
  }

  return (
    <div>
      <UserNavbar onSearchData={handleSearchData} />
      <AllDocotors results={results} onSearchData={handleSearchData} />
      <UserFooter />
    </div>
  )
}

export default DoctorsPage;
