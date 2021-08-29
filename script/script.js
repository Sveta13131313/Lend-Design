
window.addEventListener('DOMContentLoaded', () => {

    //timer
    function countTimer(deadline) {
        const timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimerRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timerRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timerRemaining % 60),
                minutes = Math.floor((timerRemaining / 60) % 60),
                hours = Math.floor(timerRemaining / 60 / 60);
            return { timerRemaining, hours, minutes, seconds };
        }

        function upDateClock() {
            const timer = getTimerRemaining();
            if (timer.hours < 10) {
                timer.hours = '0' + timer.hours;
            }
            if (timer.minutes < 10) {
                timer.minutes = '0' + timer.minutes;
            }
            if (timer.seconds < 10) {
                timer.seconds = '0' + timer.seconds;
            }
            timerHour.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timerRemaining > 0) {
                setInterval(upDateClock, 1000);
            }
            if (timer.timerRemaining <= 0) {
                timerHour.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        upDateClock();
    }
    countTimer('30 august 2021');

    //toggle
    const toggleMenu = () => {

        const menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn') ||
                target.closest('menu>ul>li>a') ||
                target.closest('.menu') ||
                (menu.classList.contains('active-menu') && !target.closest('menu'))) {
                handlerMenu();
            }
        });
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');


        let flyInterval;
        let count = 2;
        const clientWidth = document.documentElement.clientWidth;
        const flyAnimate = function () {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if (count * 35 < clientWidth / 2 && clientWidth > 768) {
                popupContent.style.left = count * 35 + 'px';
            } else {
                cancelAnimationFrame(flyInterval);
                count = 2;
            }
        };
        let animate = false;
        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                if (!animate) {
                    popup.style.display = 'block';
                    flyInterval = requestAnimationFrame(flyAnimate);
                    animate = true;

                }
                animate = false;
            });
        });

        popup.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });

    };
    togglePopUp();


    //Scroll
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (const smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', elem => {
            elem.preventDefault();
            const id = smoothLink.getAttribute('href');
            if (id !== '#' && id !== '#close') {
                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            };
        });
    }

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            ul = document.querySelector('.portfolio-dots');
        let currentSlide = 0,
            interval;

        //добавление точек на слайдер
        const renderDot = () => {
            for (let i = 0; i < slide.length; i++) {
                const li = document.createElement('li');
                li.classList.add('dot');
                ul.appendChild(li);
            }
        };
        renderDot();
        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);

    };

    slider();

    //смена картинки у команды
    const imgs = document.querySelectorAll('.command__photo');

    imgs.forEach((elem) => {
        let src;
        elem.addEventListener('mouseenter', (e) => {
            src = event.target.src;
            event.target.src = event.target.dataset.img;
        });
        elem.addEventListener('mouseout', (e) => {
            event.target.src = src;
        });
    });


    //проверка ввода цифр в калькуляторе

    const calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count');

    const checkCalck = (calcInput) => {
        calcInput.addEventListener('blur', () => {
            calcInput.value = calcInput.value.replace(/[\D]/g, '');
        });
    };

    checkCalck(calcSquare);
    checkCalck(calcDay);
    checkCalck(calcCount);


    //проверка ввода в полях Ваше имя
    const form1Name = document.querySelector('#form1-name'),
        form2Name = document.querySelector('#form2-name');

    const checkName = (formName) => {
        formName.addEventListener('blur', () => {
            formName.value = formName.value.replace(/[^А-яЁа-яё\s-]/g, '');
            formName.value = formName.value.replace(/^\s+|\s+$/g, '');
            formName.value = formName.value.replace(/^\-+|\-+$/g, '');
            formName.value = formName.value.replace(/^\s+|\s+$/g, '');
            formName.value = formName.value[0].toUpperCase() + formName.value.slice(1).toLowerCase();
            formName.value = formName.value.replace(/[ ]+/g, ' ');
            formName.value = formName.value.replace(/-+/g, '-');
        });
    };

    checkName(form1Name);
    checkName(form2Name);


    //проверка ввода email
    const form1Email = document.querySelector('#form1-email'),
        form2Email = document.querySelector('#form2-email');

    const checkEmail = (formEmail) => {
        formEmail.addEventListener('blur', () => {
            formEmail.value = formEmail.value.replace(/[^A-Za-z-@_.~*'!]/g, '');
            formEmail.value = formEmail.value.replace(/-+/g, '-');
            formEmail.value = formEmail.value.replace(/^\-+|\-+$/g, '');
        });
    };
    checkEmail(form1Email);
    checkEmail(form2Email);


    //проверка ввода телефона
    const form1Phone = document.querySelector('#form1-phone'),
        form2Phone = document.querySelector('#form2-phone');

    const checkPhone = (formPhone) => {
        formPhone.addEventListener('blur', () => {
            formPhone.value = formPhone.value.replace(/[^0-9()-]/g, '');
            formPhone.value = formPhone.value.replace(/-+/g, '-');
            formPhone.value = formPhone.value.replace(/^\-+|\-+$/g, '');
        });
    };

    checkPhone(form1Phone);
    checkPhone(form2Phone);
    const calc = (price = 100) => {
        //калькулятор
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0, countValue = 1, dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

});
