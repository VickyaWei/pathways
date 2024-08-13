// DownTilePage.js
import React from 'react';
import { researchDownTileClient } from '../../clients/ResearchDownTileClient';
import TileList from '../TileList/TileList/TileList';
import ThreeTileList from '../TileList/TileList/ThreeTileList';

const ResearchDownTile = () => {
  return (
    <ThreeTileList client={researchDownTileClient} contentType="researchDownTiles" />
  );
};

export default ResearchDownTile;
