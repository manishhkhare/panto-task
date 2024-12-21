import React from 'react';

const Login = () => {
  const handleLogin = (platform) => {
    // Redirect to the respective platform's login route on the backend
    window.location.href = `http://localhost:5000/login/${platform}`;
  };

  return (
    <div>
      <h1>Login to your account</h1>
      <button onClick={() => handleLogin('github')}>Login with GitHub</button>
      <button onClick={() => handleLogin('gitlab')}>Login with GitLab</button>
      <button onClick={() => handleLogin('bitbucket')}>Login with Bitbucket</button>
    </div>
  );
};

export default Login;
