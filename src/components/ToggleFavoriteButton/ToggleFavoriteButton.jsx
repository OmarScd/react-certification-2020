import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useFavorites } from '../../providers/Favorites';

const Button = styled.button`
  text-transform: uppercase;
`;

const ToggleFavoriteButton = ({ id, thumbnail, title, description }) => {
  const { favorites, favoritesDispatch } = useFavorites();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.findIndex((favorite) => favorite.id === id) !== -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const handleOnClick = () => {
    if (isFavorite) {
      favoritesDispatch({
        type: 'REMOVE_FAVORITE',
        id,
      });
    } else {
      favoritesDispatch({
        type: 'ADD_FAVORITE',
        favorite: {
          id,
          thumbnail,
          title,
          description,
        },
      });
    }
  };

  return (
    <Button onClick={handleOnClick}>
      {isFavorite ? 'Remove from' : 'Add to'} favorites
    </Button>
  );
};

export default ToggleFavoriteButton;
