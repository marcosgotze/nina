//
//
//
//
//
//

var script = {
  name: 'link',
  props: {
    text: {
      required: false,
      default: ''
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [
    _c(
      "a",
      {
        attrs: {
          "data-v-2c556e24": "",
          href: "/blog/",
          target: "_blank",
          title: "Blog Fatal Model",
        },
      },
      [_vm._v(_vm._s(_vm.text))]
    ) ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//

var script$1 = {
  name: 'logo'
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "svg",
    {
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "#E25352",
        viewBox: "0 0 150 30",
      },
    },
    [
      _c("path", {
        attrs: {
          d: "M41.268 4.885c-.115-1.343-.74-2.472-1.861-3.357-.901-.71-2.035-.996-3.281-.828-2.56.346-5.852 2.682-9.784 6.943a73.37 73.37 0 0 0-5.015 6.088l-1.3 1.725-.843 1.06c-1.616 2.03-3.142 3.947-4.255 5.288l-.029.035c-3.281 3.954-4.996 5.705-6.547 4.666-.495-.331-.72-1.755.266-4.68.786-2.331 1.945-4.445 1.957-4.467l.183-.332a.759.759 0 0 0-.135-.909l-.28-.275c-.127-.126-3.134-3.073-4.055-4.086-3.168-3.487-3.72-5.545-3.625-6.66.055-.633.338-1.132.891-1.57.328-.259.721-.347 1.24-.277 3.662.494 9.641 7.42 12.493 11.279.021.028.851 1.069.872 1.098l1.662-2.122c-.01-.013-.824-1.052-.834-1.067a65.61 65.61 0 0 0-4.044-4.797C11.013 3.38 7.721 1.044 5.161.698 3.916.53 2.78.816 1.88 1.527.76 2.413.133 3.542.018 4.885c-.2 2.345 1.24 5.23 4.281 8.574.714.784 2.462 2.52 3.493 3.537a33.077 33.077 0 0 0-1.686 3.996c-1.307 3.859-1.059 6.426.74 7.63.772.516 1.573.774 2.398.774 1.037 0 2.115-.408 3.222-1.223 1.497-1.102 2.956-2.861 4.5-4.722l.028-.035c1.144-1.378 2.688-3.316 4.32-5.37l.825-1.034 1.336-1.775.015-.02c2.273-3.148 9.04-11.433 13.002-11.97.517-.07.911.019 1.24.277.553.437.837.936.89 1.57.095 1.113-.457 3.172-3.624 6.656-.921 1.013-3.929 3.96-4.059 4.089l-.278.272a.761.761 0 0 0-.135.909l.183.334c.012.021 1.17 2.137 1.957 4.467.987 2.925.76 4.35.266 4.68-1.548 1.038-3.265-.713-6.546-4.667l-.028-.035c-.412-.495-1.6-1.97-2.291-2.827-.03-.037-.873-1.165-.9-1.198l-1.662 2.122c.029.034.876 1.162.906 1.2.565.703 1.467 1.82 1.88 2.32l.03.035c1.545 1.863 3.004 3.621 4.5 4.722 1.973 1.453 3.893 1.604 5.619.449 1.797-1.204 2.047-3.771.74-7.63-.557-1.647-1.276-3.175-1.685-3.997 1.03-1.016 2.779-2.752 3.492-3.536 3.041-3.343 4.482-6.229 4.281-8.574Zm14.116 9.14h-1.81v7.989h-2.65v-7.989H49.75v-2.092h1.175v-.51c0-1.237.36-2.147 1.081-2.73.721-.581 1.81-.854 3.265-.817v2.147c-.634-.012-1.077.09-1.325.31-.25.218-.373.612-.373 1.182v.42h1.81v2.09h.001Zm1.449.2c.416-.788.983-1.394 1.698-1.82.715-.424 1.514-.636 2.397-.636.771 0 1.445.153 2.023.455.58.303 1.042.685 1.39 1.146v-1.436h2.63v10.08h-2.63v-1.475c-.336.473-.799.865-1.39 1.174-.591.308-1.272.464-2.043.464-.87 0-1.663-.218-2.378-.655-.716-.437-1.281-1.052-1.699-1.846-.417-.794-.624-1.707-.624-2.739.002-1.02.209-1.923.626-2.712Zm7.136 1.155a2.602 2.602 0 0 0-1.007-1.02 2.755 2.755 0 0 0-1.363-.355 2.7 2.7 0 0 0-1.343.345c-.41.232-.743.567-.998 1.01-.255.443-.382.968-.382 1.574 0 .607.127 1.137.382 1.593a2.72 2.72 0 0 0 1.008 1.046c.415.242.86.364 1.333.364a2.74 2.74 0 0 0 1.363-.355 2.59 2.59 0 0 0 1.007-1.02c.248-.442.373-.973.373-1.591-.001-.617-.125-1.148-.373-1.591Zm8.252-1.355v4.877c0 .34.083.585.253.736.168.151.45.228.848.228h1.213v2.148h-1.642c-2.202 0-3.303-1.044-3.303-3.13v-4.859h-1.23v-2.093h1.23V9.44h2.63v2.493h2.313v2.093h-2.312Zm4.151.2c.416-.788.983-1.394 1.698-1.82.715-.424 1.514-.636 2.397-.636.771 0 1.445.153 2.023.455.58.303 1.042.685 1.39 1.146v-1.436h2.63v10.08h-2.63v-1.475c-.336.473-.799.865-1.39 1.174-.591.31-1.272.464-2.043.464a4.47 4.47 0 0 1-2.378-.655c-.716-.437-1.281-1.052-1.698-1.846-.418-.794-.625-1.707-.625-2.739.002-1.02.209-1.923.626-2.712Zm7.136 1.155a2.601 2.601 0 0 0-1.007-1.02 2.755 2.755 0 0 0-1.363-.355 2.7 2.7 0 0 0-1.343.345c-.41.232-.743.567-.998 1.01-.255.443-.382.968-.382 1.574 0 .607.127 1.137.382 1.593.256.455.592.804 1.008 1.046.415.242.86.364 1.333.364a2.74 2.74 0 0 0 1.363-.355 2.59 2.59 0 0 0 1.007-1.02c.248-.442.373-.973.373-1.591-.001-.617-.125-1.148-.373-1.591Zm8.17-6.832v13.466h-2.612V8.548h2.612Zm17.144 3.794a3.538 3.538 0 0 1 1.474 1.447c.361.643.541 1.426.541 2.347v5.878h-1.678v-5.64c0-.995-.253-1.756-.756-2.284-.504-.527-1.184-.79-2.043-.79-.883 0-1.586.276-2.108.828-.522.552-.783 1.349-.783 2.392v5.495h-1.679v-5.64c0-.995-.251-1.756-.756-2.283-.503-.528-1.184-.791-2.042-.791-.883 0-1.587.277-2.108.829-.522.551-.784 1.348-.784 2.392v5.495h-1.698V12.04H96.1v1.438a3.319 3.319 0 0 1 1.352-1.2 4.19 4.19 0 0 1 1.875-.42c.859 0 1.617.188 2.276.565.659.376 1.151.928 1.474 1.656a3.295 3.295 0 0 1 1.419-1.638 4.264 4.264 0 0 1 2.201-.582c.794 0 1.503.16 2.125.482Zm6.2 9.197a4.587 4.587 0 0 1-1.828-1.81c-.442-.782-.663-1.69-.663-2.72 0-1.02.227-1.92.681-2.703a4.628 4.628 0 0 1 1.857-1.8c.783-.42 1.66-.628 2.629-.628.971 0 1.846.209 2.63.627a4.669 4.669 0 0 1 1.856 1.792c.454.776.681 1.68.681 2.712 0 1.03-.231 1.938-.699 2.72a4.769 4.769 0 0 1-1.893 1.81c-.795.425-1.678.636-2.649.636-.957.002-1.825-.211-2.602-.636Zm4.318-1.237c.535-.278.966-.697 1.296-1.255.33-.558.495-1.237.495-2.038 0-.8-.162-1.48-.486-2.039-.323-.558-.745-.974-1.268-1.246a3.623 3.623 0 0 0-1.699-.41c-.621 0-1.191.136-1.707.41-.515.274-.93.688-1.24 1.246-.311.558-.465 1.237-.465 2.039 0 .811.152 1.498.456 2.056.304.558.712.974 1.222 1.246a3.49 3.49 0 0 0 1.678.41 3.65 3.65 0 0 0 1.718-.42Zm5.85-5.996a4.548 4.548 0 0 1 1.743-1.791c.74-.425 1.57-.637 2.491-.637a4.7 4.7 0 0 1 2.219.537c.684.358 1.207.827 1.567 1.41V8.546h1.716v13.465h-1.716v-1.875c-.336.594-.833 1.083-1.493 1.465-.659.383-1.43.573-2.313.573-.907 0-1.731-.217-2.472-.654a4.618 4.618 0 0 1-1.744-1.838c-.423-.787-.633-1.686-.633-2.693 0-1.019.211-1.912.635-2.683Zm7.554.738a3.24 3.24 0 0 0-1.259-1.282 3.494 3.494 0 0 0-1.744-.446 3.49 3.49 0 0 0-1.734.437 3.214 3.214 0 0 0-1.251 1.275c-.311.558-.465 1.212-.465 1.964 0 .765.155 1.429.465 1.993.31.564.728.995 1.251 1.291a3.436 3.436 0 0 0 1.734.446 3.49 3.49 0 0 0 1.744-.446 3.248 3.248 0 0 0 1.259-1.291c.31-.564.466-1.222.466-1.975 0-.753-.154-1.408-.466-1.966Zm13.746 2.601h-8.17c.062.983.407 1.75 1.036 2.302.628.551 1.39.828 2.285.828.733 0 1.346-.166 1.837-.5a2.663 2.663 0 0 0 1.036-1.339h1.828a4.284 4.284 0 0 1-1.642 2.338c-.821.6-1.84.901-3.059.901-.971 0-1.837-.211-2.602-.636a4.55 4.55 0 0 1-1.8-1.81c-.435-.782-.653-1.69-.653-2.72 0-1.032.212-1.936.633-2.712a4.406 4.406 0 0 1 1.782-1.792c.765-.418 1.645-.627 2.64-.627.969 0 1.828.207 2.573.618.746.413 1.322.98 1.726 1.701.403.722.606 1.538.606 2.449 0 .314-.018.648-.056 1Zm-2.126-2.974a2.765 2.765 0 0 0-1.166-1.037 3.719 3.719 0 0 0-1.631-.356c-.859 0-1.589.266-2.193.8-.603.534-.948 1.273-1.036 2.22h6.454c0-.63-.142-1.172-.428-1.627Zm5.537-6.123v13.466h-1.698V8.548h1.698Z",
        },
      }) ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );



var Components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Link: __vue_component__,
  Logo: __vue_component__$1
});

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('Components', Components);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default Components;
export { install };