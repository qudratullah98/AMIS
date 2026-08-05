import React, { useMemo, useEffect } from "react";
import dagre from "@dagrejs/dagre";
import {
    ReactFlow,
    Handle,
    Position,
    Controls,
    MiniMap,
    Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ===============================
// Dagre Configuration
// ===============================
const nodeWidth = 260;
const nodeHeight = 180;
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// ===============================
// Tree Layout Function
// ===============================
function getLayoutedElements(nodes, edges) {
    dagreGraph.setGraph({
        rankdir: "TB", // Top to Bottom
        ranksep: 150,
        nodesep: 100,
    });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: nodeWidth,
            height: nodeHeight,
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodePosition = dagreGraph.node(node.id);
        node.position = {
            x: nodePosition.x - nodeWidth / 2,
            y: nodePosition.y - nodeHeight / 2,
        };
    });

    return { nodes, edges };
}

// ===============================
// Custom Department Node
// ===============================
function DepartmentNode({ data }) {
    return (
        <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-4 w-[260px] hover:shadow-xl transition-shadow">
            <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
            
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-gray-800 truncate">
                    🏢 {data.name}
                </h3>
                {data.code && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {data.code}
                    </span>
                )}
            </div>
            
            {data.description && (
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {data.description}
                </p>
            )}
            
            <div className="mt-3 border-t pt-2">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                    Positions ({data.positions?.length || 0})
                </p>
                <div className="max-h-24 overflow-y-auto">
                    {data.positions?.length > 0 ? (
                        data.positions.slice(0, 3).map((position) => (
                            <div key={position.id} className="text-xs text-gray-600 mt-1 flex justify-between">
                                <span>• {position.title}</span>
                                <span className="bg-blue-100 text-blue-700 px-2 rounded-full">
                                    {position.total_positions}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 italic">No positions</p>
                    )}
                    {data.positions?.length > 3 && (
                        <p className="text-xs text-gray-400 mt-1">
                            +{data.positions.length - 3} more
                        </p>
                    )}
                </div>
            </div>
            
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
        </div>
    );
}

const nodeTypes = {
    department: DepartmentNode,
};

// ===============================
// Department Tree Component
// ===============================
export default function DepartmentTree({ departments = [] }) {
    const { nodes, edges } = useMemo(() => {
        if (!departments || departments.length === 0) {
            return { nodes: [], edges: [] };
        }

        // Create Nodes
        const nodes = departments.map((department) => ({
            id: department.id.toString(),
            type: "department",
            data: {
                id: department.id,
                name: department.name,
                code: department.code,
                description: department.description,
                positions: department.positions ?? [],
            },
            position: { x: 0, y: 0 },
        }));

        // Create Parent -> Child Connections
        const edges = departments
            .filter((department) => department.parent_id !== null)
            .map((department) => ({
                id: `edge-${department.parent_id}-${department.id}`,
                source: department.parent_id.toString(),
                target: department.id.toString(),
                type: "smoothstep",
                animated: false,
            }));

        // Apply Tree Layout
        return getLayoutedElements(nodes, edges);
    }, [departments]);

    if (!departments || departments.length === 0) {
        return (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No departments found</p>
            </div>
        );
    }

    return (
        <div style={{ width: "100%", height: "700px" }} className="bg-gray-50 rounded-lg">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ 
                    padding: 0.2,
                    includeHiddenNodes: false 
                }}
                minZoom={0.5}
                maxZoom={1.5}
            >
                <Background variant="dots" gap={12} size={1} />
                <Controls />
                <MiniMap 
                    nodeColor="#60A5FA"
                    maskColor="rgba(0,0,0,0.1)"
                />
            </ReactFlow>
        </div>
    );
}