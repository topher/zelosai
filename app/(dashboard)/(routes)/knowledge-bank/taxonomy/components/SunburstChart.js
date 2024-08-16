import * as d3 from "d3";

function Sunburst(dataObj, {
    path,
    id = Array.isArray(dataObj) ? d => d.id : null,
    parentId = Array.isArray(dataObj) ? d => d.parentId : null,
    children,
    value,
    sort = (a, b) => d3.descending(a.value, b.value),
    label,
    title,
    link,
    linkTarget = "_blank",
    width = 640,
    height = 400,
    margin = 1,
    marginTop = margin,
    marginRight = margin,
    marginBottom = margin,
    marginLeft = margin,
    padding = 0,  // Removing padding to reduce white space
    startAngle = 0,
    endAngle = 2 * Math.PI,
    radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2,
    color = d3.interpolateRainbow,
    fill = "#ccc",
    fillOpacity = 0.85, // Increased opacity for better visibility
  } = {}) {

    const data = dataObj.data ? dataObj.data : dataObj;

    const wrappedData = {
        name: "root",
        children: Array.isArray(data) ? data : [data]
    };

    const root = path != null ? d3.stratify().path(path)(wrappedData)
        : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(wrappedData)
        : d3.hierarchy(wrappedData, children);

    value == null ? root.count() : root.sum(d => Math.max(0, value(d)));
    if (sort != null) root.sort(sort);
    d3.partition().size([endAngle - startAngle, radius])(root);

    if (color != null && root.children && root.children.length > 0) {
        color = d3.scaleSequential([0, root.descendants().length], color).unknown(fill);
        root.descendants().forEach((node, i) => node.colorIndex = i);
    }

    const arc = d3.arc()
        .startAngle(d => d.x0 + startAngle)
        .endAngle(d => d.x1 + startAngle)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 2 * padding / radius))
        .padRadius(radius / 2)
        .innerRadius(d => d.y0 * 1.2)  // Increase the inner radius to spread out the center text
        .outerRadius(d => d.y1 - padding);

    const svg = d3.create("svg")
        .attr("viewBox", [
          -width / 2,
          -height / 2,
          width,
          height
        ])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle");

    const cell = svg
      .selectAll("g")
      .data(root.descendants())
      .join("g")
        .attr("transform", d => `translate(${arc.centroid(d)})`);

    cell.append("path")
        .attr("d", arc)
        .attr("fill", d => {
            return color ? color(d.colorIndex) : fill;
        })
        .attr("fill-opacity", fillOpacity)
        .on("mouseover", function(event, d) {
           tooltip.html(`<strong>${d.data.name}</strong><br>Value: ${d.value}`)
               .style("visibility", "visible");
       })
       .on("mousemove", function(event) {
           tooltip.style("top", (event.pageY - 10) + "px")
               .style("left", (event.pageX + 10) + "px");
       })
       .on("mouseout", function() {
           tooltip.style("visibility", "hidden");
       });

    cell.append("text")
        .attr("transform", d => {
            const angle = (d.x0 + d.x1) / 2 * 180 / Math.PI - 90;
            const rotate = angle < 180 ? angle : angle + 180;
            return `rotate(${rotate}) translate(${(d.y0 + d.y1) / 2})`;
        })
        .attr("dy", "0.32em")
        .text(d => d.data.name.length > 10 ? `${d.data.name.slice(0, 10)}...` : d.data.name) // Truncate long names with ellipsis
        .style("fill", "#000")
        .style("font-size", "10px") // Adjust font size for better readability
        .style("text-anchor", "middle")
        .style("visibility", d => (d.x1 - d.x0) > 0.02 ? "visible" : "hidden"); // Ensure labels are only visible on sufficiently large segments

    return svg.node();
}

export { Sunburst };
