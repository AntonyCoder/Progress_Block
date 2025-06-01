# ProgressBlock UI Component

`ProgressBlock` — это настраиваемый компонент на JavaScript для отображения и управления **круговым индикатором прогресса (progress ring)** с возможностью:

* Ввода значения (0 до 100)
* Включения/отключения анимации вращения
* Скрытия/отображения компонента

---

## Установка и подключение

```js
import ProgressBlock from './ProgressBlock.js';

const container = document.getElementById('root');
const progress = new ProgressBlock(container);
```

---

## Структура компонента

Компонент создает в DOM следующую структуру:

* **block-wrapper** — контейнер всего блока

  * **block-name** — заголовок "Progress"
  * **progress-circle** — обертка с SVG-кольцом

    * **progress-ring** — SVG, включающее два кольца:

      * `.progress-ring-bg` — фон
      * `.progress-ring-value` — текущее значение
  * **control-block** — панель управления:

    * Ввод Value
    * Checkbox Animate
    * Checkbox Hide

---

## ⚙️ API и методы

### `new ProgressBlock(container: HTMLElement)`

Создает компонент и вставляет его внутрь DOM-элемента.

---

### `setValue(value: number)`

Устанавливает новое значение прогресса (0–100).

```js
progress.setValue(75);
```

---

### `setAnimate(isAnimate: boolean, periodMs: number)`

Включает/отключает анимацию вращения. Можно задать период в миллисекундах.

```js
progress.setAnimate(true, 3000);
```

---

### `setHide(isHide: boolean)`

Скрывает/показывает блок с плавным переходом.

```js
progress.setHide(true);
progress.setHide(false);
```

---

## 📋 Пример использования

```html
<div id="root"></div>
<script type="module">
  import ProgressBlock from './ProgressBlock.js';

  const container = document.getElementById('root');
  const progress = new ProgressBlock(container);

  progress.setValue(40);
  progress.setAnimate(true, 5000);
</script>
```

---

## 📁 Файлы

* `ProgressBlock.js` — основной класс
* `progressBlock.scss` или `progressBlock.css` — стили для компонента

---

## Ссылка на деплой 

**https://antonycoder.github.io/Progress_Block/src/index.html**



