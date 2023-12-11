// import React from "react";
// import Router from "../../routes/Router";
// import Sidebar from "../Sidebar/Sidebar";
// import TopNav from "../TopNav/TopNav";

// const Layout = () => {
//   return (
//     <div className="layout">
//       <Sidebar />
//       <div className="main__layout">
//         <TopNav />

//         <div className="content">
//           <Router />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="layout">
      {!isLoginPage && <Sidebar />}
      <div className="main__layout">
        {!isLoginPage && <TopNav />}

        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default Layout;
