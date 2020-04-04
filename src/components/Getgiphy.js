import React, { useState, useEffect } from 'react';

import utilities from '../config';

function Getgiphy(props) {
  const { keywords } = props;
  const [imgLink, setImgLink] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${utilities.apiKeys.giphy}&s=${keywords}`
    )
      .then((res) => res.json())
      .then((res) => setImgLink(res.data.images.original.url))
      .catch((err) => setError(err));
  }, []);

  if (error) return <p>Error!</p>;
  if (!imgLink) return <p>Loading...</p>;
  return <img src={imgLink} alt="weathertype" />;
}

export default Getgiphy;
