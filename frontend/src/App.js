import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import StaffLogin from "./pages/StaffLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/staff" element={<StaffLogin />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </BrowserRouter>
                <Toaster
                    theme="dark"
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: "#151F19",
                            border: "1px solid rgba(200,169,126,0.3)",
                            color: "#FDFBF7",
                        },
                    }}
                />
            </AuthProvider>
        </div>
    );
}

export default App;
