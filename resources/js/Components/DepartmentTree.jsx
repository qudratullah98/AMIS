 import React, { useMemo } from "react";
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
const nodeWidth = 300;
const nodeHeight = 220;
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// ===============================
// Tree Layout Function
// ===============================
function getLayoutedElements(nodes, edges) {
    dagreGraph.setGraph({
        rankdir: "TB",
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
// Custom Department Node with Vacancy Info
// ===============================
function DepartmentNode({ data }) {
    console.log('Department positions:', data?.positions);
    
    // Calculate vacancy statistics for this department
    // Filter vacancies by status
    const allVacancies = data.positions?.flatMap(pos => pos.vacancies || []) || [];
    const occupiedVacancies = allVacancies.filter(v => v.status === 'Occupied');
    const vacantVacancies = allVacancies.filter(v => v.status === 'Vacant');
    
    const totalVacancies = allVacancies.length;
    const filledVacancies = occupiedVacancies.length;
    const availableVacancies = vacantVacancies.length;

    return (
        <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-4 w-[300px] hover:shadow-xl transition-shadow">
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
            
            {/* Vacancy Summary */}
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs bg-gray-50 p-2 rounded-lg">
                <div className="text-center">
                    <div className="font-semibold text-gray-700">{totalVacancies}</div>
                    <div className="text-gray-500">Total</div>
                </div>
                <div className="text-center">
                    <div className="font-semibold text-green-600">{filledVacancies}</div>
                    <div className="text-gray-500">Occupied</div>
                </div>
                <div className="text-center">
                    <div className="font-semibold text-orange-500">{availableVacancies}</div>
                    <div className="text-gray-500">Vacant</div>
                </div>
            </div>
            
            <div className="mt-3 border-t pt-2">
                 
                <div className="max-h-28 overflow-y-auto space-y-1">
                    {data.positions?.length > 0 ? (
                        data.positions.slice(0, 3).map((position) => {
                            // Filter vacancies for this position
                            const positionVacancies = position.vacancies || [];
                            const occupied = positionVacancies.filter(v => v.status === 'Occupied');
                            const vacant = positionVacancies.filter(v => v.status === 'Vacant');
                            const posTotal = positionVacancies.length;
                            const posFilled = occupied.length;
                            const posAvailable = vacant.length;
                            
                            return (
                                <div key={position.id} className="text-xs text-gray-600">
                                    <div className="flex justify-between items-center">
                                        <span className="truncate font-medium">• {position.title}</span>
                                        <div className="flex gap-1 flex-shrink-0">
                                            <span className="bg-blue-100 text-blue-700 px-1.5 rounded-full text-[10px]">
                                                {posTotal}
                                            </span>
                                            <span className="bg-green-100 text-green-700 px-1.5 rounded-full text-[10px]">
                                                {posFilled}
                                            </span>
                                            <span className={`px-1.5 rounded-full text-[10px] ${
                                                posAvailable > 0 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {posAvailable}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Show vacancy details if available */}
                                    {position.vacancies && position.vacancies.length > 0 && (
                                        <div className="ml-4 mt-0.5 space-y-0.5">
                                            {position.vacancies.slice(0, 2).map(vacancy => {
                                                const isOccupied = vacancy.status === 'Occupied';
                                                return (
                                                    <div key={vacancy.id} className="flex justify-between text-[10px] text-gray-400">
                                                        <span>{vacancy.vacancy_no}</span>
                                                        <span className={isOccupied ? 'text-green-500 font-medium' : 'text-orange-400 font-medium'}>
                                                            {isOccupied ? '✓ Occupied' : '○ Vacant'}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                            {position.vacancies.length > 2 && (
                                                <span className="text-[10px] text-gray-400">
                                                    +{position.vacancies.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
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
        <div
            className="department-tree bg-gray-50 rounded-lg"
            style={{ width: "100%", height: "750px" }}
        >
            <style>{`
                .department-tree .react-flow__attribution {
                    display: none !important;
                }
            `}</style>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                    includeHiddenNodes: true,
                }}
                minZoom={0.5}
                maxZoom={1.5}
            > 
            </ReactFlow>
        </div>
    );
}