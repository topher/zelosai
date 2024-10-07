// components/tree-diagram.tsx

import * as d3 from "d3";

function TreeDiagram(dataObj, options = {}) {
  const {
    width = 800,
    height = 500,
    margin = { top: 20, right: 90, bottom: 30, left: 90 },
    color = "#999",
    strokeWidth = 1.5,
  } = options;

  // Define tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("text-align", "center")
    .style("padding", "8px")
    .style("font", "12px sans-serif")
    .style("background", "rgba(0, 0, 0, 0.7)")
    .style("color", "white")
    .style("border", "0px")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("visibility", "hidden");

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [margin.left, margin.top, width - margin.left - margin.right, height - margin.top - margin.bottom])
    .attr("style", "max-width: 100%; height: auto;");

  const g = svg.append("g");

  const root = d3.hierarchy(dataObj);

  const treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

  treeLayout(root);

  // Links
  g.selectAll(".link")
    .data(root.links())
    .join("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-width", strokeWidth)
    .attr("d", d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)
    );

  // Nodes
  const node = g.selectAll(".node")
    .data(root.descendants())
    .join("g")
    .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
    .attr("r", 5)
    .attr("fill", color)
    .on("mouseover", function(event, d) {
      tooltip.html(`<strong>${d.data.name}</strong><br>Depth: ${d.depth}`)
        .style("visibility", "visible");
    })
    .on("mousemove", function(event) {
      tooltip.style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
    });

  node.append("text")
    .attr("dy", 3)
    .attr("x", d => d.children ? -8 : 8)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);

  return svg.node();
}

export default TreeDiagram;
