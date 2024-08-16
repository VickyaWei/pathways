import React, { useEffect, useState, useCallback } from 'react';
import Tile from '../Tile/Tile';
import "./TileList.css"

const TileList = ({ client, contentType, selected }) => {
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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filteredTiles = selected && selected.length > 0
    ? tiles.filter(tile => selected.some(subfield => tile.data.keyword && tile.data.keyword.includes(subfield)))
    : tiles;

  const shuffledTiles = shuffleArray([...filteredTiles]); // Create a shuffled copy of the filtered tiles

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tiles: {error.message}</p>;
  if (!shuffledTiles.length) return <p>No tiles available.</p>;

  return (
    <div className="tile-list">
      {shuffledTiles.map((tile) => (
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

export default TileList;
