const userName = localStorage.getItem('userName')

if (!userName) window.location.href = '/html/index.html'


document.querySelector('#userName').textContent = userName

