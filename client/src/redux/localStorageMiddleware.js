const localStorageMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem('news', JSON.stringify(state.news));
    return result;
};

export default localStorageMiddleware;
