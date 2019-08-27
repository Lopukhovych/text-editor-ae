export const getLocalStorage = (key) => localStorage.getItem(key);

export const setLocaleStorage = (key, value) => {
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
    }
};
