import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Store, ShoppingCart, MapPin, Package, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { StarRating } from '../components/Rating';
import { LocationSelector } from '../components/LocationSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CustomerDashboard = () => {
  const { user, getAuthHeader } = useAuth();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [location, setLocation] = useState(user?.location || null);
  const [showCart, setShowCart] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showShopProducts, setShowShopProducts] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShops();
    fetchOrders();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${API}/shops`);
      setShops(response.data);
    } catch (error) {
      toast.error('Failed to load shops');
    }
  };

  const fetchProducts = async (shopId) => {
    try {
      const response = await axios.get(`${API}/products?shop_id=${shopId}`);
      setProducts(response.data);
      setSelectedShop(shops.find(s => s.id === shopId));
      setShowShopProducts(true);
    } catch (error) {
      toast.error('Failed to load products');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`, { headers: getAuthHeader() });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.product_id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product_id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        product_id: product.id,
        product_name: product.name,
        quantity: 1,
        price: product.price
      }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product_id !== productId));
  };

  const placeOrder = async () => {
    if (!location) {
      toast.error('Please set your delivery location');
      return;
    }
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/orders`, {
        shop_id: selectedShop.id,
        items: cart,
        delivery_address: location.address,
        delivery_location: { lat: location.lat, lng: location.lng }
      }, { headers: getAuthHeader() });
      
      toast.success('Order placed successfully!');
      setCart([]);
      setShowCart(false);
      setShowShopProducts(false);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    assigned: 'bg-blue-100 text-blue-800',
    picked_up: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-manrope font-bold text-3xl md:text-4xl text-stone-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="font-inter text-stone-600">Browse shops and order your daily essentials</p>
        </div>

        <div className="mb-6">
          <LocationSelector
            defaultLocation={location}
            onLocationSelect={setLocation}
          />
        </div>

        <div className="flex gap-4 mb-8">
          <Button
            data-testid="view-cart-btn"
            onClick={() => setShowCart(true)}
            className="bg-accent text-white hover:bg-accent/90 h-12 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart ({cart.length})
          </Button>
          <Button
            data-testid="view-orders-btn"
            onClick={() => setShowOrders(true)}
            className="bg-primary text-white hover:bg-primary/90 h-12 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <Package className="w-5 h-5 mr-2" />
            My Orders
          </Button>
        </div>

        <div>
          <h2 className="font-manrope font-bold text-2xl text-stone-900 mb-6">Local Shops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div
                key={shop.id}
                data-testid={`shop-card-${shop.id}`}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => fetchProducts(shop.id)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Store className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-manrope font-bold text-lg text-stone-900 mb-1">
                        {shop.name}
                      </h3>
                      <p className="font-inter text-sm text-stone-600 mb-2">{shop.description}</p>
                      <div className="flex items-center gap-2 text-sm text-stone-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        {shop.address}
                      </div>
                      <StarRating rating={shop.rating} totalReviews={shop.total_reviews} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop Products Dialog */}
        <Dialog open={showShopProducts} onOpenChange={setShowShopProducts}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-manrope text-2xl">{selectedShop?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  data-testid={`product-card-${product.id}`}
                  className="bg-stone-50 rounded-xl p-4 space-y-3"
                >
                  <div className="aspect-square bg-white rounded-lg overflow-hidden">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-100">
                        <Package className="w-12 h-12 text-stone-300" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-manrope font-semibold text-stone-900">{product.name}</h4>
                    <p className="text-sm text-stone-600 line-clamp-2">{product.description}</p>
                    <p className="font-manrope font-bold text-lg text-primary mt-2">₹{product.price}</p>
                  </div>
                  <Button
                    data-testid={`add-to-cart-${product.id}`}
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="w-full bg-primary text-white hover:bg-primary/90 rounded-full"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Cart Dialog */}
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-manrope text-2xl">Your Cart</DialogTitle>
            </DialogHeader>
            {cart.length === 0 ? (
              <p className="text-center text-stone-500 py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product_id} data-testid={`cart-item-${item.product_id}`} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                    <div>
                      <h4 className="font-manrope font-semibold text-stone-900">{item.product_name}</h4>
                      <p className="text-sm text-stone-600">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-manrope font-bold text-primary">₹{item.price * item.quantity}</span>
                      <Button
                        data-testid={`remove-from-cart-${item.product_id}`}
                        onClick={() => removeFromCart(item.product_id)}
                        variant="ghost"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-manrope font-bold text-lg">Total:</span>
                    <span className="font-manrope font-bold text-2xl text-primary">₹{cartTotal}</span>
                  </div>
                  <Button
                    data-testid="checkout-btn"
                    onClick={placeOrder}
                    disabled={loading}
                    className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
                  >
                    {loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Orders Dialog */}
        <Dialog open={showOrders} onOpenChange={setShowOrders}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-manrope text-2xl">My Orders</DialogTitle>
            </DialogHeader>
            {orders.length === 0 ? (
              <p className="text-center text-stone-500 py-8">No orders yet</p>
            ) : (
              <div className="space-y-4 mt-4">
                {orders.map((order) => (
                  <div key={order.id} data-testid={`order-${order.id}`} className="bg-stone-50 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-stone-500">Order ID: {order.id.slice(0, 8)}</p>
                        <p className="font-manrope font-bold text-lg text-stone-900">₹{order.total_amount}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status] || 'bg-stone-100 text-stone-800'}`}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-stone-600">Items: {order.items.map(i => i.product_name).join(', ')}</p>
                      <p className="text-sm text-stone-600">Delivery to: {order.delivery_address}</p>
                      <p className="text-sm text-stone-500">{new Date(order.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerDashboard;