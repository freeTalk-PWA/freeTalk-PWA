/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

window.onload = function() {
    document.getElementById('loader').style.display = 'none';

    url = new URL(window.location.href);

    window.sessionStorage.setItem('micAccess', 0);
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
    var joinNickname = document.getElementById('join-nickname').placeholder || window.sessionStorage.getItem('join-nickname');

    document.getElementById('join-nickname').placeholder = '';

    window.sessionStorage.setItem('channel-name', document.getElementById('channel-name').placeholder);

    for (let i = document.getElementById('channel-name').placeholder.length; i > 0; i--) {
        setTimeout(function() {
            document.getElementById('channel-name').placeholder = document.getElementById('channel-name').placeholder.substring(0, document.getElementById('channel-name').placeholder.length - 1);
        }, Math.floor(Math.random() * (200 - 40) + 40));
    }

    window.sessionStorage.setItem('nickname', document.getElementById('nickname').placeholder);

    for (let j = document.getElementById('nickname').placeholder.length; j > 0; j--) {
        setTimeout(function() {
            document.getElementById('nickname').placeholder = document.getElementById('nickname').placeholder.substring(0, document.getElementById('nickname').placeholder.length - 1);
        }, Math.floor(Math.random() * (200 - 40) + 40));
    }

    setTimeout(function() {
        document.getElementById('topSectionInstructions').style.opacity = null;
        document.getElementById('otherOptions').style.opacity = null;
        document.getElementById('createAFreequencyBtn').style.opacity = null;
        document.getElementById('qrScanBox').style.opacity = null;
        document.getElementById('topSectionInstructions').classList.add('unopaque');
        document.getElementById('otherOptions').classList.add('unopaque');
        document.getElementById('createAFreequencyBtn').classList.add('unopaque');
        document.getElementById('qrScanBox').classList.add('unopaque');
    }, 75);

    setTimeout(function() {
        document.getElementById('entryForm').style.display = 'none';
        document.getElementById('joinForm').style.display = 'block';

        for (let x = 0; x < 100; x++) {
            setTimeout(function() {
                document.getElementById('joinTopSectionInstructions').style.opacity = x * 0.01;
                document.getElementById('switchBackToTheEntryLink').style.opacity = x * 0.01;
                document.getElementById('micBtn').style.opacity = x * 0.01;
            }, 5 * x);
        }

        document.getElementById('joinTopSectionInstructions').classList.remove('unopaque');
        document.getElementById('switchBackToTheEntryLink').classList.remove('unopaque');
        document.getElementById('micBtn').classList.remove('unopaque');
    }, 420);

    setTimeout(function() {
        if (window.sessionStorage.getItem('micAccess') === '0') {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    document.getElementById('micIcon').style.display = 'block';
                    document.getElementById('errMsg').innerHTML = '';

                    window.sessionStorage.setItem('micAccess', 1);

                    document.getElementById('micBtn').addEventListener('touchstart', beginListening);
                    document.getElementById('errMsg').classList.add('hidden');

                    for (let track of stream.getTracks()) { track.stop(); }
                }).catch(e => {
                    const errMsg = 'Mic access was denied...';

                    setTimeout(function() {
                        document.getElementById('micIcon').style.display = 'none';
                        document.getElementById('errMsg').innerHTML = '';

                        document.getElementById('errMsg').classList.remove('hidden');

                        for (let y = 0; y < errMsg.length; y++) {
                            setTimeout(function() {
                                document.getElementById('errMsg').innerHTML += errMsg[y];
                            }, 21 * y);
                        }
                    }, 501);

                    document.getElementById('micIcon').classList.add('unopaque');
                    document.getElementById('micBtn').classList.add('disabled');

                    console.log(e);
                });
        }

        for (let k = 0; k < joinNickname.length; k++) {
            setTimeout(function() {
                document.getElementById('join-nickname').placeholder += joinNickname[k];
            }, 21 * k);
        }
    }, 480);
}

function switchBackToTheEntryForm() {
    var channelNickname = document.getElementById('channel-name').placeholder || window.sessionStorage.getItem('channel-name');
    var nickname = document.getElementById('nickname').placeholder || window.sessionStorage.getItem('nickname');

    document.getElementById('channel-name').placeholder = '';
    document.getElementById('nickname').placeholder = '';

    window.sessionStorage.setItem('join-nickname', document.getElementById('join-nickname').placeholder);

    for (let i = document.getElementById('join-nickname').placeholder.length; i > 0; i--) {
        setTimeout(function() {
            document.getElementById('join-nickname').placeholder = document.getElementById('join-nickname').placeholder.substring(0, document.getElementById('join-nickname').placeholder.length - 1);
        }, Math.floor(Math.random() * (200 - 40) + 40));
    }

    setTimeout(function() {
        document.getElementById('joinTopSectionInstructions').style.opacity = null;
        document.getElementById('switchBackToTheEntryLink').style.opacity = null;
        document.getElementById('micBtn').style.opacity = null;
        document.getElementById('joinTopSectionInstructions').classList.add('unopaque');
        document.getElementById('switchBackToTheEntryLink').classList.add('unopaque');
        document.getElementById('micBtn').classList.add('unopaque');
    }, 75);

    setTimeout(function() {
        document.getElementById('entryForm').style.display = 'block';
        document.getElementById('joinForm').style.display = 'none';

        for (let x = 0; x < 100; x++) {
            setTimeout(function() {
                document.getElementById('topSectionInstructions').style.opacity = x * 0.01;
                document.getElementById('otherOptions').style.opacity = x * 0.01;
                document.getElementById('createAFreequencyBtn').style.opacity = x * 0.01;
                document.getElementById('qrScanBox').style.opacity = x * 0.01;
            }, 5 * x);
        }

        document.getElementById('topSectionInstructions').classList.remove('unopaque');
        document.getElementById('otherOptions').classList.remove('unopaque');
        document.getElementById('createAFreequencyBtn').classList.remove('unopaque');
        document.getElementById('qrScanBox').classList.remove('unopaque');
    }, 420);

    setTimeout(function() {
        for (let j = 0; j < channelNickname.length; j++) {
            setTimeout(function() {
                document.getElementById('channel-name').placeholder += channelNickname[j];
            }, 21 * j);
        }
        for (let k = 0; k < nickname.length; k++) {
            setTimeout(function() {
                document.getElementById('nickname').placeholder += nickname[k];
            }, 21 * k);
        }
    }, 480);
}
