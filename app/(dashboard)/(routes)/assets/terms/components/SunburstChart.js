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
    width = 800,
    height = 500,
    margin = 1,
    marginTop = margin,
    marginRight = margin,
    marginBottom = margin,
    marginLeft = margin,
    padding = 1,
    startAngle = 0,
    endAngle = 2 * Math.PI,
    radius = Math.min(width - marginLeft - marginRight, height - marginTop - marginBottom) / 2,
    color = d3.interpolateRainbow,
    fill = "#ccc",
    fillOpacity = 0.85,
} = {}) {

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

    const arcGenerator = d3.arc()
        .startAngle(d => d.x0 + startAngle)
        .endAngle(d => d.x1 + startAngle)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 2 * padding / radius))
        .padRadius(radius / 2)
        .innerRadius(d => d.y0)
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
      .data(root.descendants().filter(d => d.depth > 0)) // Exclude root node
      .join("g");

    // Append paths
    cell.append("path")
        .attr("d", arcGenerator)
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
        })
        .on("click", function(event, d) {
           zoom(d);
        });

    // Append labels
    // Append labels with perpendicular rotation and centered within the sector
    cell.append("text")
        .attr("transform", d => {
            const angle = (d.x0 + d.x1) / 2; // Midpoint angle in radians
            const r = (d.y0 + d.y1) / 2; // Midpoint radius
            const x = r * Math.cos(angle - Math.PI / 2); // Adjust angle by -90 degrees to start from top
            const y = r * Math.sin(angle - Math.PI / 2);

            // Rotate text perpendicular to the radial direction and center it
            const rotate = angle * 180 / Math.PI; // Convert radians to degrees
            return `translate(${x},${y}) rotate(${rotate})`; // Rotate by 90 degrees from the radial line
        })
        .attr("dy", "0.35em")
        .style("text-anchor", "middle") // Center text horizontally
        .style("font-size", d => {
            const angularWidth = d.x1 - d.x0;
            const size = Math.min(12, angularWidth * 150);
            return size < 8 ? "0" : `${size}px`; // Hide text if too small
        })
        .style("alignment-baseline", "middle") // Center vertically
        .style("fill", "#000")
        .style("pointer-events", "none") // Prevent text from capturing mouse events
        .text(d => {
            if ((d.x1 - d.x0) > 0.02) { // Only show text for larger segments
                return d.data.name.length > 15 ? `${d.data.name.slice(0, 15)}...` : d.data.name;
            }
            return "";
        });



    // Append a circle to allow zooming out
    svg.append("circle")
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", () => zoom(root));

    // Zoom function
    function zoom(d) {
        const focus = d;

        const transition = svg.transition()
            .duration(750)
            .tween("scale", () => {
                const xd = d3.interpolate(root.x0, focus.x0);
                const yd = d3.interpolate(root.y0, focus.y0);
                const yr = d3.interpolate(root.y1, focus.y1);
                return t => {
                    root.x0 = xd(t);
                    root.y0 = yd(t);
                    root.y1 = yr(t);
                };
            });

        cell.selectAll("path")
            .transition(transition)
            .attrTween("d", function(d) {
                return function(t) {
                    return arcGenerator(d);
                };
            });

        cell.selectAll("text")
            .transition(transition)
            .attrTween("transform", function(d) {
                return function(t) {
                    const angle = (d.x0 + d.x1) / 2; // Radians
                    const r = (d.y0 + d.y1) / 2; // Midpoint radius
                    const x = r * Math.cos(angle - Math.PI / 2); // Adjust angle by -90 degrees to start from top
                    const y = r * Math.sin(angle - Math.PI / 2);
                    return `translate(${x},${y})`;
                };
            })
            .styleTween("font-size", function(d) {
                return function(t) {
                    const angularWidth = d.x1 - d.x0;
                    const size = Math.min(12, angularWidth * 150);
                    return size < 8 ? "0" : `${size}px`;
                };
            });
    }

    return svg.node();
}

export { Sunburst };
