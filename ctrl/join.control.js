// Credits: Bryan Jennings

function beginListening() {
    listeningInterval = setInterval(function () {
        for (let j = 0; j < 100; j++) {
            setTimeout(function () {
                document.getElementById('micIcon').style.opacity = 1 - (j * 0.01);
            }, 5 * j);
            setTimeout(function () {
                document.getElementById('micIcon').style.opacity = (j * 0.01);
            }, 5 * (j + 100));
        }
    }, 990);

    // if (window.sessionStorage.getItem('micAccess') === '0') {
    //     navigator.mediaDevices.getUserMedia({ audio: true })
    //         .then(stream => {
    //             document.getElementById('micIcon').style.display = 'block';
    //             document.getElementById('errMsg').innerHTML = '';

    //             window.sessionStorage.setItem('micAccess', 1);

    //             document.getElementById('micBtn').addEventListener('touchstart', beginListening);
    //             document.getElementById('errMsg').classList.add('hidden');

    //             for (let track of stream.getTracks()) { track.stop(); }
    //         }).catch(e => {
    //             const errMsg = 'Mic access was denied...';

    //             setTimeout(function () {
    //                 document.getElementById('micIcon').style.display = 'none';
    //                 document.getElementById('errMsg').innerHTML = '';

    //                 document.getElementById('errMsg').classList.remove('hidden');

    //                 for (let y = 0; y < errMsg.length; y++) {
    //                     setTimeout(function () {
    //                         document.getElementById('errMsg').innerHTML += errMsg[y];
    //                     }, 21 * y);
    //                 }
    //             }, 501);

    //             document.getElementById('micIcon').classList.add('unopaque');
    //             document.getElementById('micBtn').classList.add('disabled');

    //             console.log(e);
    //         });
    // }

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
                // const audio = new Audio(audioUrl);

                for (let track of stream.getTracks()) { track.stop(); }

                // audio.play();
            });

            mediaRecorder.start();

            document.getElementById('micBtn').addEventListener('touchend', function () {
                clearInterval(listeningInterval);

                mediaRecorder.stop();
            });
        });
}
