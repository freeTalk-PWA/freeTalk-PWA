/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

window.onload = function() {
    document.getElementById('loader').style.display = 'none';

    url = new URL(window.location.href);

    window.sessionStorage.setItem('lang', url.searchParams.get('l') ? url.searchParams.get('l') : null);

    setTimeout(function() {
        if (window.sessionStorage.getItem('lang')) {
            if (window.sessionStorage.getItem('lang') === 'ar') {
                switchToArabic();
            } else if (window.sessionStorage.getItem('lang') === 'en') {
                switchToEnglish();
            } else if (window.sessionStorage.getItem('lang') === 'tr') {
                switchToTurkish();
            } else if (window.sessionStorage.getItem('lang') === 'zh') {
                switchToChinese();
            } else {
                switchToEnglish();
            }
        } else {
            switchToEnglish();
        }
    }, 50);
};

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

// Checking if this is running on a PC

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('entryForm').style.display = 'block';
    document.getElementById('QR.entryForm').src += window.location.href;
    document.getElementById('QR.PCBrowser').src += window.location.href;
} else {
    document.getElementById('body').style.backgroundColor = '#008230';
    document.getElementById('PCBrowser').style.display = 'block';
    document.getElementById('QR.PCBrowser').src += window.location.href;
    document.getElementById('QR.entryForm').src += window.location.href;
}

// Checking if this is running on iOS

const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    window.sessionStorage.setItem('os', 'iOS');

    return /ip(hone|od)/.test(userAgent);
};

// Checking if this is running in standalone mode

const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

if (isIos() && !isInStandaloneMode()) {
    setTimeout(function(){document.getElementById('snackbar').classList.add('show');}, 500);
}

function hide() {
    setTimeout(function(){document.getElementById('snackbar').classList.remove('show');}, 50);
    // setTimeout(function(){document.getElementById('snackbar').classList.add('hide');}, 50);
}

// Checking if this is running on Android

// ---

function switchToTheJoinForm() {
    setTimeout(function() {
        document.getElementById('entryForm').style.display = 'none';
        document.getElementById('joinForm').style.display = 'block';
    }, 25);

    if (window.sessionStorage.getItem('os') !== 'iOS') {
        setTimeout(function() {
            document.getElementById('QR_Canvas').innerHTML = `
                <!-- <input type="file" accept="image/*;capture=camera"> -->
                <video id="videoElement" class="p-1" muted autoplay></video>
            `;
        }, 25);
        setTimeout(function() {
            var video = document.getElementById('videoElement');

            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'environment'
                    }
                })
                    .then(function (stream) {
                        video.srcObject = stream;
                    })
                    .catch(function (errMsg) {
                        console.log(`Error: ${errMsg}`);
                    });
            }
        }, 50);
    } else {
        // setTimeout(function() {
        //     document.getElementById('QR_Canvas').innerHTML = `
        //         <input id="recorder" class="hidden" type="file" accept="audio/*" capture>
        //         <audio id="player" class="" controls></audio>
        //         <br />
        //         <button id="stop">Stop</button>
        //     `;

        //     // const recorder = document.getElementById('recorder');
        //     const player = document.getElementById('player');
        //     const stop = document.getElementById('stop');

        //     const handleSuccess = function(stream) {
        //         const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'});
        //         const recordedChunks = [];

        //         mediaRecorder.addEventListener('dataavailable', function(e) {if (e.data.size > 0) {recordedChunks.push(e.data);}});

        //         mediaRecorder.addEventListener('stop', function() {
        //             player.src = URL.createObjectURL(new Blob(recordedChunks));
        //         });

        //         stop.addEventListener('click', function() {mediaRecorder.stop();});

        //         mediaRecorder.start();
        //     };

        //     navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        //         .then(handleSuccess)
        //         .catch(function (errMsg) {console.log(`Error: ${errMsg}`);});

        //     // navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(stream) {
        //     //     if (window.URL) {
        //     //         player.srcObject = stream;
        //     //     } else {
        //     //         player.src = stream;
        //     //     }
        //     // });

        //     // navigator.mediaDevices.enumerateDevices().then((devices) => {
        //     //     devices = devices.filter((d) => d.kind === 'audioinput');
        //     // });

        //     // navigator.mediaDevices.getUserMedia({
        //     //     audio: {
        //     //         deviceId: devices[0].deviceId
        //     //     },
        //     //     video: false
        //     // }).then(handleSuccess);
        // }, 25);
    }
}

function switchBackToTheEntryForm() {
    setTimeout(function() {
        document.getElementById('joinForm').style.display = 'none';
        document.getElementById('entryForm').style.display = 'block';
    }, 50);

    if (window.sessionStorage.getItem('os') !== 'iOS') {
        setTimeout(function() {
            var video = document.getElementById('videoElement');

            var stream = video.srcObject;
            var tracks = stream.getTracks();

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.stop();
            }

            video.srcObject = null;
        }, 25);
    } else {
        // ---
    }
}
