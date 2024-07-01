import { useEffect, useState } from 'react';
import {jwtDecode} from "jwt-decode";

function Login() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Check if the email ends with "@csu.fullerton.edu"
    if (userObject.email && userObject.email.endsWith("@csu.fullerton.edu")) {
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    } else {
        console.error("Invalid email domain. Please log in with @csu.fullerton.edu account.");
        // Optionally handle invalid login or show an error message to the user
        alert("Invalid email domain. Please log in with CSUF account.");
    }
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
          client_id: "279877673066-9sdgcigmi3me9qgugri1flafn9do4mvk.apps.googleusercontent.com",
          callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
      );


  }, []);

  // If we have no user: sign in button
  //If we have a user: show the log out button
  return (
      <div className='login-container'>
        <div className='login'>
            <h1 className='login-title'>Welcome</h1>
            <p className='login-subtitle'>Please Login with CSUF Email</p>
              <div id="signInDiv"></div>
              {Object.keys(user).length != 0 &&
                  <button onClick={ (e) => handleSignOut}>Sign out</button>
              }
              
              {user && 
                <div>
                  <img sir = {user.picture}></img>
                  <h3>{user.name}</h3>
                </div>
              }            
        </div>
      </div>
  )
}

export default Login;

