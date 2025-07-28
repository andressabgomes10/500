#!/usr/bin/env python3
"""
Script de debug para Railway
"""

import os
import sys

def debug_environment():
    """Debug do ambiente Railway"""
    print("=" * 50)
    print("🔍 RAILWAY DEBUG INFORMATION")
    print("=" * 50)
    
    print(f"Python version: {sys.version}")
    print(f"Current directory: {os.getcwd()}")
    
    print("\n📋 Environment Variables:")
    env_vars = ['PORT', 'MONGO_URL', 'DB_NAME', 'RAILWAY_ENVIRONMENT']
    for var in env_vars:
        value = os.environ.get(var, 'NOT SET')
        if 'MONGO' in var and value != 'NOT SET':
            # Mascarar senha
            value = value[:30] + "..." if len(value) > 30 else value
        print(f"  {var}: {value}")
    
    print(f"\n📁 Files in current directory:")
    try:
        files = os.listdir('.')
        for file in sorted(files):
            print(f"  - {file}")
    except Exception as e:
        print(f"  Error listing files: {e}")
    
    print(f"\n🔧 Testing imports:")
    try:
        import fastapi
        print(f"  ✅ FastAPI: {fastapi.__version__}")
    except Exception as e:
        print(f"  ❌ FastAPI: {e}")
    
    try:
        import uvicorn
        print(f"  ✅ Uvicorn: {uvicorn.__version__}")
    except Exception as e:
        print(f"  ❌ Uvicorn: {e}")
    
    try:
        import motor
        print(f"  ✅ Motor: {motor.version}")
    except Exception as e:
        print(f"  ❌ Motor: {e}")
    
    print("\n🚀 Testing server import:")
    try:
        import server
        print("  ✅ Server module imported successfully")
        print(f"  ✅ App object: {type(server.app)}")
    except Exception as e:
        print(f"  ❌ Server import failed: {e}")
        import traceback
        traceback.print_exc()
    
    print("=" * 50)

if __name__ == "__main__":
    debug_environment()