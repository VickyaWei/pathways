import React, { useEffect, useState, useCallback } from "react";
import Tile from "../Tile/Tile";
import "./CareerTileList.css";

export const CareerTileList = ({
  client,
  contentType,
  selectedSubfield = [], 
}) => {
  const [tiles, setTiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cleanUpTiles = useCallback((rawData) => {
    const cleanTiles = rawData.map((tile) => {
      const { sys, fields } = tile;
      const { id } = sys;
      const tileTitle = fields.title;
      const tileDescription = fields.description;
      const tileImage = fields.image?.fields?.file?.url; 
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

  const filteredTiles = tiles.filter((tile) => {
    // Ensure tile.data.keyword is an array
    const keywords = tile.data.keyword || [];
    const keywordMatchesSubfield = 
      selectedSubfield.length === 0 || 
      selectedSubfield.some(subfield => keywords.includes(subfield));

    return keywordMatchesSubfield;
  });

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledTiles = shuffleArray([...filteredTiles]); // Shuffle the filtered tiles

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tiles: {error.message}</p>;
  if (!shuffledTiles.length) return <p>No tiles available.</p>;

  return (
    <div className="additional-tile-list">
      {shuffledTiles.map((tile) => (
        <Tile
          key={tile.id}
          id={tile.id}
          title={tile.tileTitle}
          description={tile.tileDescription}
          image={tile.tileImage}
          url={tile.imageUrl}
          data={tile.data}
          category="resources"
        />
      ))}
    </div>
  );
};
