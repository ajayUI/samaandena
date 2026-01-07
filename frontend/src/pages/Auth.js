import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationSelector } from '@/components/LocationSelector';
import { toast } from 'sonner';
import { User, Store, Truck, Mail, Lock, Phone } from 'lucide-react';

const Auth = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    role: 'customer',
    location: null
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(loginData.email, loginData.password);
      toast.success('Welcome back!');
      
      if (user.role === 'customer') navigate('/customer/dashboard');
      else if (user.role === 'shop_owner') navigate('/shop/dashboard');
      else if (user.role === 'delivery_agent') navigate('/delivery/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerData.location) {
      toast.error('Please select your location');
      return;
    }
    setLoading(true);
    try {
      const user = await register(registerData);
      toast.success('Account created successfully!');
      
      if (user.role === 'customer') navigate('/customer/dashboard');
      else if (user.role === 'shop_owner') navigate('/shop/dashboard');
      else if (user.role === 'delivery_agent') navigate('/delivery/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'customer', label: 'Customer', icon: User, description: 'Order from local shops' },
    { value: 'shop_owner', label: 'Shop Owner', icon: Store, description: 'Manage your shop' },
    { value: 'delivery_agent', label: 'Delivery Agent', icon: Truck, description: 'Deliver orders' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-manrope font-bold text-3xl text-stone-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join SamaanDena'}
          </h1>
          <p className="font-inter text-stone-600">
            {isLogin ? 'Login to your account' : 'Create your account to get started'}
          </p>
        </div>

        <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
            <TabsTrigger value="register" data-testid="register-tab">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-stone-700">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="login-email"
                    data-testid="login-email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="login-password" className="text-stone-700">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="login-password"
                    data-testid="login-password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  />
                </div>
              </div>

              <Button
                data-testid="login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name" className="text-stone-700">Full Name</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="register-name"
                    data-testid="register-name"
                    type="text"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    placeholder="John Doe"
                    className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-email" className="text-stone-700">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="register-email"
                    data-testid="register-email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-phone" className="text-stone-700">Phone Number</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="register-phone"
                    data-testid="register-phone"
                    type="tel"
                    required
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    placeholder="+1234567890"
                    className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-password" className="text-stone-700">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="register-password"
                    data-testid="register-password"
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-white border-stone-200 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-stone-700 mb-3 block">I am a</Label>
                <div className="grid grid-cols-1 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      data-testid={`role-${role.value}`}
                      onClick={() => setRegisterData({ ...registerData, role: role.value })}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        registerData.role === role.value
                          ? 'border-primary bg-green-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <role.icon className={`w-6 h-6 ${registerData.role === role.value ? 'text-primary' : 'text-stone-400'}`} />
                        <div>
                          <div className="font-manrope font-semibold text-stone-900">{role.label}</div>
                          <div className="text-sm text-stone-500">{role.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <LocationSelector
                onLocationSelect={(location) => setRegisterData({ ...registerData, location })}
              />

              <Button
                data-testid="register-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;