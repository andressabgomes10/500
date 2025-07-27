#!/usr/bin/env python3
"""
Backend Test Suite for WhatsApp Business Integration
Tests all WhatsApp endpoints and functionality
"""

import requests
import json
import time
from datetime import datetime
import uuid

# Configuration
BACKEND_URL = "https://de415330-cf94-4151-b727-d7cea73052a7.preview.emergentagent.com"
WHATSAPP_SERVICE_URL = "http://localhost:3001"

class WhatsAppBackendTester:
    def __init__(self):
        self.backend_url = BACKEND_URL
        self.whatsapp_service_url = WHATSAPP_SERVICE_URL
        self.test_phone = "5511999887766"  # Test phone number
        self.test_results = []
        
    def log_test(self, test_name, success, details="", error=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "error": str(error) if error else None,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if error:
            print(f"   Error: {error}")
        print()

    def test_whatsapp_service_health(self):
        """Test if WhatsApp Node.js service is running"""
        try:
            response = requests.get(f"{self.whatsapp_service_url}/health", timeout=5)
            if response.status_code == 200:
                data = response.json()
                self.log_test(
                    "WhatsApp Service Health Check",
                    True,
                    f"Service running, connection status: {data.get('connection', 'unknown')}"
                )
                return True
            else:
                self.log_test(
                    "WhatsApp Service Health Check",
                    False,
                    f"HTTP {response.status_code}"
                )
                return False
        except Exception as e:
            self.log_test("WhatsApp Service Health Check", False, error=e)
            return False

    def test_whatsapp_status_endpoint(self):
        """Test GET /api/whatsapp/status"""
        try:
            response = requests.get(f"{self.backend_url}/api/whatsapp/status", timeout=10)
            if response.status_code == 200:
                data = response.json()
                self.log_test(
                    "GET /api/whatsapp/status",
                    True,
                    f"Status: {data.get('status', 'unknown')}, Connected: {data.get('connected', False)}"
                )
                return True
            else:
                self.log_test(
                    "GET /api/whatsapp/status",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("GET /api/whatsapp/status", False, error=e)
            return False

    def test_whatsapp_qr_endpoint(self):
        """Test GET /api/whatsapp/qr"""
        try:
            response = requests.get(f"{self.backend_url}/api/whatsapp/qr", timeout=10)
            if response.status_code == 200:
                data = response.json()
                has_qr = data.get('qr') is not None
                self.log_test(
                    "GET /api/whatsapp/qr",
                    True,
                    f"QR Code available: {has_qr}, Status: {data.get('status', 'unknown')}"
                )
                return True
            else:
                self.log_test(
                    "GET /api/whatsapp/qr",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("GET /api/whatsapp/qr", False, error=e)
            return False

    def test_whatsapp_message_processing(self):
        """Test POST /api/whatsapp/message - Simulate incoming WhatsApp message"""
        try:
            # Test help command
            message_data = {
                "phone_number": self.test_phone,
                "message": "ajuda",
                "message_id": f"test_{uuid.uuid4()}",
                "timestamp": int(time.time())
            }
            
            response = requests.post(
                f"{self.backend_url}/api/whatsapp/message",
                json=message_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                reply = data.get('reply', '')
                success = data.get('success', False)
                
                if success and 'comandos disponíveis' in reply.lower():
                    self.log_test(
                        "POST /api/whatsapp/message (help command)",
                        True,
                        "Help command processed correctly"
                    )
                    return True
                else:
                    self.log_test(
                        "POST /api/whatsapp/message (help command)",
                        False,
                        f"Unexpected response: {reply[:100]}..."
                    )
                    return False
            else:
                self.log_test(
                    "POST /api/whatsapp/message (help command)",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("POST /api/whatsapp/message (help command)", False, error=e)
            return False

    def test_support_ticket_creation(self):
        """Test support ticket creation via WhatsApp command"""
        try:
            # Test support ticket creation
            message_data = {
                "phone_number": self.test_phone,
                "message": "suporte: problema teste para verificar criação de ticket",
                "message_id": f"test_{uuid.uuid4()}",
                "timestamp": int(time.time())
            }
            
            response = requests.post(
                f"{self.backend_url}/api/whatsapp/message",
                json=message_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                reply = data.get('reply', '')
                success = data.get('success', False)
                
                if success and 'ticket de suporte criado' in reply.lower():
                    self.log_test(
                        "Support Ticket Creation",
                        True,
                        "Support ticket created successfully via WhatsApp"
                    )
                    return True
                else:
                    self.log_test(
                        "Support Ticket Creation",
                        False,
                        f"Unexpected response: {reply[:100]}..."
                    )
                    return False
            else:
                self.log_test(
                    "Support Ticket Creation",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("Support Ticket Creation", False, error=e)
            return False

    def test_my_tickets_command(self):
        """Test 'meus tickets' command"""
        try:
            message_data = {
                "phone_number": self.test_phone,
                "message": "meus tickets",
                "message_id": f"test_{uuid.uuid4()}",
                "timestamp": int(time.time())
            }
            
            response = requests.post(
                f"{self.backend_url}/api/whatsapp/message",
                json=message_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                reply = data.get('reply', '')
                success = data.get('success', False)
                
                if success and ('seus tickets' in reply.lower() or 'não possui tickets' in reply.lower()):
                    self.log_test(
                        "My Tickets Command",
                        True,
                        "My tickets command processed correctly"
                    )
                    return True
                else:
                    self.log_test(
                        "My Tickets Command",
                        False,
                        f"Unexpected response: {reply[:100]}..."
                    )
                    return False
            else:
                self.log_test(
                    "My Tickets Command",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("My Tickets Command", False, error=e)
            return False

    def test_send_whatsapp_message(self):
        """Test POST /api/whatsapp/send"""
        try:
            message_data = {
                "phone_number": self.test_phone,
                "message": "Mensagem de teste enviada via API"
            }
            
            response = requests.post(
                f"{self.backend_url}/api/whatsapp/send",
                json=message_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                success = data.get('success', False)
                
                if success:
                    self.log_test(
                        "POST /api/whatsapp/send",
                        True,
                        "Message sent successfully"
                    )
                    return True
                else:
                    self.log_test(
                        "POST /api/whatsapp/send",
                        False,
                        f"Send failed: {data.get('error', 'Unknown error')}"
                    )
                    return False
            else:
                self.log_test(
                    "POST /api/whatsapp/send",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("POST /api/whatsapp/send", False, error=e)
            return False

    def test_get_tickets_endpoint(self):
        """Test GET /api/whatsapp/tickets"""
        try:
            response = requests.get(f"{self.backend_url}/api/whatsapp/tickets", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "GET /api/whatsapp/tickets",
                        True,
                        f"Retrieved {len(data)} tickets"
                    )
                    return True
                else:
                    self.log_test(
                        "GET /api/whatsapp/tickets",
                        False,
                        f"Expected list, got: {type(data)}"
                    )
                    return False
            else:
                self.log_test(
                    "GET /api/whatsapp/tickets",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("GET /api/whatsapp/tickets", False, error=e)
            return False

    def test_get_customers_endpoint(self):
        """Test GET /api/whatsapp/customers"""
        try:
            response = requests.get(f"{self.backend_url}/api/whatsapp/customers", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(
                        "GET /api/whatsapp/customers",
                        True,
                        f"Retrieved {len(data)} customers"
                    )
                    return True
                else:
                    self.log_test(
                        "GET /api/whatsapp/customers",
                        False,
                        f"Expected list, got: {type(data)}"
                    )
                    return False
            else:
                self.log_test(
                    "GET /api/whatsapp/customers",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("GET /api/whatsapp/customers", False, error=e)
            return False

    def test_greeting_command(self):
        """Test greeting command"""
        try:
            message_data = {
                "phone_number": self.test_phone,
                "message": "oi",
                "message_id": f"test_{uuid.uuid4()}",
                "timestamp": int(time.time())
            }
            
            response = requests.post(
                f"{self.backend_url}/api/whatsapp/message",
                json=message_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                reply = data.get('reply', '')
                success = data.get('success', False)
                
                if success and 'bem-vindo' in reply.lower():
                    self.log_test(
                        "Greeting Command",
                        True,
                        "Greeting processed correctly"
                    )
                    return True
                else:
                    self.log_test(
                        "Greeting Command",
                        False,
                        f"Unexpected response: {reply[:100]}..."
                    )
                    return False
            else:
                self.log_test(
                    "Greeting Command",
                    False,
                    f"HTTP {response.status_code}: {response.text}"
                )
                return False
        except Exception as e:
            self.log_test("Greeting Command", False, error=e)
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting WhatsApp Backend Integration Tests")
        print("=" * 60)
        
        # Test WhatsApp service connectivity
        service_running = self.test_whatsapp_service_health()
        
        # Test all endpoints
        self.test_whatsapp_status_endpoint()
        self.test_whatsapp_qr_endpoint()
        self.test_whatsapp_message_processing()
        self.test_support_ticket_creation()
        self.test_my_tickets_command()
        self.test_greeting_command()
        
        # Only test send if service is running (requires WhatsApp connection)
        if service_running:
            self.test_send_whatsapp_message()
        
        self.test_get_tickets_endpoint()
        self.test_get_customers_endpoint()
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        print("\n📋 DETAILED RESULTS:")
        for result in self.test_results:
            status = "✅" if result['success'] else "❌"
            print(f"{status} {result['test']}")
            if result['error']:
                print(f"   Error: {result['error']}")
        
        return passed, total

if __name__ == "__main__":
    tester = WhatsAppBackendTester()
    passed, total = tester.run_all_tests()
    
    # Exit with appropriate code
    exit(0 if passed == total else 1)