import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Store, Truck, Star, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

const Landing = () => {
  const features = [
    {
      icon: Store,
      title: 'Local Shops',
      description: 'Discover shops in your area offering fresh goods and daily essentials',
      gradient: 'from-green-400 to-green-600'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Local delivery agents ensure quick and reliable service',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: Star,
      title: 'Trusted Reviews',
      description: 'Community ratings help you make informed choices',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your order from shop to doorstep',
      gradient: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-500 to-orange-500 py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-manrope font-bold tracking-tight text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
                गांव की दुकान,
                <br />
                <span className="text-yellow-200">घर का सामान!</span>
              </h1>
              <p className="font-inter text-xl text-white leading-relaxed">
                Connect with local shops in your area. Order fresh goods and get them delivered by trusted community members.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button
                    data-testid="get-started-btn"
                    className="bg-white text-green-600 hover:bg-yellow-50 h-14 px-10 rounded-full shadow-2xl transition-all duration-300 active:scale-95 w-full sm:w-auto font-bold text-lg"
                  >
                    <ShoppingBag className="w-6 h-6 mr-2" />
                    Start Shopping
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button
                    data-testid="become-partner-btn"
                    className="bg-orange-500 hover:bg-orange-600 text-white h-14 px-10 rounded-full shadow-xl transition-all duration-300 w-full sm:w-auto font-bold text-lg"
                  >
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80"
                alt="Local shop with fresh vegetables"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-manrope font-bold text-4xl md:text-5xl bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent mb-4">
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
                className="bg-white rounded-3xl p-8 border-2 border-stone-100 hover:border-orange-200 transition-all duration-300 hover:shadow-2xl group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-manrope font-bold text-xl text-stone-900 mb-3">
                  {feature.title}
                </h3>
                <p className="font-inter text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-manrope font-bold text-4xl md:text-5xl text-stone-900 mb-4">
              Simple. Easy. Fast.
            </h2>
            <p className="font-inter text-lg text-stone-600">
              सिर्फ 3 स्टेप में - Just 3 Steps!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-100">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                  1
                </div>
                <h3 className="font-manrope font-bold text-2xl text-stone-900 mb-3">Browse Shops</h3>
                <p className="font-inter text-stone-600 leading-relaxed">Find local shops near you and browse their fresh products</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-100">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                  2
                </div>
                <h3 className="font-manrope font-bold text-2xl text-stone-900 mb-3">Place Order</h3>
                <p className="font-inter text-stone-600 leading-relaxed">Add items to cart and checkout with cash on delivery</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                  3
                </div>
                <h3 className="font-manrope font-bold text-2xl text-stone-900 mb-3">Get Delivered</h3>
                <p className="font-inter text-stone-600 leading-relaxed">Track your order and receive it at your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-manrope font-bold text-4xl md:text-5xl text-white">
            Ready to Get Started?
          </h2>
          <p className="font-inter text-xl text-white">
            Join thousands of users enjoying local shopping made easy
            <br />
            <span className="text-yellow-200 font-semibold">हजारों परिवार पहले से जुड़े हैं!</span>
          </p>
          <Link to="/auth">
            <Button
              data-testid="cta-signup-btn"
              className="bg-white text-green-600 hover:bg-yellow-50 h-16 px-12 rounded-full shadow-2xl transition-all duration-300 active:scale-95 text-xl font-bold"
            >
              <ShoppingBag className="w-6 h-6 mr-3" />
              Sign Up Free Today
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;