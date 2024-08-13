import * as contentful from 'contentful';

export const researchDownTileClient = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN_RESEARCH_DOWNTILE
});
