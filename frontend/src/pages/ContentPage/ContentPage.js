import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content/Content";
import { ContentPageClient } from "../../clients/ContentPageClient";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./ContentPage.css";

export const ContentPage = () => {
  const [contentData, setContentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  const cleanUpContents = useCallback((rawData) => {
    return rawData.map((content) => {
      const { sys, fields } = content;
      return {
        id: sys?.id || "",
        title: fields?.title || "No title",
        displayName: fields?.displayName || null,
        description: fields?.description || "No description",
        images: fields?.images || [],
        tags: fields?.tags || [],
        data: fields?.data || {},
      };
    });
  }, []);

  const sortContentByTags = useCallback((content) => {
    const orderTags = ["1", "2", "3", "4"];
    return content.sort((a, b) => {
      const aIndex = orderTags.findIndex((tag) => a.tags.includes(tag));
      const bIndex = orderTags.findIndex((tag) => b.tags.includes(tag));
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await ContentPageClient.getEntries({
          content_type: "contentPage",
        });
        const cleanedData = cleanUpContents(response.items);
        const sortedData = sortContentByTags(cleanedData);
        setContentData(sortedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to fetch content. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [cleanUpContents, sortContentByTags]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev < contentData.length - 1 ? prev + 1 : prev
    );
  };

  const handleLetsGo = () => {
    navigate('/mentorpal');
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  console.log("Current slide:", currentSlide);
  console.log("Content data length:", contentData.length);

  return (
    <div className="content-page">
      {contentData.length > 0 ? (
        <div className="carousel">
          {currentSlide > 0 && (
            <BsArrowLeftCircleFill
              onClick={handlePrevSlide}
              className="arrow arrow-left"
              aria-label="Previous Slide"
            />
          )}
          <div className="slides-container">
            {contentData.map((content, index) => (
              <div
                key={content.id}
                className={
                  index === currentSlide ? "slide" : "slide hidden-slide"
                }
              >
                <Content
                  title={content.title}
                  displayName={content.displayName}
                  description={content.description}
                  images={content.images}
                />
              </div>
            ))}
          </div>
          {currentSlide < contentData.length - 1 ? (
            <BsArrowRightCircleFill
              onClick={handleNextSlide}
              className="arrow arrow-right"
              aria-label="Next Slide"
            />
          ) : (
            <button
              onClick={handleLetsGo}
              className="lets-go-button"
              aria-label="Let's Go"
            >
              Let's go
            </button>
          )}
          {/* <span className="content-indicators">
            {contentData.map((_, idx) => (
              <button
                key={idx}
                className={
                  currentSlide === idx
                    ? "content-indicator"
                    : "content-indicator indicator-inactive"
                }
                onClick={() => setCurrentSlide(idx)}
              ></button>
            ))}
          </span> */}
        </div>
      ) : (
        <button
          onClick={handleLetsGo}
          className="lets-go-button"
          aria-label="Let's Go"
        >
          Let's go
        </button>
      )}
    </div>
  );
};

export default ContentPage;