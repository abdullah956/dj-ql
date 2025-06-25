import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_POSTS = gql`
  query {
    allPosts {
      id
      title
      content
      createdAt
      image
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div>
      <Link to="/new">
        <button>Create New Post</button>
      </Link>

      <h1>Blog Posts</h1>
      {data.allPosts.map((post) => (
        <div
          key={post.id}
          style={{ borderBottom: "1px solid #ccc", margin: "20px 0" }}
        >
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content.slice(0, 100)}...</p>
          {post.image && (
            <img
              src={`http://localhost:8000/media/${post.image}`}
              alt="Post"
              width="300"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
