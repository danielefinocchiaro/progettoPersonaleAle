import { useState } from "react";
import Login from "./pages/Login";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SongProvider } from "./use-audio";

function App() {
  const queryClient = new QueryClient();
  return (
    <SongProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </SongProvider>
  );
}

export default App;
