// TopTilePage.js
import React from 'react';
import { researchTopTileClient } from '../../clients/ResearchTopTileClient';
import TileList from '../TileList/TileList/TileList';
import ThreeTileList from '../TileList/TileList/ThreeTileList';

const ResearchTopTile = () => {
  return (
    <ThreeTileList client={researchTopTileClient} contentType="researchUpTiles" />
  );
};

export default ResearchTopTile;
