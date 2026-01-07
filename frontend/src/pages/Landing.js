import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Store, Truck, Star, Clock, Heart, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SamaanDenaLogo } from '../components/Logo';

const Landing = () => {
  const features = [
    {
      icon: Store,
      title: 'Local Shops',
      description: 'Discover shops in your area offering fresh goods and daily essentials',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Local delivery agents ensure quick and reliable service',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Star,
      title: 'Trusted Reviews',
      description: 'Community ratings help you make informed choices',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your order from shop to doorstep',
      color: 'from-purple-400 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-400 via-green-500 to-orange-400 py-20 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Trusted by 1000+ Rural Families</span>
              </div>
              <h1 className="font-manrope font-bold tracking-tight text-white text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-lg">
                गांव की दुकान,
                <br />
                <span className="text-yellow-200">घर का सामान!</span>
              </h1>
              <p className="font-inter text-xl text-white/95 leading-relaxed drop-shadow">
                Connect with local shops in your area. Order fresh goods and get them delivered by trusted community members.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button
                    data-testid="get-started-btn"
                    className="bg-white text-green-600 hover:bg-yellow-50 h-14 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 w-full sm:w-auto font-bold text-lg"
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
                    <Heart className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80"
                  alt="Local shop with fresh vegetables"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <SamaanDenaLogo className="w-16 h-16" />
            </div>
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
                className="bg-gradient-to-br from-white to-stone-50 rounded-3xl p-8 border-2 border-stone-100 hover:border-orange-200 transition-all duration-300 hover:shadow-2xl group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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
            <div className="relative text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                  1
                </div>
                <h3 className="font-manrope font-bold text-2xl text-stone-900 mb-3">Browse Shops</h3>
                <p className="font-inter text-stone-600 leading-relaxed">Find local shops near you and browse their fresh products</p>
              </div>
              {/* Connecting arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-400 to-orange-400"></div>
            </div>
            <div className="relative text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 hover:border-orange-300">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                  2
                </div>
                <h3 className="font-manrope font-bold text-2xl text-stone-900 mb-3">Place Order</h3>
                <p className="font-inter text-stone-600 leading-relaxed">Add items to cart and checkout with cash on delivery</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-blue-400"></div>
            </div>
            <div className="text-center group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300">
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
      <section className="py-20 px-4 bg-gradient-to-br from-green-500 via-green-600 to-orange-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="font-manrope font-bold text-4xl md:text-5xl text-white drop-shadow-lg">
            Ready to Get Started?
          </h2>
          <p className="font-inter text-xl text-white/95 drop-shadow">
            Join thousands of users enjoying local shopping made easy
            <br />
            <span className="text-yellow-200 font-semibold">हजारों परिवार पहले से जुड़े हैं!</span>
          </p>
          <Link to="/auth">
            <Button
              data-testid="cta-signup-btn"
              className="bg-white text-green-600 hover:bg-yellow-50 h-16 px-12 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 text-xl font-bold"
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

export default Landing;