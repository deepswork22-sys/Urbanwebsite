import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // null = checking, false = unauthenticated, object = user
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        api.get("/auth/me")
            .then((res) => mounted && setUser(res.data))
            .catch(() => mounted && setUser(false));
        return () => {
            mounted = false;
        };
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        if (data?.token) {
            localStorage.setItem("ub_token", data.token);
            api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        }
        setUser(data.user);
        return data.user;
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (_) {}
        localStorage.removeItem("ub_token");
        delete api.defaults.headers.common.Authorization;
        setUser(false);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

// Attach token from localStorage on init (for cross-site cookie fallback)
const t = typeof window !== "undefined" ? localStorage.getItem("ub_token") : null;
if (t) api.defaults.headers.common.Authorization = `Bearer ${t}`;
