import React, { useState } from "react";
import { followProfile, unFollowProfile } from "../../../shared/api/api";
import { Author } from "../../../shared/interfaces";
import { useNavigate } from "react-router-dom";
interface FollowBtnProps {
    username: string
    following: boolean
    isLogged: boolean
    setAuthor: (author: Author) => void
}
const FollowBtn = ({isLogged, username, following, setAuthor}: FollowBtnProps) => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if (isLogged && !following) {
        const res = await followProfile(username);
        setAuthor(res.profile)
      } else if (isLogged && following) {
        const res = await unFollowProfile(username);
        setAuthor(res.profile)
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
    <>
      <button disabled={isLoading} onClick={handleFollow} className="btn btn-sm btn-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; {following ? 'Unfollow': 'Follow'} {username}
      </button>
      &nbsp;&nbsp;
    </>
  );
};

export default FollowBtn;
