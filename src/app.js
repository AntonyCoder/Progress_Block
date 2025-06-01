import ProgressBlock from "./progressBlock/progressBlock.js";

const container = document.querySelector('#root')

const progressBlock = new ProgressBlock(container);

progressBlock.setValue(75);