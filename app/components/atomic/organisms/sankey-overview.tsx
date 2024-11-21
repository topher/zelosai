"use client"

import { Bar, BarChart, ResponsiveContainer, Sankey, Tooltip, XAxis, YAxis } from "recharts"

const data0 = {
  nodes: [
    // Awareness Channels (source)
    { id: 0, name: "In-Store", type: "source" },
    { id: 1, name: "Social Media", type: "source" },
    { id: 2, name: "Ecommerce", type: "source" },

    // Triggers (midPoint)
    { id: 3, name: "Unique Artifact Post", type: "midPoint" },
    { id: 4, name: "Unique Artifact Display", type: "midPoint" },

    // AI Models Used (midPoint)
    { id: 5, name: "Recommendation Engine", type: "midPoint" },
    { id: 6, name: "Chat Personality", type: "midPoint" },
    { id: 7, name: "Conversational AI", type: "midPoint" },

    // Call to Actions (target)
    { id: 8, name: "Purchase", type: "target" },
    { id: 9, name: "Sign Up", type: "target" },
    { id: 10, name: "Like", type: "target" },
    { id: 11, name: "Comment", type: "target" },
    { id: 12, name: "Support", type: "target" },
  ],
  links: [
    // Awareness Channel -> Trigger
    { source: 0, target: 3, value: 12 },  // 12% of in-store customers activated by unique artifact post
    { source: 0, target: 4, value: 8 },   // 8% of in-store customers activated by unique artifact display
    { source: 1, target: 3, value: 25 },  // 25% of social media users activated by unique artifact post
    { source: 1, target: 4, value: 5 },   // 5% of social media users activated by unique artifact display
    { source: 2, target: 3, value: 18 },  // 18% of ecommerce visitors activated by unique artifact post
    { source: 2, target: 4, value: 10 }, // 10% of ecommerce visitors activated by unique artifact display

    // Trigger -> AI Model
    { source: 3, target: 5, value: 70 },  // 70% of post activations use recommendation engine
    { source: 3, target: 6, value: 20 },  // 20% of post activations use chat personality
    { source: 3, target: 7, value: 10 },  // 10% of post activations use conversational AI
    { source: 4, target: 5, value: 50 },  // 50% of display activations use recommendation engine
    { source: 4, target: 6, value: 30 },  // 30% of display activations use chat personality
    { source: 4, target: 7, value: 20 },  // 20% of display activations use conversational AI

    // AI Model -> CTA
    { source: 5, target: 8, value: 35 },  // 35% of recommendation engine interactions lead to purchase
    { source: 5, target: 9, value: 20 },  // 20% of recommendation engine interactions lead to sign up
    { source: 6, target: 10, value: 15 },  // 15% of chat personality interactions lead to like
    { source: 6, target: 11, value: 25 },  // 25% of chat personality interactions lead to comment
    { source: 6, target: 12, value: 10 },  // 10% of chat personality interactions lead to support request
    { source: 7, target: 8, value: 40 },  // 40% of conversational AI interactions lead to purchase
    { source: 7, target: 9, value: 30 },  // 30% of conversational AI interactions lead to sign up
    { source: 7, target: 11, value: 20 },  // 20% of conversational AI interactions lead to comment
  ]
};


export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={500}>
    <Sankey
      width={1200} // Increased width
      height={600} // Increased height
      data={data0}
      // node={<MyCustomNode />} // Optional custom node styling
      nodePadding={30}
      margin={{
        left: 150,
        right: 150,
        top: 80,
        bottom: 80,
      }}
      link={{ stroke: '#2ca02c', strokeWidth: 2 }} // Thicker and darker links
      >
      <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  )
}
