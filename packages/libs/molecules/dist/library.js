'use strict';

var vue = require('vue');

var script = {
  name: "Footer",
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", null, " Footer "))
}

script.render = render;
script.__file = "src/Footer.vue";

var components = { Footer: script };

const plugin = {
  install (Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  }
};

module.exports = plugin;
