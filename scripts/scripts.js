function login(){

  let userName = document.getElementById('userName').value;
  console.log(userName);
  let userPassword = document.getElementById('password').value;

  

  if (!userName || !userPassword){
    alert('debe ingresar nombre y una contraseña')
    return
  }

  let password = localStorage.getItem(userName);
  if (!password){
    alert('usuario no encontrado')
  }else if(password==userPassword){
    window.location.href='home.html'.low
  }else{
    alert('contraseña no valida')
  }
}


function registry(){
  let userName = document.getElementById('userName').value;
      console.log(userName);
      let userPassword = document.getElementById('password').value;

      

      if (!userName || !userPassword){
        alert('debe ingresar nombre y una contraseña')
        return
      }

      if(getItem(userName.toLowerCase())){
        alert('El usuario ya existe');
        return;
      }
      localStorage.setItem(userName.toLowerCase(),userPassword);
      window.location.href ='home.html';

      // let password = localStorage.getItem(userName);
      // if (!password){
      //   alert('usuario no encontrado')
      // }else if(password==userPassword){
      //   window.location.href='home.html'
      // }else{
      //   alert('contraseña no valida')
      // }
}


