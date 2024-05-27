"use client"
import { ResponsiveContainer } from "recharts"
import SunburstChart from './sunburst-chart';
import { data_categories} from "@/app/data"
import { convertToTree } from "@/lib/convert-to-tree"

const tree_data_categories = convertToTree(data_categories)

export function TaxonomySunburstOverview() {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <SunburstChart
        width={1200} // Increased width
        height={600} // Increased height
        data={tree_data_categories}
        // node={<MyCustomNode />} // Optional custom node styling
        nodePadding={30}
        margin={{
          left: 150,
          right: 150,
          top: 80,
          bottom: 80,
        }}
        link={{ stroke: '#2ca02c', strokeWidth: 2 }} // Thicker and darker links
      />
    </ResponsiveContainer>
  )
}
