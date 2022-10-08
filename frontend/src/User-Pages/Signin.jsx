import React, { useEffect, useState } from "react"; // use state is a hook that lets you add state to components. You can't use this.state in a function like you can in a class. This is where usestate comes in. You can use this inside your function so state can still be used. Use effect is a hook that tells react your component needs to do something after it renders instead of just setting it and forgetting it. We can use this instead of making two function for setting a state and updating that state.
import { Link, useNavigate } from "react-router-dom"; // react router allows you to use a react app like a multi page app instead of multiple components. With link and use navigate, you can type a link as a string and use navigate to bring the client to the specific page.
import { toast, ToastContainer } from "react-toastify"; // toast is a popup message that shows the user if the task they performed is successful or fails. This pop up shows on the front end much like an alert but toastcontainer comes from a node package that adds a bit of style to the popup.
import { useCookies } from "react-cookie"; // another node package that can help set cookies and use them in your react app. We will need this because cookies are what makes our authentication work in our react app.
import axios from "axios"; // axios is another npm that sends requests to routes a lot easier and also is easier to write CRUD operations.

function Signin() {
  const [cookies, setCookie] = useCookies([]); // variable that defines our cookie and calls the use cookies hook in react cookie. This hook returns the cookies object to determine what priveleges the user has on the app. SetCookie sets the cookie and keeps it there until it expires or is removed.
  const navigate = useNavigate(); // variable that allows us to navigate REST routes
  useEffect(() => {
    // use effect hook to be used in our app
    if (cookies.jwt) {
      // if the cookie object contains a valid jwt token
      navigate("/"); // navigate to the homepage
    }
  }, [cookies, navigate]); // after everything is rendered, keep the cookies object and navigate function in our state

  const [values, setValues] = useState({
    // setting state for our email and password. This makes our email and password form in our page empty strings so when you click in the form, you start from scratch to type your email and password
    email: "",
    password: "",
  });

  const generateError = (
    err // function that uses toastify to show the errors that we created in the front end so the user knows if the email or password was incorrect
  ) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    // async function for our submit event handler
    e.preventDefault(); // prevents the form from being automatically submitted, which is react's default. We want this function to run when the user chooses.
    try {
      // try hook
      const { data } = await axios.post(
        // data will be destructured when the post route is hit at our backend's sign in route. We already have our sign in function running in our backend which is what will run when this route is hit. This function will wait until the data is used in that function to determine an outcome.
        process.env.NODE_ENV === "development"
          ? `http://localhost:${process.env.REACT_APP_BACKEND_PORT}/Signin`
          : "https://student-dashboards.herokuapp.com/Signin", // our sign in route that axios will use
        {
          ...values, // the data that the sign in function in our backend will use. In this case it is the values submitted in the form, which are our email and password stated above
        },
        {
          withCredentials: true, // with credentials is a boolean value that if true will allow the user to go accross the site with the cookie they generated
        }
      );
      if (data) {
        // if statement for if there are errors or if the sign in was a success
        if (data.errors) {
          // when destructured, if the data has any errors from our backend that we already defined in our controller
          const { email, password } = data.errors; // destructuring email and password and using the errors inside email and password in our controller
          if (email) generateError(email);
          // if the email is not an empty string we will use the generate error function that we defined above to show the user what the error is
          else if (password) generateError(password); // if the password is not an empty string we will use the generate error function that we defined above to show the user what the error is
        } else {
          // if everything else is okay
          navigate("/"); // using axios to navigate to the home page
        }
      }
    } catch (err) {
      // catching the error to make sure the app doesn't crash and run the whole function if an error occurs
      console.log(err); // console logging error
    }
  };

  return (
    <div className="signinpage">
      <h1 className="welcome">Welcome to Student Dashboards!</h1>
      <h2 className="signinlabel">Sign In</h2>
      <form className="signinform" onSubmit={(e) => handleSubmit(e)}>
        {/* using handle submit function defined above when submit button is clicked */}
        <div className="signindiv">
          <input
            className="signininput"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(
              e // onchange event that sets the name and value for the email portion of the form when the user types it in
            ) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="signindiv">
          <input
            className="signininput"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(
              e // onchange event that sets the name and value for the password portion of the form when the user types it in
            ) => setValues({ ...values, [e.target.name]: e.target.value })}
          />
        </div>
        <div className="submitdiv">
          <button type="submit" className="submitbutton">
            Submit
          </button>
        </div>
        <span className="registertext">
          Don't have an account?{""}
          <Link to="/register" className="registerbutton">
            Register
          </Link>
        </span>
      </form>
      <ToastContainer /> {/* toast container pop up */}
    </div>
  );
}

export default Signin;
