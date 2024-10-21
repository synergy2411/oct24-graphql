# Break Timings

- 12:00PM : 15 minutes
- 1:30 : 45 minutes
- 4:00 : 15 minutes

# NodeJS Installer

- Node Runtime Environment
- Node Package Manager (NPM)
- Core Modules (fs, os, path, http, events etc)

# JavaScript Environment

- Browser - Client-side JavaScript
- NRE - Server-side JavaScript

# REST Endpoint

- Over-fetching - Fetching more data than required
- Under-fetching - Fetching less data than required
- Server controls the data fetching
- Multiple REST Endpoints

/books: id, isbn, title, numOfPages, authorName, ... 20 fields

/booksForFourRecords

/booksForSixRecords

/authors : id, authorName, authorAge, ... more fields

---

id, isbn, title, authorName, authorAge

http://localhost:4040/graphql

query { // Fetching data
id,
isbn,
title,
authorName,
authorAge,
authorAddress
}

mutation {} // Create, Update, Delete
subscription {}

---

# Complex Types / Custom Types

type Query {
username: String!
userAge: Int!
}

Query {
username: () => "John Doe",
userAge: () => 32;
}

type Mutation {}
type Subscription {}

type Cart {
id: ID
products: Products
}

type Product {
id: ID
name: String
price: Float
}
