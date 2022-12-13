import React from 'react';
import { NextPage } from 'next';
// import withAuth from '../../routes/withAuth';
// import Roles from '../../utility/roles';

const Manufacturer: NextPage = () => {
  console.log('here');
  return <h1>Manufacturer</h1>;
};

// export default withAuth(Manufacturer)(Roles.manufacturer);
export default Manufacturer;
