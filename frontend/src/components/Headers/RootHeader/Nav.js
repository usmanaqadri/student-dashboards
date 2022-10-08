import React from "react";
import { Link, useNavigate } from "react-router-dom"; // react router allows you to use a react app like a multi page app instead of multiple components. With link and use navigate, you can type a link as a string and use navigate to bring the client to the specific page.
import { useCookies } from "react-cookie"; // another node package that can help set cookies and use them in your react app. We will need this because cookies are what makes our authentication work in our react app.

export default function Nav() {
  const navigate = useNavigate(); // variable that allows us to navigate REST routes
  const [cookies, setCookie, removeCookie] = useCookies([]); // variable that defines our cookie and calls the use cookies hook in react cookie. This hook returns the cookies object to determine what priveleges the user has on the app. SetCookie sets the cookie and keeps it there until it expires or is removed. Remove cookie will also remove the cookie if need be
  const signOut = () => {
    // sign out function
    removeCookie("jwt"); // remove jwt token from the cookie
    navigate("/Signin"); // navigate to sign in page
  };

  return (
    <nav>
      <ul>
        <li>
          <Link className="navbar-links" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navbar-links" to="/new">
            New Dashboard
          </Link>
        </li>
        <li>
          <button className="navbar-links" onClick={signOut}>
            Log Out
          </button>{" "}
          {/* sign out button that runs sign out function on click */}
        </li>
      </ul>
    </nav>
  );
}
