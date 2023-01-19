window.onload = () => {
    $("#btnRepetir").click(() => {
        elegirPersona();
    })
    $("#btnRecargar").click(()=>{
        location.reload();
    })
}

let personas = [];

var contadorP = 0;
var contadorE = 0;
var contador;
cargarPersonas();



function elegirPersona() {
    let aleatorio = Math.floor(Math.random() * personas.length);
    let htmlPersonaBuscar = `<article class="col-3 persona">
    <div hidden id="personabuscada">${personas[aleatorio].id}</div>
    <p>${personas[aleatorio].nombre}</p>
    <img src="${personas[aleatorio].imagen}" alt="">
</article>`;
    iniciarcontador();

    $("#personar_buscar").html(htmlPersonaBuscar);
}

function mostrarPersonas() {

    let contenido = "";
    for (let index = 0; index < personas.length; index++) {
        const persona = personas[index];
        let arti = `<article id=${persona.id} class="col-md-1 col-sm-6 persona">
        <p>${persona.nombre}</p>
        <img src="${persona.imagen}" alt="">
    </article>`;
        contenido += arti;
    }
    $("#contenedorPersonas").html(contenido);
    elegirPersona();
}
function asociarEventos() {
    $(".persona").click((e) => {
        let id = e.currentTarget.id;
        let idBuscado = $("#personabuscada").text();
        if (id == idBuscado) {
            clearInterval(contador);
            let seg = $("#number").text();
            $("#number").text("Enhorabuena, has tardado " + seg + " seg.")
        }
    })
}
function iniciarcontador() {
    clearInterval(contador);
    var n = 0;
    var l = $("#number");
    contador = window.setInterval(function () {
        l.html(n);
        n++;
    }, 1000);
}

function cargarPersonas() {
    $.ajax({
        url: "https://randomuser.me/api",
        success: (datos) => {
            let person = datos.results[0];
            let persona = {};
            persona.nombre = person.name.first;
            persona.apellido = person.name.last;
            persona.genero = person.gender;
            persona.edad = person.dob.age;
            persona.imagen = person.picture.large;
            persona.pais = person.location.country;
            persona.ciudad = person.location.city;
            persona.id = person.login.uuid;
            //console.log(persona);
            personas.push(persona);
            contadorP++;
            if ((contadorP + contadorE) < 48) {
                cargarPersonas();
            } else {
                mostrarPersonas();
                asociarEventos();
            }
        },
        error: (err) => {
            console.log(err);
            contadorE++;
        }
    });


}
