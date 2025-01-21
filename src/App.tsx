import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { useUser } from "./context/UserContext";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { RegisterForm } from "./components/RegisterForm";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
};
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100 flex flex-col">
                <Header />
                <main className="w-full md:w-6/12 self-center">
                  <HomePage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );

  /* user ? (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto">
        <HomePage />
      </main>
    </div>
  ) : (
    <LoginForm />
  ) */
};

export default App;
