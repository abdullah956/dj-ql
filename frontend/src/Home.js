import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreatePost = () => {
    if (isLoggedIn) {
      navigate("/new");
    } else {
      navigate("/login");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </>
        )}
      </div>

      <button onClick={handleCreatePost}>Create New Post</button>

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
