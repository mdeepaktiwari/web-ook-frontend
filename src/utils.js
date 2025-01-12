export const saveItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
