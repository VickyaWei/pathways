import React, { useEffect, useState, useCallback } from "react";
import { ResourceTileClient } from "../../clients/ResourceTileClient";
import Tile from "../Tile/Tile";

const ResourceTile = ({ tagFilter, selectedSubfield, isSidebarOpen }) => {
  const [resourceTiles, setResourceTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cleanUpTiles = useCallback((rawData) => {
    const cleanTiles = rawData.map((tile) => {
      const { sys, fields } = tile;
      const { id } = sys || {};
      const title = fields?.title || "No title";
      const description = fields?.description || "No description";
      const thumbnail = fields?.thumbnail?.fields?.file?.url || "";
      const url = fields?.url || "#";
      const data = fields?.data || {};

      return { id, title, description, thumbnail, url, data };
    });
    setResourceTiles(cleanTiles);
  }, []);

  useEffect(() => {
    const fetchResourceTiles = async () => {
      try {
        const response = await ResourceTileClient.getEntries({
          content_type: "resourceTile",
          "fields.tags[in]": tagFilter,
        });

        if (response.items && Array.isArray(response.items)) {
          cleanUpTiles(response.items);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching resource tiles:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResourceTiles();
  }, [cleanUpTiles, tagFilter]);

  const filteredTiles = Array.isArray(selectedSubfield) && selectedSubfield.length > 0
    ? resourceTiles.filter(tile =>
        tile.data.keyword &&
        tile.data.keyword.some(keyword => selectedSubfield.includes(keyword))
      )
    : resourceTiles;

  if (loading) return <p>Loading Resource Tiles...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="resource-tiles-grid">
      {filteredTiles.map((tile) => (
        <div key={tile.id}>
          <Tile
            id={tile.id}
            title={tile.title}
            description={tile.description}
            thumbnail={tile.thumbnail}
            url={tile.url}
            data={tile.data}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      ))}
    </div>
  );
  
};

export default ResourceTile;