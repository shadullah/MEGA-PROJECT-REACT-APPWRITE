import Container from "../../container/Container";
import PostForm from "./PostForm";

const AddPost = () => {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPost;
