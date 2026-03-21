import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Onboarding from "./components/auth/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LevelRecommendation from "./components/dashboard/LevelRecommendation";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import Roadmap from "./components/dashboard/Roadmap";
import Progress from "./components/dashboard/Progress";
import ProjectsHub from "./components/dashboard/ProjectsHub";
import ActionPlan from "./components/dashboard/ActionPlan";
import SkillTracker from "./components/dashboard/SkillTracker";
import Internships from "./components/dashboard/Internships";
import ResumeBuilder from "./components/dashboard/ResumeBuilder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes - requireAuth but not necessarily onboarding */}
      <Route element={<ProtectedRoute requireAuth={true} requireOnboarding={false} />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/recommendation" element={<LevelRecommendation />} />
      </Route>

      {/* Main Dashboard - requires both auth and onboarding */}
      <Route element={<ProtectedRoute requireAuth={true} requireOnboarding={true} />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="progress" element={<Progress />} />
          <Route path="projects" element={<ProjectsHub />} />
          <Route path="actions" element={<ActionPlan />} />
          <Route path="skills" element={<SkillTracker />} />
          <Route path="internships" element={<Internships />} />
          <Route path="resume" element={<ResumeBuilder />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;