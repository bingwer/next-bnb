import React from 'react';
import { useSelector } from '../../store';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

function RegisterRoomBedList() {
  const bedList = useSelector(state => state.registerRoom.bedList);

  return (
    <ul className="register-room-bed-type-list-wrapper">
      {bedList.map(bedroom => (
        <RegisterRoomBedTypes key={bedroom.id} bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
}

export default RegisterRoomBedList;
