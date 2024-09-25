import React from 'react';
import { Link } from 'react-router-dom';

function Navegar() {
  return (
    <div>
      <Link to="/login">
        <button id='login-btn' type="button" name="login">Login</button>
      </Link>
      <Link to="/sign_up">
        <button id='signup-btn' type="button" name="signup">Sign Up</button>
      </Link>
    </div>
  );
}

export default Navegar;
