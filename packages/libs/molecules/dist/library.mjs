import { Logo } from '@marcosgotze/atoms';
import { resolveComponent, openBlock, createElementBlock, createVNode, createElementVNode } from 'vue';

var script = {
  name: "Footer",
  components: {
    Logo,
  },
};

const _hoisted_1 = /*#__PURE__*/createElementVNode("input", { type: "text" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_logo = resolveComponent("logo");

  return (openBlock(), createElementBlock("div", null, [
    createVNode(_component_logo),
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

export { plugin as default };
