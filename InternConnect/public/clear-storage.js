// Clear localStorage on page load if needed
if (window.location.search.includes('clear=true')) {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = window.location.origin;
}
