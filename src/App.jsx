import React, { useEffect } from "react";
import { supabase } from "./lib/helper/supabaseclient";
import Loginpage from "./pages/loginpage";
import Registerpage from "./pages/registerpage";
import {
  HashRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Passwordrecovery from "./pages/passwordrecovery";
import { InitPage } from "./pages/initpage";
import Passwordupdate from "./pages/passwordupdate";
import { TaskContextProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskContextProvider>
      <HashRouter basename="/ToDoNotes">
        <AuthListener />
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/passwordrecovery" element={<Passwordrecovery />} />
          <Route path="/init" element={<InitPage />} />
          <Route path="/passwordupdate" element={<Passwordupdate />} />
        </Routes>
      </HashRouter>
    </TaskContextProvider>
  );
}

function AuthListener() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          !session &&
          location.pathname !== "/" &&
          location.pathname !== "/register" &&
          location.pathname !== "/passwordrecovery"
        ) {
          navigate("/");
        } else if (
          session &&
          location.pathname !== "/init" &&
          location.pathname !== "/passwordupdate"
        ) {
          navigate("/init");
        }
      }
    );
    
    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate, location]);

  return null;
}

export default App;

