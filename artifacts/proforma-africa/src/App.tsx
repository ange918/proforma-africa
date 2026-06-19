import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, GuestRoute } from "@/components/ProtectedRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Dashboard from "@/pages/Dashboard";
import AuthCallback from "@/pages/AuthCallback";

const queryClient = new QueryClient();

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
