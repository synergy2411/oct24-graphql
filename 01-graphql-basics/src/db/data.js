const users = [
  { id: "u001", name: "monica", age: 22 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 21 },
];
const posts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "I love it❤️❤️",
    published: false,
    author: "u003",
  },
  {
    id: "p002",
    title: "NodeJS for Beginners",
    body: "I like it",
    published: true,
    author: "u002",
  },
  {
    id: "p003",
    title: "Refresh React",
    body: "Not bad",
    published: false,
    author: "u003",
  },
  {
    id: "p004",
    title: "Advanced of Angular",
    body: "for advance peeps",
    published: true,
    author: "u001",
  },
];
const comments = [
  {
    id: "c001",
    text: "all good",
    postId: "p004",
    creator: "u003",
  },
  {
    id: "c002",
    text: "very well",
    postId: "p003",
    creator: "u003",
  },
  {
    id: "c003",
    text: "nothing. just like that",
    postId: "p001",
    creator: "u001",
  },
  {
    id: "c004",
    text: "just like that",
    postId: "p003",
    creator: "u002",
  },
];

export default { users, posts, comments };

// u001 - p004, c003, c001
// u002 - p002, c004,
