// TopTilePage.js
import React from 'react';
import { careerGeneralTileClient } from '../../clients/CareerGeneralTileClient';
import TileList from '../TileList/TileList/TileList';

const CareerGeneralTile = () => {
  return (
    <TileList client={careerGeneralTileClient} contentType="careerUpTiles" />
  );
};

export default CareerGeneralTile;
