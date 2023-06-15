/** 
* Debe funcionar solo con letras minúsculas
* No deben ser utilizados letras con acentos ni caracteres especiales
* Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.
* La página debe tener campos para inserción del texto que será encriptado o desencriptado, y el usuario debe poder escoger entre as dos opciones.
* El resultado debe ser mostrado en la pantalla.
*  Un botón que copie el texto encriptado/desencriptado para la sección de transferencia, o sea que tenga la misma funcionalidad del ctrl+C o de la opción "copiar" del menú de las aplicaciones.
-`La letra "e" es convertida para "enter"`
-`La letra "i" es convertida para "imes"`
-`La letra "a" es convertida para "ai"`
-`La letra "o" es convertida para "ober"`
-`La letra "u" es convertida para "ufat"`
 */
const encryptKeys = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
];
function encrypt() {
  const textarea = getTextarea(this);
  if(!textarea.value) {
    showError("El campo de texto está vacío 🤨");
    return;
  }
  const input = textarea.value;
  document.getElementById("output").value = input.replace(
    RegExp(encryptKeys.map((m) => m[0]).join("|"), "g"),
    function (match, offset, string) {
      return encryptKeys.find((f) => f[0] === match)[1];
    }
  );
  closeModal();
  setTypeAnimation(true);
}
function decrypt() {
  const textarea = getTextarea(this);
  const input = textarea.value;
  document.getElementById("output").value = input.replace(
    RegExp(encryptKeys.map((m) => m[1]).join("|"), "g"),
    function (match, offset, string) {
      return encryptKeys.find((f) => f[1] === match)[0];
    }
  );
  closeModal();
  setTypeAnimation(false);
}
function getTextarea(enviroment) {
  return enviroment.parentElement.closest("article").querySelector("textarea");
}
function copyText() {
  const textarea = getTextarea(this);
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      console.log("Texto copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
}
function closeModal(boolean) {
  document
    .querySelector(".container-modal")
    .classList.toggle("hidden", boolean);
}
function pasteToTextarea() {
  const textarea = getTextarea(this);
  navigator.clipboard
    .readText()
    .then(function (text) {
      textarea.value = text;
    })
    .catch(function (error) {
      console.error("Error al leer el portapapeles: ", error);
    });
}
function deleteTextarea() {
  const textarea = getTextarea(this);
  textarea.value = "";
}
document.querySelector("[data-close]").addEventListener("click", closeModal);
document.querySelector("[data-decrypt]").addEventListener("click", decrypt);
document.querySelector("[data-encrypt]").addEventListener("click", encrypt);
document
  .querySelector("[data-paste]")
  .addEventListener("click", pasteToTextarea);
document
  .querySelector("[data-delete]")
  .addEventListener("click", deleteTextarea);
document
  .querySelectorAll("[data-copy]")
  .forEach((f) => f.addEventListener("click", copyText));

addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    closeModal(true);
  }
});

document
  .querySelector('#pop-mesagge i[class*="xmark"]')
  .addEventListener("click", (e) => {
    e.target.parentElement.classList.add("animate__animated", "animate__hinge");
    setTimeout(()=>{
      e.target.parentElement.classList.add("hidden");
    }, 1000);
  });
function showError(mesagge) {
  document.querySelector("#pop-mesagge p")
    .innerHTML = mesagge;
    document.querySelector("#pop-mesagge").classList.remove("hidden");
}
function isEmpty(t) {
  if(!t.value) throw new Error("Está vacío el campo de texto.");
}