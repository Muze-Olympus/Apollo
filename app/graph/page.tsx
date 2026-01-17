"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';

// Dynamically import the graph component to avoid SSR issues
const GraphVisualization = dynamic(
  () => import('../components/GraphVisualization'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading graph visualization...</p>
        </div>
      </div>
    )
  }
);

export default function GraphPage() {
  const router = useRouter();
  const { user, logOut } = UserAuth();

  const handleGoBack = () => {
    router.back();
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Redirect if not authenticated
  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#252424] flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <h1 className="text-2xl font-bold text-white">Resource Graph Visualization</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="text-gray-300 text-sm">
                  Welcome, {user.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Graph Content */}
      <main className="flex-1 overflow-hidden">
        <GraphVisualization className="h-full" />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-6">
            <span>Interactive Resource Graph</span>
            <span>•</span>
            <span>Double-click nodes to focus</span>
            <span>•</span>
            <span>Drag to rearrange</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Powered by vis-network</span>
            <span>•</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}