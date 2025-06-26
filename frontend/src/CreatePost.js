import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate, Navigate } from "react-router-dom";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $image: Upload) {
    createPost(title: $title, content: $content, image: $image) {
      post {
        id
        title
        content
        createdAt
        image
      }
    }
  }
`;

function CreatePost() {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const [createPost] = useMutation(CREATE_POST, {
    context: {
      headers: {
        Authorization: token ? `JWT ${token}` : "",
      },
    },
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          allPosts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: createPost.post,
              fragment: gql`
                fragment NewPost on PostType {
                  id
                  title
                  content
                  createdAt
                  image
                }
              `,
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({
      variables: { title, content, image },
    });
    navigate("/");
  };

  if (!token) return <Navigate to="/login" />;

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
