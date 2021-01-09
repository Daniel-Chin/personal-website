import React, { useRef, useEffect, useCallback } from 'react';
import { noise } from '../helpers/perlin';

const WIGGLE_NOISE_UNCORRELATE = 100;

const InkLeak = ({
  text, height, period, do_border, max_brush_density, 
  max_clear_density, fore_color, back_color, 
}) => {
  const canvas = useRef();
  noise.seed(Math.random());

  period = period || 1000;
  do_border = do_border || true;
  max_brush_density = max_brush_density || 15;
  max_clear_density = max_clear_density || .25;
  fore_color = fore_color || '#000000';
  back_color = back_color || '#FFFFFF';

  const root = Root({ do_border });

  const draw = useCallback((ctx, t) => {
    const phase = t % period;
    const progress = Math.max(1, phase / period * 2);
    root.edge_times = 1 + Math.floor(
      (1 - progress) * max_brush_density
    );
    const clear_density = progress * max_clear_density;

    ctx.strokeStyle = back_color;
    echoClear(ctx, width, height, clear_density);
    ctx.strokeStyle = fore_color;
    drawRoot(root, ctx);
  }, [
    root, height, period, max_brush_density, 
    max_clear_density, back_color, fore_color, 
  ]);

  useEffect(() => {
    const current = canvas.current;
    if (! current) return;
    const context = current.getContext('2d');
    let animation_frame_id;
    let _t = 0;

    const loop = (t) => {
      _t = t;
      draw(context, t);
      animation_frame_id = window.requestAnimationFrame(loop);
    };
    loop(_t);

    return () => {
      window.cancelAnimationFrame(animation_frame_id);
    };
  }, [draw]);

  return (
    <canvas 
      alt={text} ref={canvas} 
      width={width} height={height} 
    />
  );
};

const Node = (a, b) => {
  const x = ((a.x + b.x) / 2);
  const y = ((a.y + b.y) / 2); 
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const length = Math.sqrt(dx ** 2 + dy ** 2); 
  const angle = Math.atan(dy / dx);

  return {
    x, y, length, angle, 
    effective_x: x, 
    effective_y: y, 
    noise_phase: Math.random() * WIGGLE_NOISE_UNCORRELATE, 
    wiggle_size: length * .9, 
    wiggle_speed: 2,
  };
};

const wiggle = (node) => {
  if (node.wiggle_speed && (node.wiggle_speed !== 0)) {
    node.noise_phase += node.wiggle_speed * 0.01;
    const offset = (noise.perlin2(node.noise_phase, 0) - .5) * node.wiggle_size;
    node.effective_x = node.x + offset * Math.cos(node.angle);
    node.effective_y = node.y + offset * Math.sin(node.angle);
  }
};

const sample = (node) => {
  const beta = Math.random() * node.length - node.length * .5;
  return {
    x: node.effective_x + (beta * Math.cos(node.angle)), 
    y: node.effective_y + (beta * Math.sin(node.angle)), 
  };
}

const correlateNoise = (nodeA, nodeB) => {
  nodeB.noise_phase = nodeA.noise_phase;
};
const orientWith = (nodeA, nodeB) => {
  const perpendi = {
    x: nodeB.y - nodeA.y, 
    y: nodeA.x - nodeB.x, 
  }
  if (
    dotProduct(perpendi, unitVectorFromAngle(nodeA.angle))
    * dotProduct(perpendi, unitVectorFromAngle(nodeB.angle))
    < 0
  ) {
    nodeB.angle += Math.PI;
  }
};

const Edge = (nodeA, nodeB) => ({
  nodeA, nodeB, 
});

const drawEdge = (root, ctx, edge) => {
  let [node_0, node_1] = [edge.nodeA, edge.nodeB];
  let point = sample(node_0);
  ctx.moveTo(point.x, point.y);
  for (let _ = root.edge_times; _ > 0; _ --) {
    [node_0, node_1] = [node_1, node_0];
    point = sample(node_0);
    ctx.lineTo(point.x, point.y);
  }

  if (root.do_border) {
    const hori_a = edge.nodeA.length * Math.cos(edge.nodeA.angle) / 2;
    const vert_a = edge.nodeA.length * Math.sin(edge.nodeA.angle) / 2;
    const hori_b = edge.nodeB.length * Math.cos(edge.nodeB.angle) / 2;
    const vert_b = edge.nodeB.length * Math.sin(edge.nodeB.angle) / 2;
    ctx.moveTo(
      edge.nodeA.effective_x - hori_a, edge.nodeA.effective_y - vert_a, 
    );
    ctx.lineTo(
      edge.nodeB.effective_x - hori_b, edge.nodeB.effective_y - vert_b, 
    );
    ctx.moveTo(
      edge.nodeA.effective_x + hori_a, edge.nodeA.effective_y + vert_a, 
    );
    ctx.lineTo(
      edge.nodeB.effective_x + hori_b, edge.nodeB.effective_y + vert_b,
    );
  }
};

const Root = (options) => ({
  nodes: [], 
  edges: [],
  lastNode: null, 
  edge_times: 1,
  ...options, 
});

const link = (root, a, b) => {
  const edge = Edge(a, b);
  root.edges.push(edge);
  return edge;
};

const brushTo = (root, node, do_correlate_noise) => {
  if (do_correlate_noise) {
    correlateNoise(root.lastNode, node);
  }
  orientWith(root.lastNode, node);
  root.nodes.push(node);
  link(root, root.lastNode, node);
  root.lastNode = node;
  return node;
};
const moveTo = (root, node) => {
  root.nodes.push(node);
  root.lastNode = node;
  return node;
};

const drawRoot = (root, ctx) => {
  ctx.beginPath();
  root.nodes.forEach(wiggle);
  root.edges.forEach(drawEdge.bind(null, root, ctx));
  ctx.stroke();
};

const echoClear = (ctx, width, height, density) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  const times = Math.floor(density * height);
  for (let _ = 0; _ < times; _ ++) {
    ctx.lineTo(Math.random() * width, Math.random() * height);
  }
  ctx.stroke();
};

const unitVectorFromAngle = (angle) => (
  {
    x: Math.cos(angle), 
    y: Math.sin(angle), 
  }
);
const dotProduct = (a, b) => (
  a.x * b.x + a.y * b.y
);

const VERDANA = {};

export default InkLeak;
