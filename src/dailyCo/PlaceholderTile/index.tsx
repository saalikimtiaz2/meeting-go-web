import React from 'react';
import { FaUserLarge } from 'react-icons/fa6';

function PlaceholderTile({ isSpotlightTile = false }: { isSpotlightTile?: boolean }) {
  return (
    <div
      className={`${
        isSpotlightTile ? 'spotlight-tile' : 'small-tile'
      } rounded-2xl flex justify-center items-end text-gray-500`}
    >
      <FaUserLarge size="80%" />
    </div>
  );
}

export default PlaceholderTile;
