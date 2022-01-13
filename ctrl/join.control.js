// Credits: Bryan Jennings

function beginListening() {
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

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);

                for (let track of stream.getTracks()) { track.stop(); }

                audio.play();
            });

            mediaRecorder.start();

            document.getElementById('micBtn').addEventListener('touchend', function() {
                clearInterval(listeningInterval);

                mediaRecorder.stop();
            });
        });
}
