export function supplant(text, obj) {
  return text.replace(/{([^{}]*)}/g, (a, b) => {
    const r = obj[b];
    return typeof r === 'string' || typeof r === 'number' ? r : a;
  });
}

export function dayPeriod() {
  const d = new Date();
  const hour = d.getHours();
  if (hour < 5) {
    return 'Boa noite';
  }
  if (hour < 8) {
    return 'Bom dia';
  }
  if (hour < 12) {
    return 'Bom dia!';
  }
  if (hour < 18) {
    return 'Boa tarde';
  }
  return 'Boa noite';
}
