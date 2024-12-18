"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';

export function Overview() {
  const data = [
    { name: "A", x: 1, y: 1, z: 1, w: 0, v: 5 }, // Top 20% contributes 80% of value
    { name: "B", x: 2, y: 10, z: 1, w: 0, v: 15 },
    { name: "C", x: 3, y: 20, z: 4, w: 0, v: 20 },
    { name: "D", x: 5, y: 30, z: 5, w: 0, v: 25 },
    { name: "E", x: 7, y: 45, z: 10, w: 1, v: 30 }, // Remaining 80% contributes 20% of value
    { name: "F", x: 13, y: 49, z: 14, w: 4, v: 35 },
    { name: "G", x: 21, y: 60, z: 17, w: 7, v: 35 },
    { name: "H", x: 34, y: 71, z: 19, w: 10, v: 35 },
    { name: "I", x: 55, y: 81.5, z: 20, w: 10, v: 40 },
    { name: "J", x: 89, y: 82, z: 20, w: 15, v: 50 },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data}>
      <CartesianGrid />
      <XAxis dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
       />
      <YAxis 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="y" stackId="a" fill="aqua" />
      <Bar dataKey="x" stackId="a" fill="green" />
      <Bar dataKey="v" stackId="a" fill="blue" />
      <Bar dataKey="z" stackId="a" fill="navy" />
      <Bar dataKey="w" stackId="a" fill="purple" />
    </BarChart>
    </ResponsiveContainer>
  );
};
