// Utility to open a new window for testing dual views
export const openDualView = (role: 'tutor' | 'trainee') => {
  const url = new URL(window.location.href);
  url.searchParams.set('role', role);
  window.open(url.toString(), `${role}_view`, 'width=800,height=900');
};