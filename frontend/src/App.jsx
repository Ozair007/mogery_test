import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route
                        path="*"
                        element={
                            <div className="text-center my-10">
                                <h2 className="text-xl font-semibold">
                                    404 - Page Not Found
                                </h2>
                                <p>
                                    The page you are looking for does not exist.
                                </p>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
