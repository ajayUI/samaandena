import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Store, Package, Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LocationSelector } from '@/components/LocationSelector';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ShopDashboard = () => {
  const { user, getAuthHeader } = useAuth();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shopForm, setShopForm] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    location: null
  });

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: ''
  });

  useEffect(() => {
    fetchShops();
    fetchDeliveryAgents();
  }, []);

  useEffect(() => {
    if (selectedShop) {
      fetchProducts();
      fetchOrders();
    }
  }, [selectedShop]);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${API}/shops/owner/my-shops`, { headers: getAuthHeader() });
      setShops(response.data);
      if (response.data.length > 0 && !selectedShop) {
        setSelectedShop(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load shops:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API}/products?shop_id=${selectedShop.id}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`, { headers: getAuthHeader() });
      const shopOrders = response.data.filter(o => o.shop_id === selectedShop.id);
      setOrders(shopOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const fetchDeliveryAgents = async () => {
    try {
      const response = await axios.get(`${API}/delivery-agents`, { headers: getAuthHeader() });
      setDeliveryAgents(response.data);
    } catch (error) {
      console.error('Failed to load delivery agents:', error);
    }
  };

  const createShop = async (e) => {
    e.preventDefault();
    if (!shopForm.location) {
      toast.error('Please select shop location');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/shops`, shopForm, { headers: getAuthHeader() });
      toast.success('Shop created successfully!');
      setShowCreateShop(false);
      setShopForm({ name: '', description: '', address: '', phone: '', location: null });
      fetchShops();
    } catch (error) {
      toast.error('Failed to create shop');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API}/products?shop_id=${selectedShop.id}`,
        {
          ...productForm,
          price: parseFloat(productForm.price),
          stock: parseInt(productForm.stock)
        },
        { headers: getAuthHeader() }
      );
      toast.success('Product added successfully!');
      setShowAddProduct(false);
      setProductForm({ name: '', description: '', price: '', category: '', stock: '', image_url: '' });
      fetchProducts();
    } catch (error) {
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const assignAgent = async (orderId, agentId) => {
    try {
      await axios.put(
        `${API}/orders/${orderId}/assign?agent_id=${agentId}`,
        {},
        { headers: getAuthHeader() }
      );
      toast.success('Delivery agent assigned!');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to assign agent');
    }
  };

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
            Shop Owner Dashboard
          </h1>
          <p className="font-inter text-stone-600">Manage your shops, products, and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Store className="w-6 h-6 text-primary" />
              <span className="text-sm text-stone-600">Total Shops</span>
            </div>
            <p className="font-manrope font-bold text-3xl text-stone-900">{shops.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-accent" />
              <span className="text-sm text-stone-600">Products</span>
            </div>
            <p className="font-manrope font-bold text-3xl text-stone-900">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-blue-500" />
              <span className="text-sm text-stone-600">Orders</span>
            </div>
            <p className="font-manrope font-bold text-3xl text-stone-900">{orders.length}</p>
          </div>
        </div>

        {shops.length === 0 ? (
          <div className="text-center py-12">
            <Store className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-manrope font-bold text-xl text-stone-900 mb-2">No shops yet</h3>
            <p className="text-stone-600 mb-6">Create your first shop to start selling</p>
            <Button
              data-testid="create-first-shop-btn"
              onClick={() => setShowCreateShop(true)}
              className="bg-primary text-white hover:bg-primary/90 h-12 px-8 rounded-full"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Shop
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-8">
              <Button
                data-testid="add-shop-btn"
                onClick={() => setShowCreateShop(true)}
                className="bg-primary text-white hover:bg-primary/90 h-12 px-6 rounded-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Shop
              </Button>
              <Button
                data-testid="add-product-btn"
                onClick={() => setShowAddProduct(true)}
                disabled={!selectedShop}
                className="bg-accent text-white hover:bg-accent/90 h-12 px-6 rounded-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </Button>
            </div>

            {selectedShop && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border border-stone-200 p-6">
                  <h2 className="font-manrope font-bold text-2xl text-stone-900 mb-4">
                    {selectedShop.name}
                  </h2>
                  <p className="text-stone-600">{selectedShop.description}</p>
                </div>

                <div>
                  <h3 className="font-manrope font-bold text-xl text-stone-900 mb-4">Products</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        data-testid={`product-${product.id}`}
                        className="bg-white rounded-xl border border-stone-100 p-4 space-y-2"
                      >
                        <h4 className="font-manrope font-semibold text-stone-900">{product.name}</h4>
                        <p className="font-manrope font-bold text-primary">₹{product.price}</p>
                        <p className="text-sm text-stone-600">Stock: {product.stock}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-manrope font-bold text-xl text-stone-900 mb-4">Orders</h3>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        data-testid={`order-${order.id}`}
                        className="bg-white rounded-xl border border-stone-200 p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm text-stone-500">Order ID: {order.id.slice(0, 8)}</p>
                            <p className="font-manrope font-bold text-lg text-stone-900">₹{order.total_amount}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <p className="text-sm text-stone-600">Items: {order.items.map(i => i.product_name).join(', ')}</p>
                          <p className="text-sm text-stone-600">Delivery to: {order.delivery_address}</p>
                        </div>
                        {order.status === 'pending' && (
                          <div className="flex gap-2">
                            <Select onValueChange={(agentId) => assignAgent(order.id, agentId)}>
                              <SelectTrigger data-testid={`assign-agent-${order.id}`} className="w-full">
                                <SelectValue placeholder="Assign Delivery Agent" />
                              </SelectTrigger>
                              <SelectContent>
                                {deliveryAgents.map((agent) => (
                                  <SelectItem key={agent.id} value={agent.id}>
                                    {agent.name} - {agent.phone}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        {order.delivery_agent_id && (
                          <p className="text-sm text-stone-500 mt-2">
                            Assigned to agent ID: {order.delivery_agent_id.slice(0, 8)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Create Shop Dialog */}
        <Dialog open={showCreateShop} onOpenChange={setShowCreateShop}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-manrope text-2xl">Create New Shop</DialogTitle>
            </DialogHeader>
            <form onSubmit={createShop} className="space-y-4">
              <div>
                <Label htmlFor="shop-name">Shop Name</Label>
                <Input
                  id="shop-name"
                  data-testid="shop-name-input"
                  required
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  placeholder="My Local Store"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="shop-description">Description</Label>
                <Textarea
                  id="shop-description"
                  data-testid="shop-description-input"
                  required
                  value={shopForm.description}
                  onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                  placeholder="Describe your shop"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="shop-phone">Phone</Label>
                <Input
                  id="shop-phone"
                  data-testid="shop-phone-input"
                  type="tel"
                  required
                  value={shopForm.phone}
                  onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
                  placeholder="+1234567890"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="shop-address">Address</Label>
                <Input
                  id="shop-address"
                  data-testid="shop-address-input"
                  required
                  value={shopForm.address}
                  onChange={(e) => setShopForm({ ...shopForm, address: e.target.value })}
                  placeholder="Full address"
                  className="mt-2"
                />
              </div>
              <LocationSelector
                onLocationSelect={(location) => setShopForm({ ...shopForm, location })}
              />
              <Button
                data-testid="submit-shop-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
              >
                {loading ? 'Creating...' : 'Create Shop'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-manrope text-2xl">Add Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={addProduct} className="space-y-4">
              <div>
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  data-testid="product-name-input"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Product name"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  data-testid="product-description-input"
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Product description"
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-price">Price (₹)</Label>
                  <Input
                    id="product-price"
                    data-testid="product-price-input"
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="99.99"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="product-stock">Stock</Label>
                  <Input
                    id="product-stock"
                    data-testid="product-stock-input"
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    placeholder="100"
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="product-category">Category</Label>
                <Input
                  id="product-category"
                  data-testid="product-category-input"
                  required
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  placeholder="Groceries, Electronics, etc."
                  className="mt-2"
                />
              </div>
              <Button
                data-testid="submit-product-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShopDashboard;