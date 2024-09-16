import { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import PostCard from "../Posts/PostCard";
import Container from "../../container/Container";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    service
      .getPosts()
      .then((posts) => {
        console.log(posts);
        if (posts && posts.documents) {
          setPosts(posts.documents);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading....
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          {authStatus ? (
            <p className="text-4xl my-32">Add post and get going</p>
          ) : (
            <>
              <div className="flex flex-wrap">
                <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                  </h1>
                </div>
              </div>
            </>
          )}
        </Container>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
