import "./App.css";
import IntroPage from "./pages/dashbaord/intro/intro";
import LoginPage from "./pages/login/login";
import SquidGameNavbar from "./pages/dashbaord/nav/nav";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import ChallengesPage from "./pages/dashbaord/challenges/challenges";
import LeaderboardPage from "./pages/dashbaord/leaderboard/leaderboard";
import SignUpComponent from "./pages/login/signup";
import Page404Comp from "./pages/404Page/404Page";
import SquidGameManagerPortal from "./pages/officer/officer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavbar && <SquidGameNavbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/dashboard/home" element={<IntroPage />} />
        <Route
          exact
          path="/dashboard/challenges"
          element={<ChallengesPage />}
        />
        <Route
          exact
          path="/dashboard/leaderboard"
          element={<LeaderboardPage />}
        />
        <Route path="/officer" element={<SquidGameManagerPortal />} />
        <Route path="*" element={<Page404Comp />} />
      </Routes>
    </>
  );
}

export default App;
