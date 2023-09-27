let cameraAtiva = false;

document.querySelector('#acessarCamera').addEventListener('click', () => {
    var video = document.querySelector('video');

    if (cameraAtiva) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        cameraAtiva = false;
    } else {
        navigator.mediaDevices.getUserMedia({ video: { width: 720, aspectRatio: 21/9, height: 300 } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            cameraAtiva = true;
        })
        .catch(error => {
            console.log(error);
        });
    }
});

document.querySelector('#tirarFoto').addEventListener('click', () => {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    var link = document.createElement('a');
    link.download = 'foto.png';
    link.href = canvas.toDataURL();
    link.textContent = 'Clique para baixar a imagem';

    // Remover elementos antigos, se existirem
    var existingLink = document.querySelector('a');
    if (existingLink) {
        existingLink.remove();
    }

    document.body.appendChild(link);
});
