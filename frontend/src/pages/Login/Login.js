import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import './Login.css';
import { useNavigate } from "react-router-dom";
import useBookmarks from '../../hooks/useBookmarks'; // Import the useBookmarks hook

function Login({ onLoginSuccess }) {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();
  const { bookmarkedMentors, bookmarkedResources, bookmarkedMentorPanels, toggleBookmark } = useBookmarks(user.email);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Check if the email ends with "@csu.fullerton.edu"
    if (userObject.email && userObject.email.endsWith("@csu.fullerton.edu")) {
      setUser(userObject);
      setErrorMessage(""); // Clear error message
      document.getElementById("signInDiv").hidden = true;
      onLoginSuccess(userObject);  // Notify parent component of login success

      // Send user info to backend
      const userData = { email: userObject.email, password: "default_password" };  // Replace with actual logic if needed
      fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'User created successfully') {
            console.log('User saved in database');
            navigate("/"); // Redirect to homepage after successful login
          }
        })
        .catch((error) => {
          console.error('Error saving user:', error);
          setErrorMessage("An error occurred while saving your user.");
        });
    } else {
      console.error(
        "Invalid email domain. Please log in with @csu.fullerton.edu account."
      );
      window.alert("Please log in with a CSUF email account.");
      setUser({}); // Clear user object
    }
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "279877673066-9sdgcigmi3me9qgugri1flafn9do4mvk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Please Login with CSUF Email</p>
        <div id="signInDiv">
          {Object.keys(user).length !== 0 && (
            <div>
              <button onClick={handleSignOut}>Sign out</button>
              <img src={user.picture} alt="User" />
              <h3>{user.name}</h3>
            </div>
          )}
        </div>
        {errorMessage && (
          <div className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
