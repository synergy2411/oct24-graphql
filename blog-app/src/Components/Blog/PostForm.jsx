import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";

const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      message
    }
  }
`;

function PostForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const [createPostMutation] = useMutation(CREATE_POST);

  const createHandler = (e) => {
    e.preventDefault();
    console.log(titleRef.current.value);
    createPostMutation({
      variables: {
        title: titleRef.current.value,
        body: bodyRef.current.value,
      },
    })
      .then(console.log)
      .catch(console.error);
  };
  return (
    <>
      <form>
        <h1>Create Your Post here</h1>
        {/* title */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder=""
            ref={titleRef}
          />
          <label htmlFor="title">Title:</label>
        </div>

        {/* body */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="body"
            id="body"
            placeholder=""
            ref={bodyRef}
          />
          <label htmlFor="body">Body:</label>
        </div>
        {/* buttons */}

        <button className="btn btn-primary" onClick={createHandler}>
          Create
        </button>
      </form>
    </>
  );
}

export default PostForm;
