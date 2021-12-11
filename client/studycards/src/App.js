import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Home, Dashboard, Register, Login, Question } from "./pages";
import PrivateRoute from "./components/PrivateRoute";
import { useGlobalContext } from "./contextAPI/appContext";
function App() {
  const { loadUser, user } = useGlobalContext();

  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/flashcard/:id" element={<Question />} />

        {/* <Route path="*">
          <Error />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
