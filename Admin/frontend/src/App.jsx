import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateMovie from "./pages/CreateMovie";
import Login from "./pages/Login";
import UpdateMovie from "./pages/UpdateMovie";
import Layout from "./pages/Layout";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/create" element={<CreateMovie />} />
          <Route path="/users" element={<Users />} />
          <Route path="/modal" element={<UpdateMovie />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router"; // Corrected import path
// import HomePage from "./pages/HomePage"; // Ensure HomePage is imported
// import CreateMovie from "./pages/CreateMovie";
// import Login from "./pages/Login";
// import UpdateMovie from "./pages/UpdateMovie";
// import Layout from "./pages/Layout";
// import Users from "./pages/Users";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route element={<Layout />}>
//           <Route path="/" element={<HomePage />} /> {/* Home page */}
//           <Route path="/create" element={<CreateMovie />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/modal" element={<UpdateMovie />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Corrected import path
// import HomePage from "./pages/HomePage";
// import CreateMovie from "./pages/CreateMovie";
// import Login from "./pages/Login";
// import UpdateMovie from "./pages/UpdateMovie";
// import Layout from "./pages/Layout";
// import Users from "./pages/Users";

// function App() {
//   const isAuthenticated = !!localStorage.getItem("user"); // Check if user is authenticated

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route element={<Layout />}>
//           <Route
//             path="/"
//             element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/create"
//             element={
//               isAuthenticated ? <CreateMovie /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/users"
//             element={isAuthenticated ? <Users /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/modal"
//             element={
//               isAuthenticated ? <UpdateMovie /> : <Navigate to="/login" />
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
