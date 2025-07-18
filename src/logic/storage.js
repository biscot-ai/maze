export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('gameState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('gameState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
