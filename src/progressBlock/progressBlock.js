export default class ProgressBlock {
    constructor(container) {
        this.container = container;
        this.value = 0;
        this.hide = false;
        this.animate = false;
        this.periodMs = 2000

        this.radius = 40;
        this.circumference = 2 * Math.PI * this.radius;
        this.offset = this.circumference * ((100 - this.value) / 100);

        this._debouncedOnValueInput = this.debounce(this._onValueInput.bind(this), 400);
        this._onHide = this._onHide.bind(this);
        this._onAnimate = this._onAnimate.bind(this);

        this._render();
    }

    //Приватный метод создания и отрисовки блока Progress
    _render() {
        //Обертка progress блока
        const blockWrapper = document.createElement('div');
        blockWrapper.classList.add('block-wrapper');

        //Название progress блока
        const blockName = document.createElement('p');
        blockName.classList.add('block-name');
        blockName.textContent = 'Progress';

        //Блок с круговым процессом
        const progressCircle = this._renderProgressCircle();

        const controlBlock = this._renderControlBlock();

        blockWrapper.append(blockName, progressCircle, controlBlock);

        this.container.appendChild(blockWrapper);
    }

    //Создание кругового блока прогресса
    _renderProgressCircle() {
        //Обертка блока с круговым процессом
        const progressCircle = document.createElement('div');
        progressCircle.classList.add('progress-circle');

        //SVG кольцо прогресс блока 
        const progressRing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        progressRing.classList.add('progress-ring');
        progressRing.setAttribute('width', '100');
        progressRing.setAttribute('height', '100');
        progressRing.setAttribute('viewBox', '0 0 100 100');

        //Фоновое кольцо
        const progressRingBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progressRingBg.classList.add('progress-ring-bg');
        progressRingBg.setAttribute('r', this.radius);
        progressRingBg.setAttribute('cx', '50');
        progressRingBg.setAttribute('cy', '50');
        progressRingBg.setAttribute('fill', 'transparent');

        //Кольцо с изменяющимся значением
        const progressRingValue = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progressRingValue.classList.add('progress-ring-value');
        progressRingValue.setAttribute('r', this.radius);
        progressRingValue.setAttribute('cx', '50');
        progressRingValue.setAttribute('cy', '50');
        progressRingValue.setAttribute('fill', 'transparent');
        progressRingValue.style.strokeDasharray = this.circumference;
        progressRingValue.style.strokeDashoffset = this.offset;

        progressRing.append(progressRingBg, progressRingValue);

        progressCircle.appendChild(progressRing);

        return progressCircle;
    }

    //Создание блока управления прогрессом
    _renderControlBlock() {
        //Блок управления прогрессом
        const controlBlock = document.createElement('div');
        controlBlock.classList.add('control-block');

        //Блок поля управления состоянием value
        const valueBLock = document.createElement('label');
        valueBLock.classList.add('value-block');
        valueBLock.textContent = 'Value';

        //Поле ввода и изменения значения value
        const valueInput = document.createElement('input');
        valueInput.classList.add('value-input');
        valueInput.type = 'number';
        valueInput.value = this.value;

        //Фильтрация input value
        valueInput.addEventListener('input', this._filterNumericInput);
        valueInput.addEventListener('input', this._debouncedOnValueInput);

        valueBLock.prepend(valueInput);


        //Блок управления состоянием для переключателя Animated
        const animatedBlock = document.createElement('label');
        animatedBlock.classList.add('animated-block');
        animatedBlock.textContent = 'Animate';

        //Checkbox состояния Animated
        const checkboxAnimated = document.createElement('input');
        checkboxAnimated.classList.add('checkbox-animated');
        checkboxAnimated.type = 'checkbox';

        checkboxAnimated.addEventListener('click', this._onAnimate)

        //Switch toggle animated
        const switchAnimated = document.createElement('span');
        switchAnimated.classList.add('switch-animated');

        animatedBlock.prepend(checkboxAnimated, switchAnimated);


        //Блок управления состоянием для переключателя Hidden
        const hiddenBlock = document.createElement('label');
        hiddenBlock.classList.add('hidden-block');
        hiddenBlock.textContent = 'Hide';

        //Checkbox состояния Animated
        const checkboxHidden = document.createElement('input');
        checkboxHidden.classList.add('checkbox-hidden');
        checkboxHidden.type = 'checkbox';

        checkboxHidden.addEventListener('click', this._onHide)

        //Switch toggle hidden
        const switchHidden = document.createElement('span');
        switchHidden.classList.add('switch-hidden');

        hiddenBlock.prepend(checkboxHidden, switchHidden);

        controlBlock.append(valueBLock, animatedBlock, hiddenBlock);
        return controlBlock;
    }

    //Функция для фильтрации значений input value
    _filterNumericInput(e) {
        let digitsOnly = e.target.value.replace(/[^\d]/g, '');

        if (digitsOnly === '') {
            e.target.value = 0;
            return;
        }

        let value = parseInt(digitsOnly);

        if (value > 100) value = 100
        if (value < 1) value = 0

        e.target.value = value;
    }

    //Обработчики событий блока управления
    //Обработчик изменения input value
    _onValueInput(e) {
        this.value = e.target.value;
        this.setValue(this.value);
    }

    //Обработчик нажатия на переключатель Animate
    _onAnimate(e) {
        this.animate = e.target.checked;
        this.setAnimate(this.animate, this.periodMs);
    }

    //Обработчик нажатия на переключатель Hide
    _onHide(e) {
        const hidden = e.target.checked;
        this.setHide(hidden);
    }

    //API для управления состоянием progress блока
    //Метод для управления состоянием блока путем изменения значения value
    setValue(value) {
        const valueInput = this.container.querySelector('.value-input');
        valueInput.value = value;

        this.offset = this.circumference * ((100 - value) / 100);

        const progressRingValue = this.container.querySelector('.progress-ring-value');

        progressRingValue.style.strokeDasharray = this.circumference;
        progressRingValue.style.strokeDashoffset = this.offset;
    }

    //Метод для управления анимацией
    setAnimate(isAnimate = true, periodMs) {
        this.animate = isAnimate;
        this.periodMs = periodMs;

        const progressRingValue = this.container.querySelector('.progress-ring-value');
        const checkboxAnimated = this.container.querySelector('.checkbox-animated');

        if (this.hide) return;

        if (this.animate) {
            const durationInSecond = (periodMs / 1000).toFixed(2);
            progressRingValue.classList.add('animated');
            progressRingValue.style.setProperty('--rotate-duration', `${durationInSecond}s`);
            checkboxAnimated.checked = true;
        } else {
            progressRingValue.classList.remove('animated');
            checkboxAnimated.checked = false;
        }
    }

    //Метод для управления скрытием/показом блока
    setHide(isHide) {
        this.hide = isHide;
        const progressRing = this.container.querySelector('.progress-ring');
        const valueInput = this.container.querySelector('.value-input');
        const checkboxAnimated = this.container.querySelector('.checkbox-animated');
        const checkboxHidden = this.container.querySelector('.checkbox-hidden');

        if (this.hide) {
            progressRing.classList.add('hidden');
            valueInput.disabled = true;
            checkboxAnimated.disabled = true;
            checkboxHidden.checked = true;
        } else {
            progressRing.classList.remove('hidden');
            valueInput.disabled = false;
            checkboxAnimated.disabled = false;
            checkboxHidden.checked = false;
        }
    }

    //Функция debounce
    debounce(func, delay = 400) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
}