import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct the import
import './Login.css';

function Login() {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Check if the email ends with "@csu.fullerton.edu"
    if (userObject.email && userObject.email.endsWith("@csu.fullerton.edu")) {
      setUser(userObject);
      setErrorMessage(""); // Clear error message
      document.getElementById("signInDiv").hidden = true;
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

  // If we have no user: sign in button
  // If we have a user: show the log out button
  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login-title">Welcome</h1>
        <p className="login-subtitle">Please Login with CSUF Email</p>
        <div id="signInDiv">
          {/* Conditionally render sign-out button if user is logged in */}
          {Object.keys(user).length !== 0 && (
            <div>
              <button onClick={handleSignOut}>Sign out</button>
              <img src={user.picture} alt="User" />
              <h3>{user.name}</h3>
            </div>
          )}
        </div>
        {/* Display error message if available */}
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
