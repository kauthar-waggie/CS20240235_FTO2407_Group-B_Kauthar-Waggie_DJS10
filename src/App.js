import React, { useState, useEffect } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Data fetching failed ');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message); // Saves error message in state
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1> Posts</h1>
      {error ? (
        <div style={{ color: 'red', textAlign: 'center' }}>
          <p>Error: {error}</p>
        </div>
      ) : (
        posts.map((post, index) => (
          <div key={post.id} style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>
              {index + 1}. {post.title}
            </h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
