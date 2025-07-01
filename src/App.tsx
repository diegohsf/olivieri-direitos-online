
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Especialidades from "./pages/Especialidades";
import Depoimentos from "./pages/Depoimentos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import ClientPanel from "./pages/ClientPanel";
import ClientDocuments from "./pages/ClientDocuments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/especialidades" element={<Especialidades />} />
          <Route path="/depoimentos" element={<Depoimentos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/cliente" element={<ClientPanel />} />
          <Route path="/cliente/:clientId/documentos" element={<ClientDocuments />} />
          {/* Redirecionar rotas antigas para a nova página de login */}
          <Route path="/admin-login" element={<Login />} />
          <Route path="/cliente-login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
