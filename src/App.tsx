import { Switch, Route } from "wouter";
import Home from "./pages/Home";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>404</h1>
      <p style={{ color: "#6B7280" }}>Page non trouvée</p>
      <a href="/" style={{ color: "#02F5A1", marginTop: 16, display: "inline-block" }}>← Retour à l'accueil</a>
    </div>
  );
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
