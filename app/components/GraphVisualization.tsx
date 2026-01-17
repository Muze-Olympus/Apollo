"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone/umd/vis-network.min.js';
import { DataSet } from 'vis-data/standalone/umd/vis-data.min.js';
import { dummyGraphData, graphOptions, legendData } from '../../lib/dummyData';

interface GraphVisualizationProps {
  className?: string;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({ className }) => {
  const networkRef = useRef<HTMLDivElement>(null);
  const network = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [networkStats, setNetworkStats] = useState({
    nodes: 0,
    edges: 0,
    connected: false
  });

  useEffect(() => {
    if (networkRef.current) {
      // Create data sets
      const nodes = new DataSet(dummyGraphData.nodes);
      const edges = new DataSet(dummyGraphData.edges);
      
      const data = {
        nodes: nodes,
        edges: edges
      };

      // Initialize network
      network.current = new Network(networkRef.current, data, graphOptions);

      // Update stats
      setNetworkStats({
        nodes: nodes.length,
        edges: edges.length,
        connected: true
      });

      // Add event listeners
      network.current.on('click', (params: any) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const node = nodes.get(nodeId);
          setSelectedNode(node);
        } else {
          setSelectedNode(null);
        }
      });

      network.current.on('doubleClick', (params: any) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          network.current.focus(nodeId, {
            scale: 1.5,
            animation: {
              duration: 1000,
              easingFunction: 'easeInOutQuad'
            }
          });
        }
      });

      // Stabilization complete
      network.current.once('stabilizationIterationsDone', () => {
        network.current.setOptions({ physics: false });
      });
    }

    return () => {
      if (network.current) {
        network.current.destroy();
      }
    };
  }, []);

  const handleFitView = () => {
    if (network.current) {
      network.current.fit({
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      });
    }
  };

  const handleTogglePhysics = () => {
    if (network.current) {
      const currentPhysics = network.current.physics.physicsEnabled;
      network.current.setOptions({ physics: !currentPhysics });
    }
  };

  const handleLayoutChange = (layout: string) => {
    if (network.current) {
      switch (layout) {
        case 'hierarchical':
          network.current.setOptions({
            layout: {
              hierarchical: {
                enabled: true,
                direction: 'UD',
                sortMethod: 'directed',
                levelSeparation: 150,
                nodeSpacing: 100
              }
            }
          });
          break;
        case 'force':
          network.current.setOptions({
            layout: {
              hierarchical: {
                enabled: false
              }
            },
            physics: {
              enabled: true,
              barnesHut: {
                gravitationalConstant: -8000,
                centralGravity: 0.3,
                springLength: 95
              }
            }
          });
          break;
      }
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Controls Bar */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">Resource Graph</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>Nodes: {networkStats.nodes}</span>
              <span>Edges: {networkStats.edges}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                networkStats.connected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {networkStats.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFitView}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Fit View
            </button>
            <button
              onClick={handleTogglePhysics}
              className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
            >
              Toggle Physics
            </button>
            <select
              onChange={(e) => handleLayoutChange(e.target.value)}
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
            >
              <option value="force">Force Layout</option>
              <option value="hierarchical">Hierarchical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Graph Area */}
        <div className="flex-1 relative">
          <div 
            ref={networkRef} 
            className="w-full h-full bg-gray-900"
            style={{ minHeight: '600px' }}
          />
          
          {/* Loading overlay */}
          {!networkStats.connected && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Loading graph visualization...</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Legend and Node Details */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          {/* Legend */}
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">Legend</h3>
            <div className="space-y-2">
              {legendData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-300 text-sm">{item.type}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Node Details */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              {selectedNode ? 'Node Details' : 'Select a Node'}
            </h3>
            
            {selectedNode ? (
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide">Name</label>
                  <p className="text-white font-medium">{selectedNode.label}</p>
                </div>
                
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide">Type</label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedNode.color }}
                    ></div>
                    <p className="text-gray-300 capitalize">{selectedNode.group}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide">ID</label>
                  <p className="text-gray-300 font-mono text-sm">{selectedNode.id}</p>
                </div>
                
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-wide">Size</label>
                  <p className="text-gray-300">{selectedNode.size}</p>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <button className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Click on a node in the graph to view its details and relationships.
              </p>
            )}
          </div>

          {/* Graph Actions */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                Add Resource
              </button>
              <button className="w-full px-3 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-sm">
                Add Relationship
              </button>
              <button className="w-full px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm">
                Export Graph
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;