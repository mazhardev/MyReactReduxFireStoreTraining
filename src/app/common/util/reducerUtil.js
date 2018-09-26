
export const createReducer = (initialState, fnMap) => {
  return (state = initialState, { type, payLoad }) => {
    const handler = fnMap[type];
    return handler ? handler(state, payLoad) : state;
  };
};
