export const fetchPosts = async (date) => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=KzfuoUrxMV1JRATqlA16k2n6dMzXMtqobNMfwc4h&start_date=${date.start}&end_date=${date.end}&thumbs=True`
  );
  const data = await response.json();
  return data.map((post) => ({ ...post, liked: false }));
};
