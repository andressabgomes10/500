import React from 'react';

const EnvironmentDebug = () => {
  const envVars = {
    'import.meta.env.VITE_REACT_APP_BACKEND_URL': import.meta.env.VITE_REACT_APP_BACKEND_URL,
    'import.meta.env.REACT_APP_BACKEND_URL': import.meta.env.REACT_APP_BACKEND_URL,
    'import.meta.env.VITE_BACKEND_URL': import.meta.env.VITE_BACKEND_URL,
    'process.env.REACT_APP_BACKEND_URL': typeof window !== 'undefined' ? window.process?.env?.REACT_APP_BACKEND_URL : 'undefined'
  };

  const backendUrl = 
    import.meta.env.VITE_REACT_APP_BACKEND_URL ||
    import.meta.env.REACT_APP_BACKEND_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:8001";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔍 Environment Variables Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">📋 Current Environment Variables</h2>
          <div className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{key}</code>
                <span className={`text-sm px-2 py-1 rounded ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {value || '❌ undefined'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">🎯 Selected Backend URL</h2>
          <div className="bg-blue-100 border border-blue-200 rounded p-4">
            <code className="text-lg font-mono">{backendUrl}</code>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">🧪 Connection Test</h2>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={async () => {
              try {
                const response = await fetch(`${backendUrl}/api/`);
                const data = await response.json();
                alert(`✅ Success: ${JSON.stringify(data)}`);
              } catch (error) {
                alert(`❌ Error: ${error.message}`);
              }
            }}
          >
            Test Backend Connection
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          <h3 className="font-semibold text-yellow-800">💡 Para produção na Vercel:</h3>
          <p className="text-sm text-yellow-700 mt-2">
            Adicione uma dessas variáveis na Vercel → Settings → Environment Variables:
          </p>
          <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
            <li><code>REACT_APP_BACKEND_URL</code></li>
            <li><code>VITE_REACT_APP_BACKEND_URL</code></li>
            <li><code>VITE_BACKEND_URL</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentDebug;