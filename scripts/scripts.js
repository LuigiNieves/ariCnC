
const database = localStorage.getItem('database')

if (!database){
  localStorage.setItem('database','[]')
}


function login(){

  let userName = document.getElementById('userName').value;
  let userPassword = document.getElementById('password').value;

  

  if (!userName || !userPassword){
    alert('debe ingresar nombre y una contraseña')
    return
  }

  let database = JSON.parse(localStorage.getItem('database'));

  const user = database.find(user => user.userName == userName.toLowerCase() && user.userPassword == userPassword)

  if (!user){
    alert('Usuario o contraseña no validos')
    return
  }

  localStorage.setItem('userName', userName.toLowerCase())

    window.location.href='home.html'

}



function validarUsuario(username) {
  const regex = /^[A-Za-z][A-Za-z0-9_]{7,14}$/;
  return regex.test(username);
}

function validarContrasena(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!/%*?&])[A-Za-z\d@$!%/*?&]{12,20}$/;
  return regex.test(password);
}

function validarEmail(email){
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function registry(){
  let userName = document.getElementById('userName').value;
  let userEmail= document.getElementById('email').value;
  let userPassword = document.getElementById('password').value;
  let userVPassword = document.getElementById('vPassword').value;

  if (!userName || !userPassword || !userVPassword || !userEmail){
    alert('Debe diligenciar todos los campos')
    return
  }


  if(!validarUsuario(userName)){
    alert('El usuario no es valido')
    return
  }

  if(!validarContrasena(userPassword)){
    alert('La contraseña no es valida')
    return
  }

  if(!validarEmail(userEmail)){
    alert('El correo debe ser de la forma xxx@xxxx.xx')
    return
  }

  const database = JSON.parse(localStorage.getItem('database'))

  const userExists = database.find((user)=> user.userName === userName )

  if(userExists){
    alert('El usuario ya existe');
    return;
  }

  const newUser = {
    userName: userName.toLowerCase(),
    userPassword
  }

  database.push(newUser)

  localStorage.setItem('database',JSON.stringify(database));
  window.location.href ='home.html';

}


{
  luigi : 'Iphone777'
}



