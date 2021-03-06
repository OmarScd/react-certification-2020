import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useFavorites } from '../../providers/Favorites';
import { useAuth } from '../../providers/Auth';

const Button = styled.button`
  border: none;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: bold;
  text-transform: uppercase;

  background: ${(props) =>
    props.isFavorite ? props.theme.colors.warning : props.theme.colors.highlight};
`;

const ToggleFavoriteButton = ({ id, thumbnail, title, description }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { authenticated } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.findIndex((favorite) => favorite.id === id) !== -1);
  }, [favorites, id]);

  const handleOnClick = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        thumbnail,
        title,
        description,
      });
    }
  };

  return (
    <>
      {authenticated ? (
        <Button onClick={handleOnClick} isFavorite={isFavorite}>
          {isFavorite ? 'Remove from' : 'Add to'} favorites
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default ToggleFavoriteButton;
