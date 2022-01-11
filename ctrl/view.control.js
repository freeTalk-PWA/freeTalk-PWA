/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

window.onload = function() {
    document.getElementById('loader').style.display = 'none';

    setTimeout(function() {
        if (window.sessionStorage.getItem('lang') !== null) {
            if (window.sessionStorage.getItem('lang') === 'ar') {
                switchToArabic();
            } else if (window.sessionStorage.getItem('lang') === 'en') {
                switchToEnglish();
            } else if (window.sessionStorage.getItem('lang') === 'tr') {
                switchToTurkish();
            } else if (window.sessionStorage.getItem('lang') === 'zh') {
                switchToChinese();
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
} else {
    document.getElementById('body').style.backgroundColor = '#008230';
    document.getElementById('PCBrowser').style.display = 'block';
    document.getElementById('QR.PCBrowser').src += window.location.href;
}

// Checking if this is running on iOS

const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
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
