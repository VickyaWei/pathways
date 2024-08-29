import * as contentful from 'contentful';

export const TalkToAnExpertClient = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN_TALK_TO_AN_EXPERT
});