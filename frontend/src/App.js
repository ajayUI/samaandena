import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/sonner';
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import CustomerDashboard from '@/pages/CustomerDashboard';
import ShopDashboard from '@/pages/ShopDashboard';
import DeliveryDashboard from '@/pages/DeliveryDashboard';
import '@/App.css';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop/dashboard"
              element={
                <ProtectedRoute allowedRoles={['shop_owner']}>
                  <ShopDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delivery/dashboard"
              element={
                <ProtectedRoute allowedRoles={['delivery_agent']}>
                  <DeliveryDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-center" richColors />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;