import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_POST = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      title
      content
      createdAt
      image
    }
  }
`;

function PostDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post.</p>;

  const post = data.post;

  return (
    <div>
      <h1>{post.title}</h1>
      {post.image && (
        <img
          src={`http://localhost:8000/media/${post.image}`}
          alt="Post"
          width="400"
        />
      )}
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
}

export default PostDetail;
