import React, { useRef, useEffect, useCallback } from 'react';
import { noise } from '../helpers/perlin';

const WIGGLE_NOISE_UNCORRELATE = .5;
const WIGGLE_ROOM = .3;
const PADDING = 40;
const TOP_PAD = 15;

const InkLeak = ({
  text, height, period, do_border, max_brush_density, 
  max_clear_density, fore_color, back_color, 
}) => {
  const canvas = useRef();
  noise.seed(Math.random());

  period = period || 1000;
  do_border = do_border || true;
  max_brush_density = max_brush_density || 5;
  max_clear_density = max_clear_density || .05;
  fore_color = fore_color || '#000000';
  back_color = back_color || '#FFFFFF';

  const root = Root({ do_border });
  const width = vectorizeText(text, root, height / (100 + TOP_PAD));

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
    max_clear_density, back_color, fore_color, width, 
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

const Node = (x_offset, scale, i, ax, ay, bx, by) => {
  const x = scale * ((ax + bx) / 2 + x_offset);
  const y = scale * ((ay + by) / 2 + TOP_PAD); 
  const dx = scale * (ax - bx);
  const dy = scale * (ay - by);
  const length = Math.sqrt(dx ** 2 + dy ** 2); 
  const angle = Math.atan(dy / dx);

  return {
    x, y, length, angle, 
    effective_x: x, 
    effective_y: y, 
    noise_phase: i * WIGGLE_NOISE_UNCORRELATE, 
    wiggle_size: length * WIGGLE_ROOM, 
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

let all_letters = 'qwertyuiopasdfghjklzxcvbnm ';
all_letters += all_letters.toUpperCase();
const vectorizeText = (text, root, scale) => {
  let x_offset = PADDING;
  let node_i = 0;
  for (const c of text) {
    if (! all_letters.includes(c)) continue;
    const letter = [...VERDANA[c]];
    const char_width = letter.shift();
    for (const _stroke of letter) {
      const stroke = [..._stroke];
      const do_close = stroke.shift() === CLOSE;
      const firstNode = Node(x_offset, scale, node_i++, ...stroke.shift());
      moveTo(root, firstNode);
      for (const node_coords of stroke) {
        brushTo(root, Node(x_offset, scale, node_i++, ...node_coords));
      }
      if (do_close) {
        link(root, root.lastNode, firstNode);
      }
    }
    x_offset += char_width;
  }
  return (x_offset + PADDING) * scale;
};

const OPEN = 'OPEN';
const CLOSE = 'CLOSE';
const VERDANA = {
  ' ': [
    33, 
  ],
  D: [
    79.75903,
    [
      CLOSE,
      [9.2, 4.8, 27.0, 18.2],
      [8.8, 75.2, 27.3, 61.7],
      [45.8, 74.3, 43.3, 60.4],
      [64.1, 65.1, 52.4, 54.0],
      [75.3, 40.5, 56.5, 41.2],
      [69.5, 20.2, 55.1, 30.8],
      [58.4, 9.8, 49.9, 23.4],
      [44.2, 5.5, 43.1, 19.9],
    ],
  ],
  C: [
    69.39759,
    [
      OPEN,
      [65.5, 9.3, 65.8, 27.0],
      [51.1, 4.5, 49.5, 17.7],
      [26.0, 6.6, 33.0, 20.2],
      [8.6, 22.3, 25.9, 30.4],
      [5.4, 43.0, 24.2, 42.3],
      [11.6, 62.0, 27.5, 53.6],
      [27.0, 74.0, 33.7, 60.4],
      [45.5, 76.1, 45.1, 63.1],
      [65.9, 69.9, 65.8, 52.8],
    ],
  ],
  P: [
    70.60241,
    [
      OPEN,
      [8.8, 75.2, 27.2, 75.4],
      [9.0, 4.8, 27.1, 17.7],
      [46.0, 5.5, 41.9, 18.6],
      [61.2, 11.9, 47.6, 23.5],
      [66.5, 27.6, 48.4, 29.8],
      [60.4, 43.7, 45.8, 34.9],
      [44.1, 52.2, 39.2, 39.0],
      [22.5, 52.2, 17.7, 38.6],
    ],
  ],
  B: [
    73.25301,
    [
      OPEN,
      [25.1, 32.8, 25.3, 44.8],
      [44.2, 33.7, 42.0, 45.2],
      [54.6, 36.5, 48.2, 46.7],
      [66.4, 44.3, 50.1, 49.3],
      [66.6, 62.8, 50.2, 56.5],
      [57.5, 71.7, 47.7, 59.5],
      [44.8, 74.8, 42.5, 61.6],
      [9.0, 74.9, 27.5, 61.6],
      [8.9, 4.8, 27.3, 18.2],
      [44.7, 4.8, 37.7, 17.8],
      [56.7, 8.3, 43.6, 19.5],
      [63.0, 14.7, 44.9, 21.1],
      [64.0, 26.4, 46.3, 25.9],
      [56.3, 35.1, 45.2, 28.8],
      [46.0, 39.6, 41.9, 31.3],
      [32.0, 41.0, 31.9, 32.7],
    ],
  ],
  N: [
    80.96385,
    [
      OPEN,
      [7.8, 74.5, 24.8, 74.9],
      [8.0, 4.8, 25.1, 27.8],
      [29.9, 4.9, 27.1, 31.1],
      [52.5, 39.9, 54.3, 74.6],
      [54.8, 43.0, 72.2, 74.5],
      [55.1, 5.2, 71.8, 5.1],
    ],
  ],
  Q: [
    81.80723,
    [
      CLOSE,
      [41.0, 16.9, 40.6, 3.9],
      [31.8, 19.5, 21.6, 8.4],
      [24.9, 31.2, 8.2, 25.2],
      [25.3, 47.3, 8.4, 55.7],
      [32.9, 60.6, 22.5, 72.3],
      [40.8, 62.9, 41.3, 76.0],
      [49.4, 61.0, 61.3, 71.2],
      [57.6, 50.8, 75.5, 54.2],
      [58.7, 33.6, 76.4, 28.1],
      [52.3, 20.4, 62.4, 8.8],
    ],
    [
      OPEN,
      [76.1, 80.5, 76.4, 93.5],
      [65.5, 82.7, 62.9, 95.3],
      [59.9, 81.4, 51.8, 93.6],
      [57.0, 78.4, 43.1, 88.4],
      [54.9, 68.1, 37.7, 70.5],
    ],
  ],
  q: [
    67.10843,
    [
      OPEN,
      [42.9, 21.8, 59.9, 21.9],
      [42.7, 94.1, 59.6, 94.6],
    ],
    [
      OPEN,
      [44.1, 24.7, 44.6, 36.1],
      [34.2, 21.2, 34.5, 32.8],
      [19.4, 22.7, 27.2, 35.4],
      [6.7, 37.5, 23.3, 42.4],
      [5.7, 59.0, 22.9, 54.9],
      [18.1, 74.9, 25.9, 60.8],
      [34.1, 74.5, 33.9, 63.6],
      [46.0, 67.8, 45.4, 58.3],
    ],
  ],
  w: [
    94.09638,
    [
      OPEN,
      [2.3, 22.0, 20.4, 22.0],
      [18.3, 74.8, 37.1, 74.8],
      [40.2, 21.8, 55.7, 21.8],
      [58.0, 74.6, 76.5, 75.3],
      [74.8, 21.9, 92.4, 22.2],
    ],
  ],
  e: [
    63.614456,
    [
      OPEN,
      [18.9, 41.7, 19.0, 51.9],
      [43.0, 41.6, 60.5, 51.4],
      [41.8, 34.7, 56.6, 30.4],
      [37.0, 31.6, 45.4, 22.0],
      [27.8, 31.9, 21.1, 23.1],
      [22.7, 36.6, 8.9, 32.7],
      [21.6, 41.3, 5.1, 41.7],
      [21.9, 53.6, 5.7, 58.6],
      [25.5, 60.0, 16.5, 71.0],
      [34.5, 63.7, 34.8, 76.5],
      [47.3, 63.4, 48.7, 74.7],
      [59.8, 57.6, 59.8, 71.8],
    ],
  ],
  r: [
    47.831326,
    [
      OPEN,
      [8.0, 21.8, 25.3, 22.3],
      [8.0, 74.7, 25.3, 74.5],
    ],
    [
      OPEN,
      [46.6, 22.2, 46.9, 38.9],
      [35.3, 23.6, 36.0, 37.0],
      [29.5, 26.4, 30.4, 38.0],
      [24.0, 30.7, 24.1, 40.7],
    ],
  ],
  t: [
    43.493977,
    [
      OPEN,
      [8.6, 7.0, 25.8, 7.0],
      [8.7, 63.5, 26.1, 60.0],
      [12.7, 70.8, 27.8, 62.7],
      [19.5, 74.6, 30.5, 63.9],
      [31.0, 75.9, 34.9, 64.3],
      [41.8, 74.1, 41.4, 62.2],
    ],
    [
      OPEN,
      [1.6, 21.9, 1.7, 33.6],
      [41.7, 21.8, 41.8, 33.5],
    ],
  ],
  y: [
    63.13253,
    [
      OPEN,
      [1.6, 21.8, 19.6, 22.2],
      [24.1, 78.3, 34.1, 60.8],
    ],
    [
      OPEN,
      [44.2, 21.8, 61.6, 21.8],
      [31.3, 59.0, 45.8, 61.0],
      [23.4, 71.3, 39.4, 76.9],
      [13.9, 94.2, 32.7, 94.2],
    ],
  ],
  u: [
    68.6747,
    [
      OPEN,
      [6.9, 21.9, 23.9, 22.3],
      [6.3, 61.9, 24.3, 55.1],
      [12.2, 72.0, 25.3, 59.8],
      [21.4, 76.3, 31.2, 62.3],
      [33.7, 74.8, 36.7, 62.7],
      [45.5, 67.5, 44.6, 58.3],
    ],
    [
      OPEN,
      [43.0, 22.4, 59.4, 22.0],
      [42.5, 75.1, 59.8, 74.9],
    ],
  ],
  i: [
    32.6506,
    [
      OPEN,
      [7.6, 22.2, 24.3, 22.7],
      [7.2, 74.8, 24.5, 74.8],
    ],
    [
      OPEN,
      [6.6, 2.3, 24.6, 2.0],
      [6.9, 14.8, 24.8, 14.7],
    ],
  ],
  o: [
    66.02409,
    [
      CLOSE,
      [26.1, 21.0, 28.4, 32.3],
      [12.4, 27.3, 23.1, 36.0],
      [4.3, 40.4, 21.4, 43.9],
      [4.9, 57.7, 22.0, 55.7],
      [14.6, 71.8, 24.5, 61.3],
      [28.9, 76.3, 31.3, 64.9],
      [42.8, 74.7, 38.6, 62.8],
      [56.3, 64.9, 43.1, 56.3],
      [60.7, 51.0, 44.2, 48.6],
      [56.5, 31.4, 41.6, 38.1],
      [47.5, 23.4, 36.6, 33.1],
      [38.0, 20.7, 33.0, 32.3],
    ],
  ],
  p: [
    67.22891,
    [
      OPEN,
      [7.0, 21.8, 24.6, 22.2],
      [6.9, 94.2, 24.2, 94.3],
    ],
    [
      OPEN,
      [21.7, 29.4, 21.2, 38.8],
      [35.8, 21.1, 32.3, 33.4],
      [52.0, 24.0, 40.8, 35.4],
      [61.1, 36.3, 44.0, 41.3],
      [61.4, 55.8, 44.2, 52.9],
      [52.7, 70.5, 41.8, 60.2],
      [41.6, 75.1, 36.7, 63.0],
      [31.3, 74.9, 30.6, 63.9],
      [21.1, 70.6, 20.6, 60.4],
    ],
  ],
  a: [
    63.975903,
    [
      OPEN,
      [7.6, 23.4, 7.8, 35.7],
      [26.7, 20.5, 25.7, 32.2],
      [42.3, 21.9, 34.6, 33.4],
      [50.7, 26.0, 38.2, 35.8],
      [55.7, 35.4, 39.0, 38.2],
      [56.0, 74.9, 38.9, 74.9],
    ],
    [
      OPEN,
      [43.1, 49.4, 42.8, 40.5],
      [24.8, 52.4, 20.1, 42.2],
      [21.0, 55.8, 8.4, 47.7],
      [20.7, 59.4, 3.4, 58.0],
      [21.8, 62.7, 8.3, 71.6],
      [25.5, 64.7, 24.5, 75.7],
      [32.9, 64.7, 33.4, 73.3],
      [41.7, 58.8, 42.4, 66.6],
    ],
  ],
  s: [
    56.26506,
    [
      OPEN,
      [51.1, 38.3, 50.7, 24.6],
      [38.4, 32.7, 37.8, 21.3],
      [27.6, 31.9, 23.3, 21.2],
      [21.8, 35.3, 14.3, 24.2],
      [21.7, 37.5, 4.7, 33.6],
      [23.7, 39.2, 5.5, 44.8],
      [25.9, 40.4, 13.1, 52.3],
      [41.0, 43.4, 33.0, 57.0],
      [49.2, 48.0, 35.7, 59.2],
      [52.9, 56.7, 35.8, 61.9],
      [48.1, 69.2, 33.7, 63.6],
      [35.2, 75.5, 31.1, 64.6],
      [20.6, 75.5, 21.7, 64.9],
      [11.2, 74.3, 12.5, 62.5],
      [3.6, 72.2, 3.6, 57.3],
    ],
  ],
  d: [
    66.50602,
    [
      OPEN,
      [42.5, 2.0, 59.5, 2.5],
      [42.7, 74.7, 60.0, 74.8],
    ],
    [
      OPEN,
      [45.5, 24.8, 45.9, 36.1],
      [36.5, 21.6, 36.7, 32.8],
      [24.5, 20.8, 29.4, 34.1],
      [12.7, 27.6, 24.6, 38.7],
      [5.4, 40.7, 22.4, 45.2],
      [4.7, 56.5, 23.1, 55.9],
      [12.0, 70.8, 25.5, 60.2],
      [21.4, 76.0, 28.9, 62.5],
      [33.5, 75.5, 33.5, 63.9],
      [44.8, 67.7, 45.2, 58.1],
    ],
  ],
  f: [
    39.879517,
    [
      OPEN,
      [42.7, 2.5, 42.8, 14.8],
      [32.7, 1.1, 32.7, 12.8],
      [21.3, 2.4, 28.7, 14.0],
      [12.2, 9.3, 26.6, 17.5],
      [9.6, 18.1, 26.0, 20.1],
      [9.4, 74.9, 26.7, 74.9],
    ],
    [
      OPEN,
      [2.5, 21.7, 2.5, 33.7],
      [38.9, 22.3, 39.5, 32.9],
    ],
  ],
  g: [
    66.26506,
    [
      OPEN,
      [43.7, 22.2, 60.6, 22.0],
      [43.5, 69.2, 60.2, 73.5],
      [41.9, 76.3, 57.1, 84.0],
      [38.4, 80.6, 43.9, 92.9],
      [31.8, 82.7, 31.3, 94.8],
      [10.5, 78.2, 10.8, 92.7],
    ],
    [
      OPEN,
      [46.0, 25.3, 46.0, 35.5],
      [34.5, 20.7, 34.3, 32.5],
      [19.6, 22.7, 27.5, 35.1],
      [7.1, 36.1, 23.6, 42.3],
      [5.3, 52.3, 23.0, 51.7],
      [10.6, 67.1, 24.8, 57.8],
      [20.4, 72.8, 30.1, 60.8],
      [35.5, 72.7, 36.9, 61.0],
      [48.1, 66.0, 46.6, 56.1],
    ],
  ],
  h: [
    67.46988,
    [
      OPEN,
      [9.4, 1.8, 27.2, 2.0],
      [9.5, 74.7, 27.2, 74.8],
    ],
    [
      OPEN,
      [24.9, 28.9, 26.1, 37.6],
      [36.0, 21.8, 35.2, 34.1],
      [47.3, 21.0, 42.7, 35.7],
      [59.0, 26.5, 44.9, 38.7],
      [62.8, 35.4, 45.5, 40.7],
      [63.1, 74.6, 45.9, 74.9],
    ],
  ],
  j: [
    42.289154,
    [
      OPEN,
      [7.6, 22.0, 7.7, 33.6],
      [34.7, 22.4, 17.7, 34.0],
      [34.8, 79.9, 17.0, 73.0],
      [28.0, 90.1, 16.0, 79.0],
      [19.3, 94.5, 13.3, 81.6],
      [9.9, 94.8, 9.0, 82.7],
      [0.6, 93.6, 0.5, 80.4],
    ],
    [
      OPEN,
      [15.8, 1.8, 15.8, 14.6],
      [34.7, 2.3, 34.7, 14.7],
    ],
  ],
  k: [
    63.73494,
    [
      OPEN,
      [6.3, 1.9, 24.3, 2.0],
      [7.0, 74.6, 24.6, 74.8],
    ],
    [
      OPEN,
      [42.0, 22.0, 61.3, 22.0],
      [22.4, 46.4, 40.6, 47.3],
      [20.0, 49.3, 28.4, 52.7],
      [17.5, 55.1, 23.6, 58.0],
    ],
    [
      OPEN,
      [43.3, 75.2, 62.9, 74.9],
      [27.5, 50.2, 41.6, 41.9],
    ],
  ],
  l: [
    32.168674,
    [
      OPEN,
      [7.6, 2.0, 24.5, 2.2],
      [7.5, 74.8, 24.5, 75.2],
    ],
  ],
  z: [
    56.98795,
    [
      OPEN,
      [5.2, 22.2, 5.4, 34.3],
      [53.3, 22.0, 31.2, 34.8],
      [53.4, 33.0, 4.5, 64.3],
      [27.1, 61.7, 4.2, 74.8],
      [53.5, 62.3, 54.0, 74.8],
    ],
  ],
  x: [
    65.3012,
    [
      OPEN,
      [1.7, 21.8, 22.4, 22.2],
      [43.5, 74.9, 63.7, 74.8],
    ],
    [
      OPEN,
      [43.7, 21.9, 63.6, 22.2],
      [1.9, 74.8, 21.2, 74.9],
    ],
  ],
  c: [
    56.26506,
    [
      OPEN,
      [53.4, 25.4, 53.5, 39.8],
      [40.2, 20.7, 39.9, 33.1],
      [25.8, 21.8, 29.4, 34.1],
      [13.3, 27.2, 23.5, 39.8],
      [5.9, 37.2, 21.8, 45.9],
      [3.7, 50.0, 21.8, 51.2],
      [7.7, 62.9, 22.7, 56.3],
      [18.7, 73.4, 26.1, 61.2],
      [33.1, 76.1, 34.0, 64.2],
      [45.1, 74.9, 42.9, 63.1],
      [53.4, 72.2, 48.9, 59.3],
      [53.1, 58.1, 50.7, 57.8],
    ],
  ],
  v: [
    62.771084,
    [
      OPEN,
      [1.3, 22.5, 19.2, 22.4],
      [21.7, 74.8, 31.0, 56.5],
      [41.1, 74.7, 32.2, 56.6],
      [61.0, 22.2, 43.7, 21.8],
    ],
  ],
  b: [
    66.86747,
    [
      OPEN,
      [7.5, 1.9, 24.6, 1.9],
      [7.2, 75.1, 24.5, 74.8],
    ],
    [
      OPEN,
      [21.0, 29.6, 21.6, 38.3],
      [32.9, 21.8, 32.4, 33.3],
      [45.4, 21.0, 39.8, 34.8],
      [56.9, 27.1, 43.0, 38.1],
      [62.0, 39.6, 44.6, 42.9],
      [62.0, 54.9, 44.8, 54.8],
      [57.0, 66.4, 42.4, 59.0],
      [48.0, 73.9, 39.5, 61.8],
      [38.7, 75.8, 35.8, 63.5],
      [30.6, 75.1, 30.5, 64.2],
      [21.4, 70.5, 21.7, 61.3],
    ],
  ],
  n: [
    67.951805,
    [
      OPEN,
      [7.6, 21.9, 24.3, 22.2],
      [7.7, 74.8, 24.5, 74.6],
    ],
    [
      OPEN,
      [22.2, 28.9, 22.9, 39.3],
      [35.7, 21.4, 32.4, 34.2],
      [47.0, 21.2, 38.6, 34.5],
      [54.5, 24.5, 42.0, 37.7],
      [60.6, 34.9, 43.3, 41.8],
      [60.4, 74.9, 43.6, 74.5],
    ],
  ],
  m: [
    103.253006,
    [
      OPEN,
      [7.3, 21.9, 25.1, 21.9],
      [7.5, 74.8, 25.4, 74.8],
    ],
    [
      OPEN,
      [23.6, 28.9, 23.6, 38.2],
      [32.2, 23.1, 31.3, 34.6],
      [42.4, 20.8, 39.0, 34.8],
      [48.2, 21.8, 40.8, 37.5],
      [51.4, 23.0, 42.3, 41.0],
      [54.3, 25.7, 42.5, 74.8],
      [57.5, 29.5, 59.2, 74.6],
      [58.6, 29.0, 59.6, 37.7],
      [63.4, 25.8, 65.7, 34.7],
      [70.5, 21.7, 70.5, 34.3],
      [79.0, 20.7, 74.6, 36.0],
      [87.0, 23.1, 76.3, 38.3],
      [91.7, 29.2, 76.4, 40.2],
      [94.1, 37.1, 76.5, 41.3],
      [94.1, 74.7, 76.9, 74.7],
    ],
  ],
};

export default InkLeak;