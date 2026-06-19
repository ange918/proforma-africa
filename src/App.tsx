import { Switch, Route } from "wouter";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, GuestRoute } from "./components/ProtectedRoute";
import { DashboardLayout } from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import AuthCallback from "./pages/AuthCallback";
import DashboardHome from "./pages/dashboard/Home";
import DashboardFactures from "./pages/dashboard/Factures";
import DashboardDevis from "./pages/dashboard/Devis";
import DashboardProformas from "./pages/dashboard/Proformas";
import DashboardClients from "./pages/dashboard/Clients";
import DashboardServices from "./pages/dashboard/Services";
import DashboardParametres from "./pages/dashboard/Parametres";
import DashboardAbonnement from "./pages/dashboard/Abonnement";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "Inter, sans-serif", minHeight: "100vh", background: "#07191E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: 64, color: "#02F5A1", fontFamily: "Unbounded, sans-serif", marginBottom: 12 }}>404</h1>
      <p style={{ color: "#94A3B8", marginBottom: 24 }}>Page introuvable</p>
      <a href="/" style={{ color: "#02F5A1", textDecoration: "none", fontWeight: 600 }}>← Retour à l'accueil</a>
    </div>
  );
}

function DB({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
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
          <DB><DashboardHome /></DB>
        </Route>
        <Route path="/dashboard/factures">
          <DB><DashboardFactures /></DB>
        </Route>
        <Route path="/dashboard/devis">
          <DB><DashboardDevis /></DB>
        </Route>
        <Route path="/dashboard/proformas">
          <DB><DashboardProformas /></DB>
        </Route>
        <Route path="/dashboard/clients">
          <DB><DashboardClients /></DB>
        </Route>
        <Route path="/dashboard/services">
          <DB><DashboardServices /></DB>
        </Route>
        <Route path="/dashboard/parametres">
          <DB><DashboardParametres /></DB>
        </Route>
        <Route path="/dashboard/abonnement">
          <DB><DashboardAbonnement /></DB>
        </Route>

        <Route component={NotFound} />
      </Switch>
    </AuthProvider>
  );
}
