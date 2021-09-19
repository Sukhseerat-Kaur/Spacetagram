export const fetchPosts = (date) => {
  return fetch(
    `https://api.nasa.gov/planetary/apod?api_key=KzfuoUrxMV1JRATqlA16k2n6dMzXMtqobNMfwc4h&start_date=${date.start}&end_date=${date.end}&thumbs=True`
  )
    .then((res) => res.json())
    .then((data) => data.map((post) => ({ ...post, liked: false })));
};
