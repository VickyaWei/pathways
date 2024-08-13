import React from 'react';
import { careerAdditionalTileClient } from '../../clients/CareerAdditionalTileClient';
import TileList from '../TileList/TileList/TileList';

const CareerAdditionalTile = ({ selectedSubfield }) => {
  return (
    <TileList client={careerAdditionalTileClient} contentType="careerDownTiles" selectedSubfield={selectedSubfield} />
  );
};

export default CareerAdditionalTile;
