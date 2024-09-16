import { Link } from "react-router-dom";
import service from "../../../appwrite/config";
import { useEffect, useState } from "react";

const PostCard = ({ $id, title, image }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      const fileUrl = await service.getFile(image);
      setImageUrl(fileUrl);
    };
    fetchImg();
  }, [image]);
  {
    console.log(service.getFile(image));
  }
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-200 rounded-xl p-4">
          <div className="w-full justify-center mb-4">
            <img src={imageUrl} alt={title} className="rounded-xl" />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
