window.addEventListener("load", () => {
  const form = document.querySelector("#formulario");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("correo");
  const pass = document.getElementById("pass");
  const passConfirma = document.getElementById("passConfirma");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validaCampos();
  });

  const validaCampos = () => {
    //capturar los valores ingresados por el usuario
    const nombreValor = nombre.value.trim();
    const apellidoValor = apellido.value.trim();
    const emailValor = email.value.trim();
    const passValor = pass.value.trim();
    const passConfirmaValor = passConfirma.value.trim();

    //validar nombre
    if (!nombreValor) {
      //console.log('CAMPO VACIO')
      validaFalla(nombre, "Campo vacío");
    } else {
      validaOk(nombre);
    }
    //validar apellido
    if (!apellidoValor) {
      //console.log('CAMPO VACIO')
      validaFalla(apellido, "Campo vacío");
    } else {
      validaOk(apellido);
    }
    //validando campo email
    if (!emailValor) {
      validaFalla(email, "Campo vacío");
    } else if (!validaEmail(emailValor)) {
      validaFalla(email, "El e-mail no es válido");
    } else {
      validaOk(email);
    }
    //validando campo password
    const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
    if (!passValor) {
      validaFalla(pass, "Campo vacío");
    } else if (passValor.length < 8) {
      validaFalla(pass, "Debe tener 8 caracteres cómo mínimo.");
    } else if (!passValor.match(er)) {
      validaFalla(pass, "Debe tener al menos una may., una min. y un núm.");
    } else {
      validaOk(pass);
    }

    //validando campo password Confirmación
    if (!passConfirmaValor) {
      validaFalla(passConfirma, "Confirme su Contraseña");
    } else if (passValor !== passConfirmaValor) {
      validaFalla(passConfirma, "La password no coincide");
    } else {
      validaOk(passConfirma);
    }
  };

  const validaFalla = (input, msje) => {
    const formControl = input.parentElement;
    console.log(formControl);
    const aviso = formControl.querySelector("p");
    aviso.innerText = msje;

    formControl.className = "form-control falla";
  };
  const validaOk = (input, msje) => {
    const formControl = input;
    formControl.className = "form-control ok";
  };

  const validaEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };
});
