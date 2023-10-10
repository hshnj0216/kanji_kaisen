import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

interface INode {
    data: string;
    children: INode[];
}

interface IKanjiDecompositionProps {
    kanjiTree: INode;
}

const KanjiDecomposition: FC<IKanjiDecompositionProps> = ({ kanjiTree }) => {
    const displayRef = useRef(null);

    useEffect(() => {
        const svg = d3.select(displayRef.current);
        const width = +svg.attr("width");
        const height = +svg.attr("height");

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-500))
            .force("center", d3.forceCenter(width / 2, height / 2));

        let root;
        console.log(`kanjiTree is: ${kanjiTree}`);
        root = d3.hierarchy(kanjiTree);
        root.dx = 10;
        root.dy = width / (root.height + 1);
        root.descendants().forEach((d, i) => {
            d.id = i;
            d._children = d.children;
            if (d.depth && d.data.data.length !== 7) d.children = null;
        });

        const update = (source) => {
            const nodes = root.descendants().reverse();
            const links = root.links();

            simulation.nodes(nodes);
            simulation.force("link").links(links);

            // Add drag behavior to nodes
            const drag = d3.drag()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                });


            // Create the link lines.
            const link = svg.selectAll('line')
                .data(links)
                .enter()
                .append('line')
                .style('stroke', '#999')
                .style('stroke-opacity', 0.8)
                .style('stroke-width', d => Math.sqrt(d.target.data.size));

            // Create the node groups.
            const nodeGroup = svg.selectAll('.node') // Select existing node groups (if any)
                .data(nodes)
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('id', d => `node-${d.id}`)
                .call(drag);

            // Create the node circles within the node groups.
            nodeGroup.append('circle')
                .attr('r', 30)
                .style('fill', '#69b3a2');

            // Append text to the node groups
            nodeGroup.append("text")
                .text(d => d.data.data) // Set the text content to the node's data property
                .attr("text-anchor", "middle")
                .attr("dy", "0.3em");

            // Update and restart the simulation.
            simulation.on("tick", () => {
                // Update the position of the node groups
                nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);

                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

            });

            simulation.alpha(1).restart();
        }



        update(root);
    }, [kanjiTree]);

    return (
        <div className="border border-slate-50 rounded w-full h-full bg-slate-900 p-5">
            <svg ref={displayRef} width="1080" height="500" className=" border-slate-50">

            </svg>
        </div>
    )
}

export default KanjiDecomposition;
