import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Truck, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { SamaanDenaLogo } from './Logo';

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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <SamaanDenaLogo className="w-10 h-10 transition-transform group-hover:scale-110" />
            <div className="flex flex-col">
              <span className="font-manrope font-bold text-2xl bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                SamaanDena
              </span>
              <span className="text-xs text-stone-500 font-inter -mt-1">Local. Fresh. Fast.</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to={getDashboardLink()}>
                  <Button
                    data-testid="dashboard-btn"
                    variant="ghost"
                    className="hover:bg-orange-50 text-stone-700 hover:text-orange-600 transition-colors"
                  >
                    {user.role === 'customer' && <Package className="w-5 h-5 mr-2" />}
                    {user.role === 'shop_owner' && <Package className="w-5 h-5 mr-2" />}
                    {user.role === 'delivery_agent' && <Truck className="w-5 h-5 mr-2" />}
                    Dashboard
                  </Button>
                </Link>
                <Button
                  data-testid="logout-btn"
                  onClick={handleLogout}
                  variant="ghost"
                  className="hover:bg-red-50 text-stone-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button
                  data-testid="login-btn"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-11 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 font-semibold"
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