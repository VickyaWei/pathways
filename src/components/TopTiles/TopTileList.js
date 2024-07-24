import React, { useEffect, useState, useCallback } from 'react';
import { topTileClient } from '../../clients/TopTileClient';
import TopTiles from './TopTiles';
import './TopTileList.css';

const TopTileList = () => {
  const [tiles, setTiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const cleanUpTiles = useCallback((rawData) => {
    const cleanTiles = rawData.map((tile) => {
        const { sys, fields } = tile;
        const { id } = sys;
        const tileTitle = fields.title;
        const tileDescription = fields.description;
        const tileImage = fields.image.fields.file.url;
        const imageUrl = fields.url;
        return { id, tileTitle, tileDescription, tileImage, imageUrl };
    });
    setTiles(cleanTiles);
  }, []);

  const fetchTiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await topTileClient.getEntries({ content_type: 'pathways' });
      const responseData = response.items;
      if (responseData) {
        cleanUpTiles(responseData);
      } else {
        setTiles([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [cleanUpTiles]);

  useEffect(() => {
    fetchTiles();
  }, [fetchTiles]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tiles: {error.message}</p>;
  if (!tiles.length) return <p>No tiles available.</p>;

  return (
    <div className="tile-list">
      {tiles.map((tile) => (
        <TopTiles
          key={tile.id}
          title={tile.tileTitle}
          description={tile.tileDescription}
          image={tile.tileImage}
          url={tile.imageUrl}
        />
      ))}
    </div>
  );
};

export default TopTileList;
