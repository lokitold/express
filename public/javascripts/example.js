var cargar = function () {
	$("#numero").keydown(validaNumeros);
	$("#numero").keyup(longCel);
	$("#numero").keypress(deshabilitarTecla);
	$("#siguiente").click(generadorCodigo);
	$(".codigo").keypress(longCodigo);
	$(".codigo").keydown(validaNumeros);
	$(".codigo").keyup(cambiaInput);
	$("#siguienteValidar").click(validarCodigo);
	$("#resend").click(reenviar);
	$("#siguienteRegistro").click(validarData);
	$(".datos").keyup(primeraMayuscula);
	$("#nombre").keypress(soloLetras);
	$("#apellidos").keypress(soloLetras);
	$("#cel").text(window.localStorage.getItem("celu"));
	$("#nombre-perfil").text(window.localStorage.getItem("nom"));
	$("#apellido-perfil").text(window.localStorage.getItem("ape"));
	$("#fecha").text(window.localStorage.getItem("fecha"));
	$("#addNote").click(subirFoto);
	$("#siguienteEditar").click(nuevaData);
	$("#clear").click(limpiarLocalStorage);
}

$(document).ready(cargar);
var validaNumeros = function (e) {
	var ascii = e.keyCode;
	if (ascii == 8 || ascii == 9 || (ascii >= 48 && ascii <= 57)) {
		return true;
	} else {
		return false;
	}
}
var longCel = function () {
	if ($(this).val().length == 9) {
		$("#siguiente").attr("href", "verificar-numero.html");
	} else {
		$("#siguiente").removeAttr("href");
	}
}

var deshabilitarTecla = function () {
	if ($(this).val().length < 9) {
		return true;
	} else {
		return false;
	}
}

var generadorCodigo = function (e) {
	e.preventDefault();
	var longitud = $("#numero").val().length;
	var numeroAleatorio = Math.floor(Math.random() * 900) + 99;
	if (longitud === 9) {
		window.localStorage.setItem("numberRandom", numeroAleatorio);
		swal({
			title: "Tu codigo aleatorio es : ",
			text: "LAB-" + localStorage.getItem("numberRandom"),
			type: "success",
			showCancelButton: false,
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function () {
			localStorage.setItem("celu", $("#numero").val());
			window.location.href = $("#siguiente").attr("href");
		});
	}
}


var reenviar = function (e) {
	e.preventDefault();
	var numeroAleatorio2 = Math.floor(Math.random() * 900) + 99;
	window.localStorage.setItem("numberRandom2", numeroAleatorio2);
	swal({
		title: "Tu codigo aleatorio es : ",
		text: "LAB-" + localStorage.getItem("numberRandom2"),
		timer: 2000,
		showConfirmButton: false
	});

	$(".codigo").val("");
	$(".codigo").eq(0).focus();

}

var longCodigo = function () {
	if ($(this).val().length === 0) {
		$("#siguiente").attr("href", "signup.html");
	} else {
		return false;
	}

}

var cambiaInput = function (e) {
	var long = $(this).val().length;
	if (long == 1) {
		$(this).next().focus();
	}
	if (e.keyCode == 8) {
		$(this).prev().focus();
	}
}

var validarCodigo = function () {
	var concatCode = $(".codigo").eq(0).val() + $(".codigo").eq(1).val() + $(".codigo").eq(2).val();
	if (concatCode === localStorage.getItem("numberRandom") || concatCode === localStorage.getItem("numberRandom2")) {
		$("#siguienteValidar").attr("href", "signup.html");
	} else if ($(".codigo").val().length == 0) {
		swal("Ingrese su código por favor")
	} else {
		$(".codigo").val("");
		$(".codigo").eq(0).focus();
		swal("Código inválido")
	}
}

var validarData = function () {
	var nombre = $("#nombre").val().trim().length;
	var apellidos = $("#apellidos").val().trim().length;
	var emailong = $("#email").val().trim().length;
	var email = $("#email").val().trim();
	var regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	var validacheck = $("#checkbox").is(":checked");

	if (nombre > 1 && nombre < 20 && apellidos > 1 && apellidos < 30 && emailong > 5 && emailong < 50 && regexEmail.test(email) && validacheck) {
		window.localStorage.setItem("nom", $("#nombre").val());
		window.localStorage.setItem("ape", $("#apellidos").val());
		$(this).attr("href", "geolocation.html");
	} else {
		swal({
			title: "Datos incorrectos",
			text: "Ingresa correctamente tu información",
			timer: 2000,
			showConfirmButton: false
		});
	}

}

var primeraMayuscula = function (e) {
	var dato = $(this).val();
	var letraMayuscula = dato.charAt(0).toUpperCase(); // Saca la primera letra y la vuelve Mayuscula
	// S //       +  Toda la palabra
	var concatenarDato = letraMayuscula + dato.substr(1, dato.length);
	$(this).val(concatenarDato);
}

var soloLetras = function (e) {
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
	especiales = "8-37-39-46";
	tecla_especial = false
	for (var i in especiales) {
		if (key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) == -1 && !tecla_especial) {
		return false;
	}
	var meses = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var f = new Date();
	var fecha = "JOINED " + meses[f.getMonth()].toUpperCase() + " " + f.getFullYear();
	inicio = localStorage.setItem("fecha", fecha);
}

var limpiarLocalStorage = function () {
	if (confirm("Seguro que deseas limpiar?")) {
		window.localStorage.clear();
		location.reload();
	}
	return false;
}

var subirFoto = function () {
	var foto = document.getElementById("file").files[0];
	var imgUrl;
	var reader = new FileReader();
	reader.onload = function (e) {
		var imgURL = reader.result;
		$('#imagen').prepend("<img class='editado' src=" + imgURL + "></p> </div>");
		var imagenCargada = $('#imagen').html();
		localStorage.setItem('imagenGuardada', imagenCargada);
		saveDataToLocalStorage(imgURL);
	}
	reader.readAsDataURL(foto);
	return false;
	
}

$('#imagen').html(localStorage.getItem('imagenGuardada'));

var nuevaData = function () {
	var nombre = $("#nombre").val().trim().length;
	var apellidos = $("#apellidos").val().trim().length;
	if (nombre > 1 && nombre < 20 && apellidos > 1 && apellidos < 30) {
		window.localStorage.setItem("nom", $("#nombre").val());
		window.localStorage.setItem("ape", $("#apellidos").val());
		$(this).attr("href", "geolocation.html");
	} else {
		swal({
			title: "Datos incorrectos",
			text: "Ingresa correctamente tu información",
			timer: 2000,
			showConfirmButton: false
		});
	}

}
