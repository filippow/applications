import Model from './src/model.js';
import View from './src/view.js';
import Controller from './src/controller.js';

import DragAndDrop from './src/dragAndDrop.js';
import apiVK from './src/vkApi.js'
let vk = new apiVK();
let model = new Model();
let controller = new Controller(vk);
let view = new View(model, controller, DragAndDrop);
controller.init(view, model);
