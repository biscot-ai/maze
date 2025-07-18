// Maze generation using randomized depth-first search
const generateMaze = (width, height) => {
  const maze = Array(height).fill(0).map(() => Array(width).fill(1)); // 1 = wall, 0 = path

  const carvePassagesFrom = (cx, cy, grid) => {
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const nx = cx + dx * 2;
      const ny = cy + dy * 2;

      if (ny >= 0 && ny < height && nx >= 0 && nx < width && grid[ny][nx] === 1) {
        grid[cy + dy][cx + dx] = 0;
        grid[ny][nx] = 0;
        carvePassagesFrom(nx, ny, grid);
      }
    }
  };

  maze[1][1] = 0; // Start carving from a specific point
  carvePassagesFrom(1, 1, maze);

  // Create an exit
  maze[height - 2][width - 1] = 0;

  return maze;
};

export default generateMaze;
