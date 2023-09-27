import { callMindeeApi } from "./mindee.mjs";

var video = document.querySelector("#camera");
var cameraAtiva = false; // Variável para rastrear o estado da câmera

// Função para alternar entre abrir e fechar a câmera
function toggleCamera() {
  if (cameraAtiva) {
    // Se a câmera estiver ativa, desative-a
    var tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    cameraAtiva = false;

    // Altere o texto do botão para "Abrir Câmera"
    document.querySelector("#openCamera").textContent = "Abrir Câmera";
  } else {
    // Se a câmera estiver desativada, ative-a
    navigator.mediaDevices
      .getUserMedia({ video: { width: 720, aspectRatio: 21 / 9, height: 300 } })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
    cameraAtiva = true;

    // Altere o texto do botão para "Fechar Câmera"
    document.querySelector("#openCamera").textContent = "Fechar Câmera";
  }
}

// Adicione um ouvinte de evento para o botão "Abrir/Fechar Câmera"
document.querySelector("#openCamera").addEventListener("click", () => {
  toggleCamera();
});

document.querySelector("#tirarFoto").addEventListener("click", () => {
  console.log("clicou");
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  var image = context.drawImage(video, 0, 0);
  image;

  var button = document
    .querySelector("submit-button")
    .addEventListener("click", () => {
      console.log("clicou");
    });
  button.onclick(console.log(callMindeeApi(button.href)));

  // Remover elementos antigos, se existirem
  var existingButton = document.querySelector("button");
  if (existingButton) {
    existingButton.remove();
  }

  document.body.appendChild(button);
});
