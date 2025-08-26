// // File: src/components/Dashboard.js
// import React from "react";
// import { useNavigate } from "react-router-dom"; // ✅ helps navigation
// import { FaUserCircle, FaBell, FaShoppingCart } from "react-icons/fa";
// import TopBar from "./TopBar"; // ✅ import the reusable top bar
// import dashboardBg from "./image/bg.jpg"; // background image for login

// export default function Dashboard() {
//   const navigate = useNavigate(); // hook for navigation

//   return (
//     <div 
//       style={{ 
//         backgroundImage: `url(${dashboardBg})`, // set your dashboard background image
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         padding: "20px",
//         minHeight: "100vh",
//         position: "relative", // important: TopBar uses absolute positioning
//       }}
//     >
//        {/* Reusable Top Bar */}
//        <TopBar />

//       {/* Welcome Message */}
//       <h1 style={{ 
//         textAlign: "center", 
//         fontSize: "40px", 
//         fontWeight: "bold",
//         color: "#FF0000", 
//         marginTop: "120px" }}>
//         Welcome to the Library
//       </h1>

//       {/* Category Cards */}
//       <div style={{ 
//         display: "flex", 
//         justifyContent: "center", 
//         marginTop: "50px", 
//         gap: "40px" }}>
        
//         {/* Fiction Card */}
//         <div 
//           onClick={() => navigate("/fiction")} 
//           style={{
//             width: "200px",
//             height: "250px",
//             background: "rgba(0,0,0,0.6)",
//             borderRadius: "15px",
//             cursor: "pointer",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             fontSize: "24px",
//             fontWeight: "bold",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
//           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
//         >
//           Fiction
//         </div>

//         {/* Non-Fiction Card */}
//         <div 
//           onClick={() => navigate("/nonfiction")} 
//           style={{
//             width: "200px",
//             height: "250px",
//             background: "rgba(0,0,0,0.6)",
//             borderRadius: "15px",
//             cursor: "pointer",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             fontSize: "24px",
//             fontWeight: "bold",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
//           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
//         >
//           Non-Fiction
//         </div>

//         {/* Study Card */}
//         <div 
//           onClick={() => navigate("/study")} 
//           style={{
//             width: "200px",
//             height: "250px",
//             background: "rgba(0,0,0,0.6)",
//             borderRadius: "15px",
//             cursor: "pointer",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             fontSize: "24px",
//             fontWeight: "bold",
//             transition: "0.3s",
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
//           onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
//         >
//           Study
//         </div>
//       </div>
//     </div>
//   );
// }



// File: src/components/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./image/bg.jpg"; // same as login
// import TopBar from "./components/TopBar";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      {/* Overlay for visibility */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", // semi-dark overlay
          zIndex: 0,
        }}
      />

      {/* Top Bar
      <TopBar /> */}

      {/* Content */}
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
        {/* Left Side: Welcome Text */}
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
            paddingLeft:"40px",
            color: "white",
          }}
        >
           Welcome to the Library
        </div>

        {/* Right Side: Section Cards */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            // alignItems: "flex-end",
            paddingLeft:"230px",
            // paddingTop: "40px",
            // right: "-100px",
            // top: "20%",

          }}
        >
          {/* Fiction */}
          <div
            onClick={() => navigate("/fiction")}
            style={{
              width: "170px",
              height: "170px",
              background: "rgba(255,255,255,0.2)", // slightly visible
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "26px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
              backdropFilter: "blur(4px)", // nice glass effect
              transition: "0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Fiction
          </div>

          {/* Non-Fiction */}
          <div
            onClick={() => navigate("/nonfiction")}
            style={{
              width: "170px",
              height: "170px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
              backdropFilter: "blur(4px)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Non-Fiction
          </div>

          {/* Study */}
          <div
            onClick={() => navigate("/study")}
            style={{
              width: "170px",
              height: "170px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#fff",
              backdropFilter: "blur(4px)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Study
          </div>
        </div>
      </div>
    </div>
  );
}
