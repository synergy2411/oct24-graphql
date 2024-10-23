import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

describe("GraphQL Server API Testing", () => {
  let client = null;

  beforeEach(() => {
    client = new ApolloClient({
      uri: "http://localhost:4000/graphql",
      cache: new InMemoryCache(),
    });
  });

  afterEach(() => {
    client = null;
  });

  test("should fetch all posts from Graphql Server", async () => {
    const FETCH_POSTS = gql`
      query fetchPosts {
        posts {
          id
          title
          body
          published
        }
      }
    `;

    const { data } = await client.query({
      query: FETCH_POSTS,
    });

    expect(data).not.toBeUndefined();
    expect(data.posts.length).not.toEqual(0);
  });

  test("should provide token on valid credentials", async () => {
    const USER_SIGN_IN = gql`
      mutation signIn($email: String!, $password: String!) {
        signIn(data: { email: $email, password: $password }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: USER_SIGN_IN,
      variables: {
        email: "ross@test",
        password: "ross123",
      },
    });

    expect(data).not.toBeUndefined();
    expect(data.signIn.token).not.toBeUndefined();
  });

  test("should pass the test", () => {
    expect(true).toBeTruthy();
  });
});
