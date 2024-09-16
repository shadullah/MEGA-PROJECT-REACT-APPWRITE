import { useEffect, useState } from "react";
import service from "../../../appwrite/config";
// import { Container } from "postcss";
import PostCard from "./PostCard";
import Container from "../../container/Container";

const Allposts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);

  service.getPosts([]).then((posts) => setPosts(posts));

  return (
    <div>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Allposts;
