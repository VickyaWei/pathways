export function appendHomePageDataToUrl(targetMentors, url) {
  const time = new Date().toISOString();
  const data = {
    targetMentors,
    time,
  };

  const urlObject = new URL(url);
  urlObject.searchParams.set("leftHomePage", JSON.stringify(data));

  return urlObject.toString();
}
