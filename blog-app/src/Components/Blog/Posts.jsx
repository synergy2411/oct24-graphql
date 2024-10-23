import { gql, useQuery } from "@apollo/client";

const FETCH_POSTS = gql`
  query fetchPosts {
    posts {
      id
      title
      body
      published
      author {
        name
        age
        email
      }
    }
  }
`;

function Posts() {
  const { data, error, loading } = useQuery(FETCH_POSTS);

  console.log(data, error, loading);

  return (
    <div className="container">
      <h1 className="text-center">All Posts</h1>
      <div className="row">
        {data &&
          data.posts.map((post) => (
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="text-center">{post.title.toUpperCase()}</h5>
                  <blockquote>
                    {post.body}{" "}
                    <cite className="float-end">
                      -{post.author.name.toUpperCase()}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Posts;
