import { useEffect, useState } from "react";
import Container from "../../container/Container";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../../appwrite/config";
import PostForm from "./PostForm";

const EditPost = () => {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <div>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : null;
};

export default EditPost;
