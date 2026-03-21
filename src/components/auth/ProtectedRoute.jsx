import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({ requireAuth = true, requireOnboarding = false }) {
    const [status, setStatus] = useState("loading");
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                if (requireOnboarding) {
                    try {
                        const snap = await getDoc(doc(db, "users", user.uid));
                        if (snap.exists() && snap.data().onboardingCompleted) {
                            setStatus("auth_onboarded");
                        } else {
                            setStatus("auth_needs_onboarding");
                        }
                    } catch {
                        setStatus("auth_onboarded");
                    }
                } else {
                    setStatus("auth");
                }
            } else {
                setStatus("unauth");
            }
        });
        return () => unsubscribe();
    }, [requireOnboarding]);

    if (status === "loading") {
        return <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-indigo-400 font-bold tracking-widest uppercase animate-pulse">Loading App...</div>;
    }

    if (requireAuth && status === "unauth") {
        return <Navigate to="/" replace />;
    }

    if (requireOnboarding && status === "auth_needs_onboarding" && location.pathname !== "/onboarding" && location.pathname !== "/recommendation") {
        return <Navigate to="/onboarding" replace />;
    }

    return <Outlet />;
}
