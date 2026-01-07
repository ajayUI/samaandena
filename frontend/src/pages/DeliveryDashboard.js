import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { Truck, Package, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DeliveryDashboard = () => {
  const { user, getAuthHeader } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`, { headers: getAuthHeader() });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await axios.put(
        `${API}/orders/${orderId}/status?status=${newStatus}`,
        {},
        { headers: getAuthHeader() }
      );
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    assigned: 'bg-blue-100 text-blue-800',
    picked_up: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800'
  };

  const nextStatus = {
    assigned: 'picked_up',
    picked_up: 'delivered'
  };

  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const completedOrders = orders.filter(o => o.status === 'delivered');

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-manrope font-bold text-3xl md:text-4xl text-stone-900 mb-2">
            Delivery Agent Dashboard
          </h1>
          <p className="font-inter text-stone-600">Manage your delivery assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-blue-500" />
              <span className="text-sm text-stone-600">Active Deliveries</span>
            </div>
            <p className="font-manrope font-bold text-3xl text-stone-900">{activeOrders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-sm text-stone-600">Completed</span>
            </div>
            <p className="font-manrope font-bold text-3xl text-stone-900">{completedOrders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-6 h-6 text-primary" />
              <span className="text-sm text-stone-600">Total Orders</span>
            </div>
            <p className="font-manrope font-bold text-3xl text-stone-900">{orders.length}</p>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="mb-8">
          <h2 className="font-manrope font-bold text-2xl text-stone-900 mb-6">Active Deliveries</h2>
          {activeOrders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
              <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-600">No active deliveries</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  data-testid={`delivery-${order.id}`}
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
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-stone-700">Delivery Address</p>
                        <p className="text-sm text-stone-600">{order.delivery_address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-stone-700">Items</p>
                        <p className="text-sm text-stone-600">
                          {order.items.map(item => `${item.product_name} (x${item.quantity})`).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.status !== 'delivered' && nextStatus[order.status] && (
                    <Button
                      data-testid={`update-status-${order.id}`}
                      onClick={() => updateStatus(order.id, nextStatus[order.status])}
                      disabled={loading}
                      className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-full"
                    >
                      {order.status === 'assigned' && 'Mark as Picked Up'}
                      {order.status === 'picked_up' && 'Mark as Delivered'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Deliveries */}
        {completedOrders.length > 0 && (
          <div>
            <h2 className="font-manrope font-bold text-2xl text-stone-900 mb-6">Completed Deliveries</h2>
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <div
                  key={order.id}
                  data-testid={`completed-${order.id}`}
                  className="bg-stone-50 rounded-xl border border-stone-200 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-stone-500">Order ID: {order.id.slice(0, 8)}</p>
                      <p className="font-manrope font-bold text-lg text-stone-900">₹{order.total_amount}</p>
                      <p className="text-sm text-stone-600 mt-2">{order.delivery_address}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      DELIVERED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;