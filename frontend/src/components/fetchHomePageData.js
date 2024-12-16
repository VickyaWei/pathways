
import axios from "axios";

const homePageDataQuery = `
query HomePageData($orgId: String) {
        homePageData(orgId: $orgId) {
          mentors {
            _id
            name
            title
            keywords
            transcript
            mentorUrl
            thumbnail
          }
          panels {
            _id
            org
            subject
            mentors
            title
            subtitle
          }
        }
      }
`;


export async function fetchHomePageData(
  orgId = "",
  graphlEndpoint = process.env.REACT_APP_DEV_GRAPHQL_ENDPOINT
) {
  if (!graphlEndpoint) {
    throw new Error("GraphQL endpoint is not defined.");
  }
  const gqlRes = await axios.post(graphlEndpoint, {
    query: homePageDataQuery,
    variables: {
      orgId: orgId,
    },
  });

  if (gqlRes.status !== 200) {
    throw new Error(`HomePageData load failed: ${gqlRes.statusText}}`);
  }
  if (gqlRes.data.errors) {
    throw new Error(
      `errors reponse to homePageData query: ${JSON.stringify(
        gqlRes.data.errors
      )}`
    );
  }
  if (!gqlRes.data.data) {
    throw new Error(
      `no data in non-error reponse: ${JSON.stringify(gqlRes.data)}`
    );
  }
  return gqlRes.data.data.homePageData;
}
