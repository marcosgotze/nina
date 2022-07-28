import { openBlock, createElementBlock } from 'vue';

var script = {
  name: "ooter",
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, " footer "))
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

export { plugin as default };
