import { describe, it, expect } from 'vitest';
import generateMaze from './mazeGenerator';

describe('generateMaze', () => {
  it('should generate a maze with the correct dimensions', () => {
    const maze = generateMaze(21, 21);
    expect(maze.length).toBe(21);
    expect(maze[0].length).toBe(21);
  });

  it('should have a path from start to exit', () => {
    const maze = generateMaze(21, 21);
    const startNode = { x: 1, y: 1 };
    const exitNode = { x: 19, y: 19 };
    const path = findPath(startNode, exitNode, maze);
    expect(path).not.toBeNull();
  });
});

// Basic BFS to find a path
function findPath(start, end, grid) {
  const queue = [[start]];
  const visited = new Set([`${start.x}-${start.y}`]);

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    if (node.x === end.x && node.y === end.y) {
      return path;
    }

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dx, dy] of directions) {
      const x = node.x + dx;
      const y = node.y + dy;

      if (
        grid[y] &&
        grid[y][x] === 0 &&
        !visited.has(`${x}-${y}`)
      ) {
        visited.add(`${x}-${y}`);
        const newPath = [...path, { x, y }];
        queue.push(newPath);
      }
    }
  }

  return null;
}
