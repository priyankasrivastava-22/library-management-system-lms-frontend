// // // File: src/components/Login.js
// // import React, { useState } from "react";
// // import bgImage from "./image/bg.jpg"; // background image for login
// // import { useNavigate } from "react-router-dom"; // navigation hook
// // import "./Login.css";

// // export default function Login({ onLogin }) {
// //   // React state variables
// //   const [showForm, setShowForm] = useState(false); // Show login form or circle
// //   const [email, setEmail] = useState("");          // Email input
// //   const [password, setPassword] = useState("");    // Password input
// //   const [error, setError] = useState("");          // Error message

// //   const navigate = useNavigate(); // ✅ Create navigate instance here

// //   // Handle login form submit
// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     if (email && password) {
// //       // ✅ If both fields are filled, redirect to dashboard
// //       setError(""); 
// //       // onLogin(email, password); // Optional: call parent login logic
// //       navigate("/dashboard"); // go to dashboard
// //     } else {
// //       // ❌ Show error if inputs are empty
// //       setError("Please enter email and password.");
// //     }
// //   };

// //   return (
// //     <div
// //       className="login-page"
// //       style={{ backgroundImage: `url(${bgImage})` }}
// //     >
// //       {!showForm ? (
// //         // 🔵 Step 1: Show circle first
// //         <div className="login-circle-container">
// //           <div
// //             className="login-circle"
// //             onClick={() => setShowForm(true)}
// //           >
// //             Login
// //           </div>
// //         </div>
// //       ) : (
// //         // 📝 Step 2: Show form after clicking circle
// //         <form className="login-form" onSubmit={handleLogin}>
// //           <h2>Login</h2>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           {/* Show error message if exists */}
// //           {error && <p className="error-msg">{error}</p>}
// //           <button type="submit">Submit</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }


// // File: src/components/Login.js
// import React, { useState } from "react";
// import bgImage from "./image/bg.jpg";           //  background image (same as dashboard)
// import { useNavigate } from "react-router-dom"; //  navigation hook
// import "./Login.css";

// export default function Login({ onLogin }) {
//   //  React state variables
//   const [showForm, setShowForm] = useState(false); // Show login form or circle
//   const [email, setEmail] = useState("");          // Email input
//   const [password, setPassword] = useState("");    // Password input
//   const [error, setError] = useState("");          // Error message

//   const navigate = useNavigate(); //  navigation instance

//   //  Handle login form submit
//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email && password) {
//       setError(""); 
//       // onLogin(email, password); // optional parent logic
//       navigate("/dashboard"); // redirect to dashboard
//     } else {
//       setError("Please enter email and password."); //  error handling
//     }
//   };

//   return (
//     <div
//       className="login-page"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {/* Left side: Welcome message */}
//       <div className="login-left">
//         <h1>Welcome to the Library</h1>
//       </div>

//       {/*  Right side: Circle or Login form */}
//       <div className="login-right">
//         {!showForm ? (
//           //  Step 1: Show login circle
//           <div
//             className="login-circle"
//             onClick={() => setShowForm(true)}
//           >
//             Login
//           </div>
//         ) : (
//           //  Step 2: Show login form after clicking circle
//           <form className="login-form" onSubmit={handleLogin}>
//             <h2>Login</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {/*  Error message if inputs empty */}
//             {error && <p className="error-msg">{error}</p>}
//             <button type="submit">Submit</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }



// File: src/components/Login.js
import React, { useState } from "react";
import bgImage from "./image/bg.jpg"; // ✅ same background as dashboard
import { useNavigate } from "react-router-dom"; 
import "./Login.css";
import { FaUserCircle } from "react-icons/fa";  //  import login/user icon

export default function Login() {
  // ✅ state management
  const [showForm, setShowForm] = useState(false); 
  const [email, setEmail] = useState("");          
  const [password, setPassword] = useState("");    
  const [error, setError] = useState("");          

  const navigate = useNavigate(); // ✅ navigation hook

  // ✅ handle login
  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      setError(""); 
      navigate("/dashboard"); // go to dashboard
    } else {
      setError("Please enter email and password.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* ✅ Overlay same as dashboard */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
        }}
      />

      {/* ✅ Content container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "90vh",
          padding: "0 50px",
          position: "relative",
          zIndex: 1, // above overlay
        }}
      >
        {/* ✅ Left Side: Welcome text */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: "48px",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            fontFamily: "'Georgia', serif",
            paddingLeft: "40px",
            color : "white"
          }}
        >
          Welcome to the Library
        </div>

        {/* ✅ Right Side: Login circle or form */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            paddingLeft: "150px", // same positioning as dashboard circles
            fontSize: "16px",    
          }}
        >
          {!showForm ? (
            // 🔵 Login Circle
            <div
               className="login-circle"
               onClick={() => setShowForm(true)}
               style={{
               width: "80px",          // smaller circle
               height: "80px",
               borderRadius: "50%",
               backgroundColor: "rgba(255,255,255,0.1)",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               cursor: "pointer",
               color: "white",
               fontSize: "80px",        // icon size
               transition: "0.3s",
               marginLeft: "180px",     // 👈 pushes more right
              }}
              >
               <FaUserCircle />
            </div>
          ) 
          : (
            // 📝 Login Form
            <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="error-msg">{error}</p>}
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
