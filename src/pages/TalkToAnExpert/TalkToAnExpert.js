
import React from 'react';
import ThreeTileList from '../../components/TileList/TileList/ThreeTileList';
import { TalkToAnExpertClient } from '../../clients/TalkToAnExpertClient';

const TalkToAnExpert = () => {
  return (
    <ThreeTileList client={TalkToAnExpertClient} contentType="talkToAnExpert" />
  );
};

export default TalkToAnExpert;
