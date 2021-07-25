export default (name = '') => {
  const changedName = Array.isArray(name) ? name[0] : name;
  return changedName
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');
};
