// Credits: Bryan Jennings

function beginListening() {
    // for (let i = 0; i < 10; i++) {
    //     for (let j = 0 + (i * 200); j < 100 + (i * 200); j++) {
    //         setTimeout(function() {
    //             document.getElementById('micIcon').style.opacity = 1 - ((j - (i * 200)) * 0.01);
    //         }, 2.5 * j);
    //         setTimeout(function() {
    //             document.getElementById('micIcon').style.opacity = ((j - (i * 200)) * 0.01);
    //         }, 2.5 * (j + 100));
    //     }
    // }
    listeningInterval = setInterval(function() {
        for (let j = 0; j < 100; j++) {
            setTimeout(function() {
                document.getElementById('micIcon').style.opacity = 1 - (j * 0.01);
            }, 5 * j);
            setTimeout(function() {
                document.getElementById('micIcon').style.opacity = (j * 0.01);
            }, 5 * (j + 100));
        }
    }, 990);

    mediaRecorder = window.sessionStorage.getItem('mediaRecorder');

    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        window.sessionStorage.setItem('audio', audio);
    });

    mediaRecorder.start();
}

function endListening() {
    mediaRecorder = window.sessionStorage.getItem('mediaRecorder');
    audio = window.sessionStorage.getItem('audio');

    clearInterval(listeningInterval);

    mediaRecorder.stop();
    audio.play();
}
