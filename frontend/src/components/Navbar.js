import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, Truck, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'customer':
        return '/customer/dashboard';
      case 'shop_owner':
        return '/shop/dashboard';
      case 'delivery_agent':
        return '/delivery/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <span className="font-manrope font-bold text-2xl text-stone-900">SamaanDena</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to={getDashboardLink()}>
                  <Button
                    data-testid="dashboard-btn"
                    variant="ghost"
                    className="hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                  >
                    {user.role === 'customer' && <ShoppingBag className="w-5 h-5 mr-2" />}
                    {user.role === 'shop_owner' && <Package className="w-5 h-5 mr-2" />}
                    {user.role === 'delivery_agent' && <Truck className="w-5 h-5 mr-2" />}
                    Dashboard
                  </Button>
                </Link>
                <Button
                  data-testid="logout-btn"
                  onClick={handleLogout}
                  variant="ghost"
                  className="hover:bg-stone-100 text-stone-600 hover:text-stone-900"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button
                  data-testid="login-btn"
                  className="bg-primary text-white hover:bg-primary/90 h-10 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                >
                  <User className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};