
const store = {};

export const getState = async sessionId => {
  const state = store[sessionId];
  try {
    return JSON.parse(state);
  } catch (err) {
    return null;
  }
};

export const saveState = async (sessionId, state) => {
  store[sessionId] = JSON.stringify(state);
};
