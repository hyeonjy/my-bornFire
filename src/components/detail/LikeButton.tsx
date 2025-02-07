'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';
import { addLike, removeLike } from '@/utils/likes/actions'; // 서버 액션 import

type LikeButtonProps = {
  userId: string; // 사용자 ID
  placeImgUrl: string; // 장소 이미지
  placeName: string; // 장소 이름
  addressName: string; // 주소
  phoneNumber: string; // 전화번호
  locationX?: number; // 위치 X 좌표
  locationY?: number; // 위치 Y 좌표
  initialLikes: number;
  initialLiked: boolean; // 초기 좋아요 상태
};

const LikeButton = ({
  userId,
  placeImgUrl,
  placeName,
  addressName,
  phoneNumber,
  locationX,
  locationY,
  initialLikes,
  initialLiked,
}: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = async () => {
    const updatedLikes = liked ? likes - 1 : likes + 1;
    setLiked(!liked);
    setLikes(updatedLikes);

    try {
      if (liked) {
        // 좋아요 취소
        await removeLike(userId, placeName);
      } else {
        // 좋아요 추가
        await addLike({
          user_id: userId,
          place_image: placeImgUrl,
          place_name: placeName,
          address_name: addressName,
          phone_number: phoneNumber,
          location_x: locationX!,
          location_y: locationY!,
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setLiked(!liked); // 에러 발생 시 상태 복구
      setLikes(likes); // 에러 발생 시 카운트 복구
    }
  };

  return (
    <button onClick={toggleLike} className="flex flex-col items-center">
      <Heart
        className={`transition-colors ${
          liked ? 'fill-red-500 text-red-500' : 'fill-none text-gray-500'
        }`}
      />
      <p>{likes}</p>
    </button>
  );
};

export default LikeButton;
