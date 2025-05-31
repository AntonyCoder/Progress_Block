export default class ProgressBlock {
    constructor(container, options = {}) {
        this.container = container;
        this.options = options;
        this.value = options.value || 0;
        this.animated = options.animated || false;
        this.hidden = options.hidden || false;

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
        const progressCircle = document.createElement('div');
        progressCircle.classList.add('progress-circle');

        const controlBlock = this.renderControlBlock();

        blockWrapper.append(blockName, progressCircle, controlBlock);

        this.container.appendChild(blockWrapper);
    }

    //Создание блока управления прогрессом
    renderControlBlock() {
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

        valueBLock.prepend(valueInput);


        //Блок управления состоянием для переключателя Animated
        const animatedBlock = document.createElement('label');
        animatedBlock.classList.add('animated-block');
        animatedBlock.textContent = 'Animate';

        //Checkbox состояния Animated
        const checkboxAnimated = document.createElement('input');
        checkboxAnimated.classList.add('checkbox-animated');
        checkboxAnimated.type = 'checkbox';

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

        //Switch toggle hidden
        const switchHidden = document.createElement('span');
        switchHidden.classList.add('switch-hidden');

        hiddenBlock.prepend(checkboxHidden, switchHidden);

        controlBlock.append(valueBLock, animatedBlock, hiddenBlock);
        return controlBlock;
    }

    //Функция для фильтрации input value
    _filterNumericInput(e) {
        let digitsOnly = e.target.value.replace(/[^\d]/g, '');

        if (digitsOnly === '') {
            e.target.value = 0;
            return;
        }
        
        let value = parseInt(digitsOnly);

        if (value > 100) {
            value = 100
        }
        if (value < 1) {
            value = 0
        }

        e.target.value = value
    }




}