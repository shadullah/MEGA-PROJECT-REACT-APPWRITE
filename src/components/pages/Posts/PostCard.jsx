import { Link } from "react-router-dom";
import service from "../../../appwrite/config";

const PostCard = ({ $id, title, image }) => {
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-200 rounded-xl p-4">
          <div className="w-full justify-center mb-4">
            <img
              src={service.getFile(image)}
              alt={title}
              className="rounded-xl"
            />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
