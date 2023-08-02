import React, { useState } from "react";
import { favoriteArticle, unFavoriteArticle } from "../../../shared/api/api";
import { useNavigate } from "react-router-dom";
import { IArticle } from "../../../shared/interfaces";
interface FollowBtnProps {
    isFavorited: boolean
    favoritesCount: number
    isLogged: boolean
    slug: string
    setArticle: (article: IArticle) => void
}
const FavoriteBtn = ({isFavorited, favoritesCount, isLogged, slug, setArticle}: FollowBtnProps) => {
    const navigateTo = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true)
          if (isLogged && !isFavorited) {
            const res = await favoriteArticle(slug);
            setArticle(res.article);
          } else if (isLogged && isFavorited) {
            const res = await unFavoriteArticle(slug);
            setArticle(res.article);
          } else {
            navigateTo("/login");
          }
          setIsLoading(false)

        } catch (err) {
          console.log(err)
          setIsLoading(false)
        }
      };
    
  return (
    <button disabled={isLoading} onClick={handleFavorite} className={`btn btn-sm ${!isFavorited ? 'btn-outline-primary' : 'btn-primary'}`}>
      <i className="ion-heart"></i>
      &nbsp; {isFavorited ? 'Unfavorite Post' : "Favorite Post"} (
      <span className="counter">{favoritesCount}</span>)
    </button>
  );
};

export default FavoriteBtn;
