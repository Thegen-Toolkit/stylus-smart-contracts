"use client";

// import { useState, useEffect } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import Image from 'next/image'

import styles from '../page.module.css'
import axios from "axios";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
  // removeElements,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  NodeMouseHandler,
  NodeTypes,
  useReactFlow,
} from "reactflow";
 
import 'reactflow/dist/style.css';

// export async function generateMetadata(): Promise<Metadata> {
//   const frameTags = await getFrameMetadata(
//     `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`,
//   )
//   return {
//     other: frameTags,
//   }
// }

// const nodeTypes = { textUpdater: TextUpdaterNode, ifStatement: IfStatement, globalStateNode: GlobalStateNode };

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const initNodes: any = [
  {
    id: "a",
    data: { label: "Example Node" },
    position: { x: 250, y: 0 },
  },
  {
    id: "b",
    data: { label: "Node B" },
    position: { x: 100, y: 100 },
  },
  {
    id: "c",
    data: { label: "Node" },
    position: { x: 350, y: 100 },
  },
];

const initEdges: any = [
  {
    id: "a-b",
    source: "a",
    target: "b",
  },
];

export default function Dashboard() {

  const [noCodeMode, setNoCodeMode] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback((params: any) => setEdges(addEdge(params, edges)), [edges]);
  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge: any) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  useEffect(() => {
    const fetchDataAsync = async () => {
      // let frameJson = await axios.get(`https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/${story}`);
      const frameJson = await axios.post('http://localhost:3000/api/add', {
        "frame": {
      "name": "Test",
      "pages": [
        {
          "question": "What is your name?",
          "img": "https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/QmPgNFac9gNcNCu47JNNiqArRp28FQ8fNTcoMv7p5nw4VG",
          "options": ["Alice", "Bob", "Charlie"]
        },
        {
          "question": "Lots of programming today, it was ton of work!",
          "options": ["Red", "Green", "Blue"]
        },
        {
          "question": "What is your favorite food?",
          "img": "https://turquoise-blank-manatee-120.mypinata.cloud/ipfs/QmbJ2oA3vU89TFd5ejZ7mXFGHr9FUZG2FihjsZnuPT7UEH",
          "options": ["Pizza", "Pasta", "Salad"]
        }
      ],
      "correctOptions": ["Alice", "Green", "Salad"],
      "owner": "0xEB17c38ecE894A97c5cD0E5Be8a576F0f630450c"
    }
    });
      console.log('txhash', frameJson.data)
    };

    console.log('test')

    fetchDataAsync();
  }, []);

  return (
    <div className="w-screen bg-[#2d2d2d] text-gray-200 flex flex-row w-view h-screen">
    <div style={{ width: '100%', height: '100%' }}>
    <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onNodesDelete={onNodesDelete}
                onConnect={onConnect}
                // nodeTypes={nodeTypes}
                fitView
              >
                <Background />
                <Controls />
                {/* <MiniMap /> */}
              </ReactFlow>
              </div>
      </div>
  )
}
