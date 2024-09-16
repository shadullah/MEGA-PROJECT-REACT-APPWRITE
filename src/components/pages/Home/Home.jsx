import { useEffect, useState } from "react";
import service from "../../../appwrite/config";
import PostCard from "../Posts/PostCard";
import Container from "../../container/Container";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading]= useState(true)

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
      .finally(()=>{
        setLoading(false)
      })

  }, []);

  if(loading){
    return <div>Loading....</div>
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
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
