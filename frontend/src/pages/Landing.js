import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Store, Truck, Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const features = [
    {
      icon: Store,
      title: 'Local Shops',
      description: 'Discover shops in your area offering fresh goods and daily essentials'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Local delivery agents ensure quick and reliable service'
    },
    {
      icon: Star,
      title: 'Trusted Reviews',
      description: 'Community ratings help you make informed choices'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your order from shop to doorstep'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-stone-100 py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-manrope font-bold tracking-tight text-stone-900 text-4xl md:text-5xl lg:text-6xl leading-tight">
                Local Shops,
                <br />
                <span className="text-primary">Delivered to You</span>
              </h1>
              <p className="font-inter text-lg text-stone-600 leading-relaxed">
                Connect with local shops in your area. Order fresh goods and get them delivered by trusted community members.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button
                    data-testid="get-started-btn"
                    className="bg-primary text-white hover:bg-primary/90 h-12 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 w-full sm:w-auto"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button
                    data-testid="become-partner-btn"
                    className="bg-white border-2 border-stone-200 text-stone-700 hover:border-primary hover:text-primary h-12 px-8 rounded-full transition-all duration-300 w-full sm:w-auto"
                  >
                    Become a Partner
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1553019207-9c72c655e409?w=800&q=80"
                alt="Delivery agent on scooter"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-manrope font-bold text-3xl md:text-4xl text-stone-900 mb-4">
              Why Choose SamaanDena?
            </h2>
            <p className="font-inter text-lg text-stone-600 max-w-2xl mx-auto">
              Built for communities, by communities. We make local shopping convenient and reliable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`feature-card-${index}`}
                className="bg-white rounded-2xl p-8 border border-stone-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-manrope font-bold text-xl text-stone-900 mb-2">
                  {feature.title}
                </h3>
                <p className="font-inter text-stone-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-manrope font-bold text-3xl md:text-4xl text-stone-900 mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="font-manrope font-bold text-xl text-stone-900">Browse Shops</h3>
              <p className="font-inter text-stone-600">Find local shops near you and browse their products</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="font-manrope font-bold text-xl text-stone-900">Place Order</h3>
              <p className="font-inter text-stone-600">Add items to cart and checkout with cash on delivery</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="font-manrope font-bold text-xl text-stone-900">Get Delivered</h3>
              <p className="font-inter text-stone-600">Track your order and receive it at your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-green-600">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-manrope font-bold text-3xl md:text-4xl text-white">
            Ready to Get Started?
          </h2>
          <p className="font-inter text-lg text-white/90">
            Join thousands of users enjoying local shopping made easy
          </p>
          <Link to="/auth">
            <Button
              data-testid="cta-signup-btn"
              className="bg-white text-primary hover:bg-stone-50 h-12 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              Sign Up Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;