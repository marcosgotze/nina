'use strict';

var atsoms = require('@nina/atsoms');
var vue = require('vue');

var script = {
  name: "Footer",
  components: {
    Logo: atsoms.Logo,
  },
};

const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("input", { type: "text" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_logo = vue.resolveComponent("logo");

  return (vue.openBlock(), vue.createElementBlock("div", null, [
    vue.createVNode(_component_logo),
    _hoisted_1
  ]))
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
