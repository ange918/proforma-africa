import { Switch, Route } from "wouter";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, GuestRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#07191E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: 64, color: "#02F5A1", fontFamily: "Unbounded, sans-serif", marginBottom: 12 }}>404</h1>
      <p style={{ color: "#94A3B8", marginBottom: 24 }}>Page introuvable</p>
      <a href="/" style={{ color: "#02F5A1", textDecoration: "none", fontWeight: 600 }}>← Retour à l'accueil</a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/auth/callback" component={AuthCallback} />

        <Route path="/login">
          <GuestRoute><Login /></GuestRoute>
        </Route>
        <Route path="/register">
          <GuestRoute><Register /></GuestRoute>
        </Route>
        <Route path="/reset-password">
          <GuestRoute><ResetPassword /></GuestRoute>
        </Route>
        <Route path="/update-password">
          <UpdatePassword />
        </Route>

        <Route path="/dashboard">
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        </Route>

        <Route component={NotFound} />
      </Switch>
    </AuthProvider>
  );
}
