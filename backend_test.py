import requests
import sys
import json
from datetime import datetime

class SamaanDenaAPITester:
    def __init__(self, base_url="https://quickmart-141.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tokens = {}  # Store tokens for different user types
        self.users = {}   # Store user data
        self.shops = {}   # Store shop data
        self.products = {} # Store product data
        self.orders = {}  # Store order data
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, token=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if token:
            headers['Authorization'] = f'Bearer {token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, params=params)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, params=params)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json() if response.content else {}
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'test': name,
                'error': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test("Root API", "GET", "", 200)
        return success

    def test_user_registration(self):
        """Test user registration for all three roles"""
        roles = ['customer', 'shop_owner', 'delivery_agent']
        
        for role in roles:
            user_data = {
                "email": f"test_{role}@example.com",
                "password": "TestPass123!",
                "name": f"Test {role.replace('_', ' ').title()}",
                "phone": "+1234567890",
                "role": role,
                "location": {
                    "lat": 28.6139,
                    "lng": 77.2090,
                    "address": "New Delhi, India"
                }
            }
            
            success, response = self.run_test(
                f"Register {role}",
                "POST",
                "auth/register",
                200,
                data=user_data
            )
            
            if success and 'token' in response:
                self.tokens[role] = response['token']
                self.users[role] = response['user']
                print(f"   ✅ {role} registered with ID: {response['user']['id'][:8]}")
            else:
                print(f"   ❌ Failed to register {role}")
                return False
        
        return True

    def test_user_login(self):
        """Test user login for all roles"""
        roles = ['customer', 'shop_owner', 'delivery_agent']
        
        for role in roles:
            login_data = {
                "email": f"test_{role}@example.com",
                "password": "TestPass123!"
            }
            
            success, response = self.run_test(
                f"Login {role}",
                "POST",
                "auth/login",
                200,
                data=login_data
            )
            
            if success and 'token' in response:
                self.tokens[role] = response['token']
                print(f"   ✅ {role} logged in successfully")
            else:
                print(f"   ❌ Failed to login {role}")
                return False
        
        return True

    def test_get_user_profile(self):
        """Test getting user profile"""
        for role in ['customer', 'shop_owner', 'delivery_agent']:
            success, response = self.run_test(
                f"Get {role} profile",
                "GET",
                "auth/me",
                200,
                token=self.tokens[role]
            )
            if not success:
                return False
        return True

    def test_shop_creation(self):
        """Test shop creation by shop owner"""
        shop_data = {
            "name": "Test Local Store",
            "description": "A test store for groceries and daily essentials",
            "address": "123 Main Street, Test City",
            "phone": "+1234567890",
            "location": {
                "lat": 28.6139,
                "lng": 77.2090,
                "address": "New Delhi, India"
            }
        }
        
        success, response = self.run_test(
            "Create Shop",
            "POST",
            "shops",
            200,
            data=shop_data,
            token=self.tokens['shop_owner']
        )
        
        if success:
            self.shops['test_shop'] = response
            print(f"   ✅ Shop created with ID: {response['id'][:8]}")
        
        return success

    def test_get_shops(self):
        """Test getting all shops"""
        success, response = self.run_test(
            "Get All Shops",
            "GET",
            "shops",
            200
        )
        
        if success:
            print(f"   ✅ Found {len(response)} shops")
        
        return success

    def test_get_my_shops(self):
        """Test getting shop owner's shops"""
        success, response = self.run_test(
            "Get My Shops",
            "GET",
            "shops/owner/my-shops",
            200,
            token=self.tokens['shop_owner']
        )
        
        if success:
            print(f"   ✅ Shop owner has {len(response)} shops")
        
        return success

    def test_product_creation(self):
        """Test product creation"""
        if not self.shops:
            print("❌ No shops available for product creation")
            return False
            
        shop_id = self.shops['test_shop']['id']
        product_data = {
            "name": "Test Product",
            "description": "A test product for testing",
            "price": 99.99,
            "category": "Groceries",
            "stock": 100,
            "image_url": "https://example.com/product.jpg"
        }
        
        success, response = self.run_test(
            "Create Product",
            "POST",
            f"products?shop_id={shop_id}",
            200,
            data=product_data,
            token=self.tokens['shop_owner']
        )
        
        if success:
            self.products['test_product'] = response
            print(f"   ✅ Product created with ID: {response['id'][:8]}")
        
        return success

    def test_get_products(self):
        """Test getting products"""
        success, response = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        
        if success:
            print(f"   ✅ Found {len(response)} products")
        
        return success

    def test_get_shop_products(self):
        """Test getting products for a specific shop"""
        if not self.shops:
            print("❌ No shops available")
            return False
            
        shop_id = self.shops['test_shop']['id']
        success, response = self.run_test(
            "Get Shop Products",
            "GET",
            f"products?shop_id={shop_id}",
            200
        )
        
        if success:
            print(f"   ✅ Shop has {len(response)} products")
        
        return success

    def test_order_creation(self):
        """Test order creation by customer"""
        if not self.shops or not self.products:
            print("❌ No shops or products available for order creation")
            return False
            
        order_data = {
            "shop_id": self.shops['test_shop']['id'],
            "items": [
                {
                    "product_id": self.products['test_product']['id'],
                    "product_name": self.products['test_product']['name'],
                    "quantity": 2,
                    "price": self.products['test_product']['price']
                }
            ],
            "delivery_address": "456 Customer Street, Test City",
            "delivery_location": {
                "lat": 28.6139,
                "lng": 77.2090
            }
        }
        
        success, response = self.run_test(
            "Create Order",
            "POST",
            "orders",
            200,
            data=order_data,
            token=self.tokens['customer']
        )
        
        if success:
            self.orders['test_order'] = response
            print(f"   ✅ Order created with ID: {response['id'][:8]}")
        
        return success

    def test_get_orders(self):
        """Test getting orders for different user types"""
        for role in ['customer', 'shop_owner']:
            success, response = self.run_test(
                f"Get {role} Orders",
                "GET",
                "orders",
                200,
                token=self.tokens[role]
            )
            if not success:
                return False
            print(f"   ✅ {role} has {len(response)} orders")
        
        return True

    def test_get_delivery_agents(self):
        """Test getting delivery agents"""
        success, response = self.run_test(
            "Get Delivery Agents",
            "GET",
            "delivery-agents",
            200,
            token=self.tokens['shop_owner']
        )
        
        if success:
            print(f"   ✅ Found {len(response)} delivery agents")
        
        return success

    def test_assign_delivery_agent(self):
        """Test assigning delivery agent to order"""
        if not self.orders or not self.users:
            print("❌ No orders or delivery agents available")
            return False
            
        order_id = self.orders['test_order']['id']
        agent_id = self.users['delivery_agent']['id']
        
        success, response = self.run_test(
            "Assign Delivery Agent",
            "PUT",
            f"orders/{order_id}/assign",
            200,
            params={"agent_id": agent_id},
            token=self.tokens['shop_owner']
        )
        
        return success

    def test_update_order_status(self):
        """Test updating order status by delivery agent"""
        if not self.orders:
            print("❌ No orders available")
            return False
            
        order_id = self.orders['test_order']['id']
        
        success, response = self.run_test(
            "Update Order Status",
            "PUT",
            f"orders/{order_id}/status",
            200,
            params={"status": "picked_up"},
            token=self.tokens['delivery_agent']
        )
        
        return success

    def test_create_review(self):
        """Test creating a review"""
        if not self.shops:
            print("❌ No shops available for review")
            return False
            
        review_data = {
            "target_id": self.shops['test_shop']['id'],
            "target_type": "shop",
            "rating": 5,
            "comment": "Great shop with excellent service!"
        }
        
        success, response = self.run_test(
            "Create Review",
            "POST",
            "reviews",
            200,
            data=review_data,
            token=self.tokens['customer']
        )
        
        return success

    def test_get_reviews(self):
        """Test getting reviews"""
        if not self.shops:
            print("❌ No shops available")
            return False
            
        shop_id = self.shops['test_shop']['id']
        success, response = self.run_test(
            "Get Reviews",
            "GET",
            f"reviews/{shop_id}",
            200
        )
        
        if success:
            print(f"   ✅ Found {len(response)} reviews")
        
        return success

def main():
    print("🚀 Starting SamaanDena API Testing...")
    print("=" * 50)
    
    tester = SamaanDenaAPITester()
    
    # Test sequence
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("User Registration", tester.test_user_registration),
        ("User Login", tester.test_user_login),
        ("User Profile", tester.test_get_user_profile),
        ("Shop Creation", tester.test_shop_creation),
        ("Get All Shops", tester.test_get_shops),
        ("Get My Shops", tester.test_get_my_shops),
        ("Product Creation", tester.test_product_creation),
        ("Get All Products", tester.test_get_products),
        ("Get Shop Products", tester.test_get_shop_products),
        ("Order Creation", tester.test_order_creation),
        ("Get Orders", tester.test_get_orders),
        ("Get Delivery Agents", tester.test_get_delivery_agents),
        ("Assign Delivery Agent", tester.test_assign_delivery_agent),
        ("Update Order Status", tester.test_update_order_status),
        ("Create Review", tester.test_create_review),
        ("Get Reviews", tester.test_get_reviews)
    ]
    
    print(f"\n📋 Running {len(tests)} test categories...")
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            success = test_func()
            if not success:
                print(f"❌ {test_name} failed - stopping tests")
                break
        except Exception as e:
            print(f"❌ {test_name} crashed: {str(e)}")
            break
    
    # Print final results
    print(f"\n{'='*50}")
    print(f"📊 Test Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure.get('test', 'Unknown')}: {failure}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())