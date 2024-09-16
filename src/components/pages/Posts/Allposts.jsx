import { useEffect, useState } from "react";
import service from "../../../appwrite/config";
// import { Container } from "postcss";
import PostCard from "./PostCard";
import Container from "../../container/Container";

const Allposts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await service.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts?.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
                {/* <PostCard post={post} /> */}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Allposts;
