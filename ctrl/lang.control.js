/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

var langList = {
    ar: `
        <a onclick="switchToArabic()">
            <div id="white-008230" class="l rounded-md bg-[#008230] text-center text-white font-light">العربيّة</div>
        </a>
    `,
    en: `
        <a onclick="switchToEnglish()">
            <div id="white-008230" class="l rounded-md bg-[#008230] text-center text-white font-light">English</div>
        </a>
    `,
    tr: `
        <a onclick="switchToTurkish()">
            <div id="white-008230" class="l rounded-md bg-[#008230] text-center text-white font-light">Türkçe</div>
        </a>
    `,
    zh: `
        <a onclick="switchToChinese()">
            <div id="white-008230" class="l rounded-md bg-[#008230] text-center text-white font-light">中文</div>
        </a>
    `
};

var extendedLangBtnContent = `
    <a onclick="langSwitch()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 21 21" fill="currentColor">
            <path fill="#008230" fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />
        </svg>
    </a>
    <div class="-mt-[24px] grid grid-cols-3 gap-1 mx-[27px]">
        <lang>
    </div>
    <a onclick="hideSwitch()" id="hideSwitchBtn" class="absolute top-6 right-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="-1 -1 21 21" fill="currentColor">
            <path id="white-008230" class="l" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
    </a>
`;

function LangList(lang) {
    if (lang === 'ar') {
        return [langList.en, langList.tr, langList.zh].join('\n');
    } else if (lang === 'en') {
        return [langList.ar, langList.tr, langList.zh].join('\n');
    } else if (lang === 'tr') {
        return [langList.ar, langList.en, langList.zh].join('\n');
    } else if (lang === 'zh') {
        return [langList.ar, langList.en, langList.tr].join('\n');
    }
}

function langSwitch() {
    setTimeout(function() {
        document.getElementById('langBtn').classList.remove('w-[42px]');
        document.getElementById('langBtn').classList.add('langBtnClicked');
        document.getElementById('langBtn').style.width = 'calc(100% + 2rem)';
    }, 50);
    setTimeout(function() {
        document.getElementById('langBtn').innerHTML = `${extendedLangBtnContent.replace('<lang>', LangList(window.sessionStorage.getItem('lang')))}`;
    }, 400);
    setTimeout(function() {
        var elements = document.getElementsByClassName('l');

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add('langBtnClicked');
        }
    }, 450);
}

function hideSwitch() {
    setTimeout(function() {
        var elements = document.getElementsByClassName('l');

        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('langBtnClicked');
        }
    }, 50);
    setTimeout(function() {
        document.getElementById('langBtn').innerHTML = `
            <a onclick="langSwitch()">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 21 21" fill="currentColor">
                    <path fill="#008230" fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />
                </svg>
            </a>
        `;
    }, 450);
    setTimeout(function() {
        document.getElementById('langBtn').style.width = null;
    }, 500);
    setTimeout(function() {
        document.getElementById('langBtn').classList.remove('langBtnClicked');
        document.getElementById('langBtn').classList.add('w-[42px]');
    }, 550);
}

function changeDirToRTL() {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';

    extendedLangBtnContent = extendedLangBtnContent.replace('right-6', 'left-6');

    document.getElementById('langBtn').classList.remove('rounded-tr-[21px]', '-ml-4');
    document.getElementById('langBtn').classList.add('rounded-tl-[21px]', '-mr-4');
    document.getElementById('KeepMeConnectedLabel').classList.remove('ml-2');
    document.getElementById('KeepMeConnectedLabel').classList.add('mr-2');
    document.getElementById('createA_dChnlIcon').classList.remove('left-0', 'pl-3');
    document.getElementById('createA_dChnlIcon').classList.add('right-0', 'pr-3');
    document.getElementById('snackbar').classList.remove('text-left');
    document.getElementById('snackbar').classList.add('text-right');
    document.getElementById('hideBtn').classList.remove('right-[5px]');
    document.getElementById('hideBtn').classList.add('left-[5px]');
}

function switchToArabic() {
    setTimeout(function() {
        hideSwitch();
    }, 50);
    setTimeout(function() {
        changeDirToRTL();
        document.getElementById('topSectionInstructions').innerHTML = 'قم بانشاءِ قناتِكَ اللامركزيَّة';
        document.getElementById('channel-name').placeholder = 'اسمُ قناتِكَ';
        document.getElementById('nickname').placeholder = 'اسمكَ الحركي';
        document.getElementById('KeepMeConnectedLabel').innerHTML = 'أبقِنِ متَّصِلاً';
        document.getElementById('joinAnother_dChnlLabel').innerHTML = 'انضمَّ لقناةٍ لامركزيَّةٍ أخرى';
        document.getElementById('createA_dChnlBtn').innerHTML = 'أنشئ قناتك اللامركزيَّة';
        document.getElementById('QR.instructions').innerHTML = 'امسح لاستنساخِ هذا التطبيق:';
        document.getElementById('snackbarNote').innerHTML = 'تذكير: سيكونُ استخدام التطبيقِ عند ثبيتِه ، أي إضافتِهِ إلى الشاشةِ الرئيسيَّةِ أكثر سهولةً.';
    }, 450);

    window.sessionStorage.setItem('lang', 'ar');
}

function changeDirToLTR() {
    document.documentElement.dir = 'ltr';

    extendedLangBtnContent = extendedLangBtnContent.replace('left-6', 'right-6');

    document.getElementById('langBtn').classList.remove('rounded-tl-[21px]', '-mr-4');
    document.getElementById('langBtn').classList.add('rounded-tr-[21px]', '-ml-4');
    document.getElementById('KeepMeConnectedLabel').classList.remove('mr-2');
    document.getElementById('KeepMeConnectedLabel').classList.add('ml-2');
    document.getElementById('createA_dChnlIcon').classList.remove('right-0', 'pr-3');
    document.getElementById('createA_dChnlIcon').classList.add('left-0', 'pl-3');
    document.getElementById('snackbar').classList.remove('text-right');
    document.getElementById('snackbar').classList.add('text-left');
    document.getElementById('hideBtn').classList.remove('left-[5px]');
    document.getElementById('hideBtn').classList.add('right-[5px]');
}

function switchToEnglish() {
    setTimeout(function() {
        hideSwitch();
    }, 50);
    setTimeout(function() {
        document.documentElement.lang = 'en';

        changeDirToLTR();
        document.getElementById('topSectionInstructions').innerHTML = 'Create your own dChannel';
        document.getElementById('channel-name').placeholder = 'dChannel’s Name';
        document.getElementById('nickname').placeholder = 'Your Nickname';
        document.getElementById('KeepMeConnectedLabel').innerHTML = 'Keep me connected';
        document.getElementById('joinAnother_dChnlLabel').innerHTML = 'Join another dChannel';
        document.getElementById('createA_dChnlBtn').innerHTML = 'Create a dChannel';
        document.getElementById('QR.instructions').innerHTML = 'Scan to clone this app:';
        document.getElementById('snackbarNote').innerHTML = 'Reminder: Using this progressive web app after adding it to home screen will ensure a much smoother user experience.';
    }, 450);

    window.sessionStorage.setItem('lang', 'en');
}

function switchToTurkish() {
    setTimeout(function() {
        hideSwitch();
    }, 50);
    setTimeout(function() {
        document.documentElement.lang = 'tr';

        changeDirToLTR();
        document.getElementById('topSectionInstructions').innerHTML = 'Kendi moKanalınızı oluşturun';
        document.getElementById('channel-name').placeholder = 'moKanalınız’ın İsmi';
        document.getElementById('nickname').placeholder = 'Takma Adınız';
        document.getElementById('KeepMeConnectedLabel').innerHTML = 'Beni bağlı tut';
        document.getElementById('joinAnother_dChnlLabel').innerHTML = 'Başka bir moKanala katılın';
        document.getElementById('createA_dChnlBtn').innerHTML = 'Bir moKanal oluşturun';
        document.getElementById('QR.instructions').innerHTML = 'Bu App’ı klonlamak için tarayın:';
        document.getElementById('snackbarNote').innerHTML = 'Hatırlatma: Bu aplikasyonu ana ekrana ekledikten sonra kullanmak, çok daha sorunsuz bir kullanıcı deneyimi sağlayacaktır.';
    }, 450);

    window.sessionStorage.setItem('lang', 'tr');
}

function switchToChinese() {}
