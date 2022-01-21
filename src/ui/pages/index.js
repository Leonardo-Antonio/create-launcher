const type = document.getElementById("type");
const name = document.getElementById("name");
const category = document.getElementById("category");
const icon = document.getElementById("icon");
const app = document.getElementById("app");
const btn = document.getElementById("btn");
const btnCopy = document.getElementById("copy");

const { ipcRenderer } = require("electron");

btn.addEventListener("click", (e) => {
  let data = null;
  try {
    data = {
      type: type.value,
      name: name.value,
      category: category.value,
      icon: icon.files[0].path,
      app: app.files[0].path,
    };
  } catch (error) {
    alert("No se seleciono icono o el ejecutable");
  }

  if (data.name == "") {
    alert("Ingrese el nombre de la app");
    return;
  }

  ipcRenderer.send("create-launcher__app", data);
  ipcRenderer.on("created", (err, args) => {
    if (!args.isCorrect) {
      alert("no se logro crear el lanzador");
      return;
    }

    alert(args.message);
  });
});

btnCopy.addEventListener("click", (e) => {
  var content = document.getElementById("content").innerHTML;
  navigator.clipboard.writeText(content).then(() => {
    alert("Texto copiado");
  });
});
