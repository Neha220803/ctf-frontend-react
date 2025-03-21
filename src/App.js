import "./App.css";
import IntroPage from "./pages/dashbaord/intro/intro";
import LoginPage from "./pages/login/login";
import SquidGameNavbar from "./pages/dashbaord/nav/nav";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import ChallengesPage from "./pages/dashbaord/challenges/challenges";
import LeaderboardPage from "./pages/dashbaord/leaderboard/leaderboard";
import SignUpComponent from "./pages/login/signup";

function App() {
  return (
    <div>
      <BrowserRouter basename="/ctf-frontend-react">
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
      </Routes>
    </>
  );
}

export default App;
