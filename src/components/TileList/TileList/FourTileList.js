import React, { useEffect, useState, useCallback } from 'react';
import Tile from '../Tile/Tile';
import "./FourTileList.css"

const FourTileList = ({ client, contentType, selected }) => {
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
      const data = fields.data || {}; 

      return { id, tileTitle, tileDescription, tileImage, imageUrl, data };
    });
    setTiles(cleanTiles);
  }, []);

  const fetchTiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await client.getEntries({ content_type: contentType });
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
  }, [cleanUpTiles, client, contentType]);

  useEffect(() => {
    fetchTiles();
  }, [fetchTiles]);

  const filteredTiles = selected
    ? tiles.filter(tile => tile.data.keyword && tile.data.keyword.includes(selected))
    : tiles;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tiles: {error.message}</p>;
  if (!filteredTiles.length) return <p>No tiles available.</p>;

  return (
    <div className="four-tile-list">
      {filteredTiles.map((tile) => (
        <Tile
          key={tile.id}
          id={tile.id}
          title={tile.tileTitle}
          description={tile.tileDescription}
          image={tile.tileImage}
          url={tile.imageUrl}
          data={tile.data}
        />
      ))}
    </div>
  );
};

export default FourTileList;
