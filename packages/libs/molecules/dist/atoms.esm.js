//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  updated: function updated() {
    this.viewportWidth = window.innerWidth;
  },
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

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "wrapper" }, [
    _c("section", { staticClass: "info" }, [
      _c("div", { staticClass: "info__about" }, [
        _c(
          "div",
          { staticClass: "about" },
          [
            _vm._m(0),
            _vm._v(" "),
            _c("p", { staticClass: "description" }, [
              _vm._v(
                "\n          Lançado em 2016, o Fatal Model é a maior plataforma de anúncios de\n          acompanhantes do Brasil. A missão Fatal Model é 'organizar e\n          dignificar o mercado de acompanhantes do mundo'. Acompanhantes\n          mulheres, homens e transex de todo o Brasil em mais de 25 mil\n          anúncios ativos.\n        "
              ) ]),
            _vm._v(" "),
            _c("ul", { staticClass: "social__links" }, [
              _c("li", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "https://www.youtube.com/c/FatalModel",
                      target: "_blank",
                      title: "Youtube Fatal Model",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 32 32",
                        },
                      },
                      [
                        _c("title", [_vm._v("Youtube Fatal Model")]),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            fill: "#263238",
                            "fill-rule": "evenodd",
                            d: "M28.1213 8.24389C27.663 7.64021 26.8821 7.17082 26.0507 7.01525C23.6069 6.55118 8.36122 6.54986 5.91882 7.01525C5.25209 7.14023 4.65841 7.44207 4.1484 7.91146C1.99948 9.90599 2.67284 20.602 3.19082 22.3347C3.40863 23.0846 3.6902 23.6258 4.04481 23.9808C4.50169 24.4502 5.12724 24.7733 5.84577 24.9182C7.8579 25.3344 18.224 25.5671 26.0082 24.9807C26.7254 24.8558 27.3602 24.522 27.8609 24.0327C29.8478 22.0461 29.7123 10.749 28.1212 8.24387M13.3178 19.448V11.9659C15.9741 13.2158 18.0314 14.4231 20.4645 15.7249C18.4577 16.8378 15.9741 18.0864 13.3178 19.448Z",
                          },
                        }) ]
                    ) ]
                ) ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "https://www.instagram.com/fatal_modelbr/",
                      target: "_blank",
                      title: "Instagram Fatal Model",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 32 32",
                        },
                      },
                      [
                        _c("title", [_vm._v("Instagram Fatal Model")]),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            fill: "#263238",
                            "fill-rule": "evenodd",
                            d: "M10.4927 2.83689C8.3222 2.93483 6.44091 3.46552 4.92182 4.9782C3.39742 6.49883 2.87336 8.38736 2.77519 10.5353C2.71416 11.8759 2.35727 22.0042 3.39211 24.6604C4.08997 26.4523 5.46445 27.83 7.27277 28.5301C8.11656 28.8583 9.07975 29.0806 10.4927 29.1455C22.3071 29.6801 26.6866 29.389 28.5334 24.6604C28.8611 23.8187 29.0866 22.8565 29.149 21.4471C29.6889 9.60235 29.0614 7.03493 27.0023 4.97827C25.3692 3.34912 23.4482 2.24003 10.4927 2.83689ZM10.6014 26.7632C9.30786 26.705 8.60602 26.4893 8.13769 26.308C6.95956 25.8501 6.07465 24.9687 5.61958 23.7974C4.83151 21.7792 5.09288 12.1936 5.16319 10.6425C5.23218 9.12319 5.53998 7.73491 6.61196 6.66293C7.93868 5.33949 9.6528 4.69101 21.324 5.21775C22.847 5.28656 24.2388 5.5936 25.3134 6.66293C26.6401 7.98636 27.2982 9.71344 26.7622 21.3399C26.7038 22.6302 26.4875 23.3303 26.3058 23.7975C25.1051 26.8745 22.3429 27.3019 10.6014 26.7632ZM21.4526 8.92609C21.4526 9.80221 22.1651 10.5142 23.0447 10.5142C23.9243 10.5142 24.6381 9.80221 24.6381 8.92609C24.6381 8.04999 23.9243 7.33797 23.0447 7.33797C22.1651 7.33797 21.4526 8.04999 21.4526 8.92609ZM9.14996 15.9906C9.14996 19.7438 12.2001 22.7864 15.9627 22.7864C19.7252 22.7864 22.7753 19.7438 22.7753 15.9906C22.7753 12.2373 19.7252 9.19608 15.9627 9.19608C12.2001 9.19608 9.14996 12.2373 9.14996 15.9906ZM11.5407 15.9906C11.5407 13.5555 13.5202 11.5796 15.9627 11.5796C18.4051 11.5796 20.3846 13.5555 20.3846 15.9906C20.3846 18.427 18.4051 20.4029 15.9627 20.4029C13.5202 20.4029 11.5407 18.427 11.5407 15.9906Z",
                          },
                        }) ]
                    ) ]
                ) ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "https://www.facebook.com/FatalModelBr",
                      target: "_blank",
                      title: "Facebook Fatal Model",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 32 32",
                        },
                      },
                      [
                        _c("title", [_vm._v("Facebook Fatal Model")]),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            fill: "#263238",
                            "fill-rule": "evenodd",
                            d: "M2.66663 16C2.66663 8.63601 8.63596 2.66667 16 2.66667V2.66801C23.364 2.66801 29.3333 8.63734 29.3333 16C29.3333 23.364 23.364 29.3333 16 29.3333C8.63596 29.3333 2.66663 23.364 2.66663 16ZM18.0933 19.8532V29.1699C17.4114 29.2774 16.7122 29.3332 16 29.3332C15.2924 29.3332 14.5977 29.2781 13.92 29.1719V19.8532H10.5333V15.9999H13.92V13.0666C13.92 9.71989 15.9067 7.87989 18.96 7.87989C20.4133 7.87989 21.9467 8.14655 21.9467 8.14655V11.4266H20.2667C18.6133 11.4266 18.0933 12.4532 18.0933 13.5066V15.9999H21.7867L21.2 19.8532H18.0933Z",
                          },
                        }) ]
                    ) ]
                ) ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "https://twitter.com/FatalModel",
                      target: "_blank",
                      title: "Twitter Fatal Model",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24",
                        },
                      },
                      [
                        _c("title", [_vm._v("Twitter Fatal Model")]),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            fill: "#263238",
                            "fill-rule": "evenodd",
                            d: "M8.29 20.002C15.837 20.002 19.965 13.8457 19.965 8.5075C19.965 8.33225 19.965 8.15799 19.953 7.98471C20.756 7.41367 21.449 6.7048 22 5.89354C21.252 6.22041 20.457 6.43504 19.644 6.52955C20.5 6.02448 21.141 5.23094 21.448 4.29464C20.642 4.76525 19.761 5.09704 18.842 5.27525C17.288 3.64878 14.689 3.57002 13.036 5.1C11.971 6.08651 11.518 7.55742 11.849 8.96039C8.55 8.79696 5.476 7.26304 3.392 4.73966C2.303 6.58567 2.86 8.94661 4.663 10.132C4.01 10.1133 3.371 9.94001 2.8 9.62693V9.67812C2.801 11.6009 4.178 13.2569 6.092 13.638C5.488 13.8004 4.854 13.824 4.24 13.7069C4.777 15.353 6.318 16.4803 8.073 16.5128C6.62 17.6372 4.825 18.2476 2.977 18.2456C2.651 18.2446 2.325 18.2259 2 18.1875C3.877 19.3729 6.06 20.002 8.29 19.9991",
                          },
                        }) ]
                    ) ]
                ) ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "https://open.spotify.com/show/5svuSmKRcanDd2dMwj8HiB",
                      target: "_blank",
                      title: "Spotify Fatal Model",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 32 32",
                        },
                      },
                      [
                        _c("title", [_vm._v("Spotify Fatal Model")]),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            fill: "#263238",
                            "fill-rule": "evenodd",
                            d: "M2.66663 16C2.66663 8.63601 8.63596 2.66667 16 2.66667V2.66801C23.364 2.66801 29.3333 8.63734 29.3333 16C29.3333 23.364 23.364 29.3333 16 29.3333C8.63596 29.3333 2.66663 23.364 2.66663 16ZM8.39596 12.9453C12.5 11.7 19.5893 11.9347 23.8866 14.4867C24.4773 14.8387 25.2453 14.6427 25.5946 14.0507C25.9466 13.4587 25.752 12.6933 25.16 12.3413C20.212 9.40399 12.3826 9.12799 7.67196 10.5587C7.01329 10.7587 6.64129 11.4547 6.84129 12.1133C7.04129 12.7733 7.73729 13.144 8.39596 12.9453ZM22.316 18.6094C22.8053 18.9094 23.4453 18.7561 23.7466 18.2667C24.0466 17.7787 23.8933 17.1387 23.404 16.8387C19.288 14.3094 13.268 13.5974 8.42663 15.0667C7.8773 15.2334 7.56797 15.8134 7.7333 16.3627C7.89997 16.9121 8.47997 17.2214 9.03063 17.0561C13.2693 15.7694 18.7333 16.4067 22.316 18.6094ZM20.972 22.1733C21.364 22.4133 21.8746 22.2893 22.1146 21.8973C22.3546 21.5053 22.2306 20.9946 21.8386 20.7546C18.324 18.6066 13.968 18.1066 8.88929 19.268C8.43995 19.3706 8.16128 19.816 8.26395 20.2626C8.36528 20.7106 8.81195 20.9906 9.25862 20.888C13.9 19.828 17.8413 20.26 20.972 22.1733Z",
                          },
                        }) ]
                    ) ]
                ) ]),
              _vm._v(" "),
              _c("li", [
                _vm.viewportWidth < 900
                  ? _c("span", [
                      _c("a", [
                        _c(
                          "svg",
                          {
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "24",
                              height: "24",
                              viewBox: "0 0 32 32",
                            },
                          },
                          [
                            _c("title", [_vm._v("Telegram Fatal Model")]),
                            _vm._v(" "),
                            _c("path", {
                              attrs: {
                                fill: "#263238",
                                "fill-rule": "evenodd",
                                d: "M29.3333 16C29.3333 23.3638 23.3638 29.3333 16 29.3333C8.63616 29.3333 2.66663 23.3638 2.66663 16C2.66663 8.63621 8.63616 2.66667 16 2.66667C23.3638 2.66667 29.3333 8.63621 29.3333 16ZM17.6356 11.1825L8.89914 15.14C7.36182 15.7996 8.26171 16.418 8.26171 16.418C8.26171 16.418 9.57405 16.9127 10.6989 17.2837C11.8238 17.6547 12.4237 17.2425 12.4237 17.2425L17.7106 13.3262C19.5853 11.9245 19.1354 13.0788 18.6854 13.5735C17.7106 14.6453 16.0983 16.3356 14.7484 17.696C14.1485 18.2731 14.4485 18.7678 14.7109 19.0152C15.474 19.725 17.2706 21.0157 18.0874 21.6024C18.3141 21.7654 18.4654 21.874 18.498 21.9009C18.6854 22.0658 19.7353 22.8078 20.3727 22.6429C21.0102 22.478 21.0852 21.5299 21.0852 21.5299L22.0225 15.0576C22.1058 14.4508 22.1891 13.8568 22.2668 13.3029C22.4689 11.8621 22.6329 10.6924 22.66 10.2755C22.7725 8.8739 21.4226 9.45105 21.4226 9.45105C21.4226 9.45105 18.498 10.7702 17.6356 11.1825Z",
                              },
                            }) ]
                        ) ]) ])
                  : _c("span", [
                      _c("a", [
                        _c(
                          "svg",
                          {
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "24",
                              height: "24",
                              viewBox: "0 0 32 32",
                            },
                          },
                          [
                            _c("title", [_vm._v("Telegram Fatal Model")]),
                            _vm._v(" "),
                            _c("path", {
                              attrs: {
                                fill: "#263238",
                                "fill-rule": "evenodd",
                                d: "M29.3333 16C29.3333 23.3638 23.3638 29.3333 16 29.3333C8.63616 29.3333 2.66663 23.3638 2.66663 16C2.66663 8.63621 8.63616 2.66667 16 2.66667C23.3638 2.66667 29.3333 8.63621 29.3333 16ZM17.6356 11.1825L8.89914 15.14C7.36182 15.7996 8.26171 16.418 8.26171 16.418C8.26171 16.418 9.57405 16.9127 10.6989 17.2837C11.8238 17.6547 12.4237 17.2425 12.4237 17.2425L17.7106 13.3262C19.5853 11.9245 19.1354 13.0788 18.6854 13.5735C17.7106 14.6453 16.0983 16.3356 14.7484 17.696C14.1485 18.2731 14.4485 18.7678 14.7109 19.0152C15.474 19.725 17.2706 21.0157 18.0874 21.6024C18.3141 21.7654 18.4654 21.874 18.498 21.9009C18.6854 22.0658 19.7353 22.8078 20.3727 22.6429C21.0102 22.478 21.0852 21.5299 21.0852 21.5299L22.0225 15.0576C22.1058 14.4508 22.1891 13.8568 22.2668 13.3029C22.4689 11.8621 22.6329 10.6924 22.66 10.2755C22.7725 8.8739 21.4226 9.45105 21.4226 9.45105C21.4226 9.45105 18.498 10.7702 17.6356 11.1825Z",
                              },
                            }) ]
                        ) ]) ]) ]),
              _vm._v(" "),
              _c("li", [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "https://www.tiktok.com/@fatalmodel",
                      target: "_blank",
                      title: "Tiktok Fatal Model",
                    },
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          width: "24",
                          height: "24",
                          viewBox: "0 0 32 32",
                          xmlns: "http://www.w3.org/2000/svg",
                        },
                      },
                      [
                        _c("title", [_vm._v("Tiktok Fatal Model")]),
                        _vm._v(" "),
                        _c("path", {
                          attrs: {
                            d: "M22.1335 7.76C22.1335 7.76 22.8135 8.42667 22.1335 7.76C21.2221 6.7195 20.7198 5.38324 20.7202 4H16.6002V20.5333C16.5684 21.428 16.1907 22.2755 15.5466 22.8973C14.9024 23.519 14.0421 23.8665 13.1469 23.8667C11.2535 23.8667 9.68021 22.32 9.68021 20.4C9.68021 18.1067 11.8935 16.3867 14.1735 17.0933V12.88C9.57354 12.2667 5.54688 15.84 5.54688 20.4C5.54688 24.84 9.22688 28 13.1335 28C17.3202 28 20.7202 24.6 20.7202 20.4V12.0133C22.3909 13.2131 24.3967 13.8569 26.4535 13.8533V9.73333C26.4535 9.73333 23.9469 9.85333 22.1335 7.76Z",
                            fill: "#263238",
                            "fill-rule": "evenodd",
                          },
                        }) ]
                    ) ]
                ) ]) ]),
            _vm._v(" "),
            _vm.openModal
              ? _c("options-telegram-footer", {
                  on: { close: _vm.closeModalTelegram },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "icon",
                        fn: function () {
                          return [
                            _c("icon-telegram", {
                              attrs: {
                                width: 34,
                                height: 34,
                                color: "#5D7A89",
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "title__modal mt-20 mb-20" },
                              [_vm._v("Telegram")]
                            ) ]
                        },
                        proxy: true,
                      },
                      {
                        key: "content",
                        fn: function () {
                          return [
                            _c("div", { staticClass: "options__content" }, [
                              _c("hr"),
                              _vm._v(" "),
                              _c(
                                "a",
                                {
                                  staticClass: "link",
                                  attrs: {
                                    title: "Bot Telegram Fatal Model",
                                    href: "https://t.me/appscalculatorbot",
                                    target: "_blank",
                                  },
                                },
                                [
                                  _c("span", [
                                    _vm._v("Bot Telegram para contratantes") ]),
                                  _vm._v(" "),
                                  _c("icon-external-link", {
                                    attrs: { width: 20, height: 20 },
                                  }) ],
                                1
                              ),
                              _vm._v(" "),
                              _c("hr"),
                              _vm._v(" "),
                              _c(
                                "a",
                                {
                                  staticClass: "link",
                                  attrs: {
                                    title: "Canal Telegram Fatal Model",
                                    href: "https://t.me/novidadesfatalmodel",
                                    target: "_blank",
                                  },
                                },
                                [
                                  _c("span", [
                                    _vm._v("Canal Telegram para acompanhantes") ]),
                                  _vm._v(" "),
                                  _c("icon-external-link", {
                                    attrs: { width: 20, height: 20 },
                                  }) ],
                                1
                              ) ]) ]
                        },
                        proxy: true,
                      } ],
                    null,
                    false,
                    4072355640
                  ),
                })
              : _vm._e() ],
          1
        ),
        _vm._v(" "),
        _c("hr", { staticClass: "divisor" }),
        _vm._v(" "),
        _c("nav", { staticClass: "links" }, [
          _c("ul", { staticClass: "utils" }, [
            _vm._m(1),
            _vm._v(" "),
            _vm._m(2),
            _vm._v(" "),
            _vm._m(3),
            _vm._v(" "),
            !_vm.isConsumer
              ? _c("li", [
                  _c(
                    "a",
                    {
                      attrs: {
                        href: "/planos",
                        target: "_blank",
                        title: "Planos para anunciantes",
                      },
                    },
                    [_vm._v("Planos para anunciantes")]
                  ) ])
              : _vm._e(),
            _vm._v(" "),
            _vm._m(4),
            _vm._v(" "),
            _c(
              "li",
              [
                _c(
                  "a",
                  {
                    attrs: {
                      href: "tel:100",
                      title: "Denunciar Exploração Sexual",
                    },
                  },
                  [_vm._v("Denunciar Exploração Sexual")]
                ),
                _vm._v(" "),
                _c("tooltip-information", {
                  staticClass: "tooltip",
                  attrs: { "icon-size": 20 },
                  scopedSlots: _vm._u([
                    {
                      key: "content",
                      fn: function () {
                        return [
                          _c("div", { staticClass: "tooltip__info" }, [
                            _c("p", { staticClass: "tooltip__paragraph" }, [
                              _vm._v(
                                "\n                    Exploração Sexual é a condição análoga à escravidão em que\n                    uma pessoa se beneficia sexualmente de outra pessoa sendo\n                    um crime previsto pela Constituição.\n                  "
                              ) ]),
                            _vm._v(" "),
                            _c("p", { staticClass: "tooltip__paragraph" }, [
                              _vm._v(
                                "\n                    Caso esteja em uma situação assim, ou conheça alguém que\n                    está, denuncie através do link ligando para o Disque\n                    Direitos Humanos (Disque 100).\n                  "
                              ) ]),
                            _vm._v(" "),
                            _c("p", { staticClass: "tooltip__paragraph" }, [
                              _vm._v(
                                "\n                    O Disque Direitos Humanos é um serviço de disseminação de\n                    informações sobre direitos de grupos vulneráveis e de\n                    denúncias de violações de direitos humanos.\n                  "
                              ) ]) ]) ]
                      },
                      proxy: true,
                    } ]),
                }) ],
              1
            ) ]) ]) ]),
      _vm._v(" "),
      _vm._m(5) ]),
    _vm._v(" "),
    _c("section", { staticClass: "juridic" }, [
      _c("div", [_vm._v("CNPJ: " + _vm._s(_vm.cnpj))]) ]),
    _vm._v(" "),
    _c("section", { staticClass: "copyright" }, [
      _c("div", { staticClass: "copyright__content" }, [
        _c("img", {
          attrs: { src: _vm.logoFatal, alt: "Acompanhantes Fatal Model" },
        }),
        _vm._v(" "),
        _c("p", [
          _vm._v("Copyright " + _vm._s(_vm.yearCopyright) + " © Fatal Model.") ]) ]) ]) ])
};
var __vue_staticRenderFns__ = [
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("h2", [_vm._v("Sobre o "), _c("strong", [_vm._v("Fatal Model")])])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", [
      _c(
        "a",
        {
          attrs: {
            href: "/blog/",
            target: "_blank",
            title: "Blog Fatal Model",
          },
        },
        [_vm._v("Fatal Blog")]
      ) ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", [
      _c(
        "a",
        {
          attrs: { href: "/contact", target: "_blank", title: "Fale Conosco" },
        },
        [_vm._v("Fale Conosco")]
      ) ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", [
      _c(
        "a",
        {
          attrs: {
            href: "https://fatalmodel.movidesk.com/kb",
            target: "_blank",
            title: "Perguntas Frequentes",
          },
        },
        [_vm._v("Perguntas Frequentes")]
      ) ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", [
      _c(
        "a",
        { attrs: { href: "/terms", target: "_blank", title: "Termos de uso" } },
        [_vm._v("Termos de uso")]
      ) ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("nav", { staticClass: "info__cities" }, [
      _c("ul", { staticClass: "list__cities" }, [
        _c("li", [
          _c(
            "a",
            {
              attrs: {
                href: "/acompanhantes-curitiba-pr",
                title: "Acompanhantes em Curitiba",
              },
            },
            [_vm._v("\n            Curitiba - PR\n          ")]
          ) ]),
        _vm._v(" "),
        _c("li", [
          _c(
            "a",
            {
              attrs: {
                href: "/acompanhantes-campinas-sp",
                title: "Acompanhantes em Campinas",
              },
            },
            [_vm._v("\n            Campinas - SP\n          ")]
          ) ]),
        _vm._v(" "),
        _c("li", [
          _c(
            "a",
            {
              attrs: {
                href: "/acompanhantes-sao-paulo-sp",
                title: "Acompanhantes em São Paulo",
              },
            },
            [_vm._v("\n            São Paulo - SP\n          ")]
          ) ]),
        _vm._v(" "),
        _c("li", [
          _c(
            "a",
            {
              attrs: {
                href: "/acompanhantes-manaus-am",
                title: "Acompanhantes em Manaus",
              },
            },
            [_vm._v("\n            Manaus - AM\n          ")]
          ) ]),
        _vm._v(" "),
        _c("li", [
          _c(
            "a",
            {
              attrs: {
                href: "/acompanhantes-belo-horizonte-mg",
                title: "Acompanhantes em Belo Horizonte",
              },
            },
            [_vm._v("\n            Belo Horizonte - MG\n          ")]
          ) ]),
        _vm._v(" "),
        _c("li", [
          _c(
            "a",
            {
              attrs: {
                href: "/acompanhantes-recife-pe",
                title: "Acompanhantes em Recife",
              },
            },
            [_vm._v("\n            Recife - PE\n          ")]
          ) ]) ]) ])
  } ];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-2c556e24_0", { source: ".wrapper .info[data-v-2c556e24] {\n  max-width: 1180px;\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n}\n@media (max-width: 1200px) {\n.wrapper .info[data-v-2c556e24] {\n    padding-left: 60px;\n}\n}\n@media (max-width: 900px) {\n.wrapper .info[data-v-2c556e24] {\n    flex-direction: column;\n    padding-left: 0;\n    align-items: center;\n}\n}\n.wrapper .info__about[data-v-2c556e24] {\n  max-width: 910px;\n  padding: 80px 60px 80px 0;\n  display: flex;\n  position: relative;\n}\n@media (max-width: 1024px) {\n.wrapper .info__about[data-v-2c556e24] {\n    padding-right: 40px;\n}\n}\n@media (max-width: 900px) {\n.wrapper .info__about[data-v-2c556e24] {\n    padding: 40px 0;\n    width: 100%;\n    flex-direction: column;\n    align-items: center;\n}\n}\n.wrapper .info__about .about[data-v-2c556e24] {\n  max-width: 380px;\n  width: 100%;\n  color: #263238;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about[data-v-2c556e24] {\n    padding: 0 32px;\n}\n}\n.wrapper .info__about .about h2[data-v-2c556e24] {\n  font-weight: normal;\n  font-size: 28px;\n  line-height: 28px;\n  text-transform: uppercase;\n  color: #263238;\n  max-width: 380px;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about h2[data-v-2c556e24] {\n    width: 180px;\n    font-size: 24px;\n}\n}\n.wrapper .info__about .about .description[data-v-2c556e24] {\n  font-style: italic;\n  font-weight: normal;\n  font-size: 16px;\n  color: #263238;\n  line-height: 20px;\n  max-width: 380px;\n  margin-top: 32px;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about .description[data-v-2c556e24] {\n    font-size: 14px;\n    line-height: 17px;\n}\n}\n.wrapper .info__about .about .title__modal[data-v-2c556e24] {\n  font-size: 18px;\n  font-weight: 600;\n  font-style: normal;\n  line-height: 105%;\n  text-align: center;\n  color: #5d7a89;\n}\n.wrapper .info__about .about .options__content[data-v-2c556e24] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.wrapper .info__about .about .options__content hr[data-v-2c556e24] {\n  background: rgba(0, 0, 0, 0.15);\n  width: 100%;\n}\n.wrapper .info__about .about .options__content .link[data-v-2c556e24] {\n  padding: 10px 20px;\n  font-weight: 600;\n  font-size: 16px;\n  line-height: 22px;\n  color: #344fa5;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.wrapper .info__about .about .options__content .link[data-v-2c556e24]:hover {\n  text-decoration: none;\n}\n.wrapper .info__about .about .options__content .link[data-v-2c556e24]:last-child {\n  padding-bottom: 0;\n}\n.wrapper .info__about .about .options__content .link span[data-v-2c556e24] {\n  width: 312px;\n  margin-right: 12px;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about .options__content .link span[data-v-2c556e24] {\n    width: 228px;\n}\n}\n.wrapper .info__about .about .social__links[data-v-2c556e24] {\n  margin-top: 24px;\n  display: flex;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about .social__links[data-v-2c556e24] {\n    justify-content: space-between;\n}\n}\n.wrapper .info__about .about .social__links a[data-v-2c556e24] {\n  margin-right: 18px;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about .social__links a[data-v-2c556e24] {\n    margin-right: 0;\n}\n}\n.wrapper .info__about .about .social__links span[data-v-2c556e24] {\n  cursor: pointer;\n}\n.wrapper .info__about .about .social__links svg path[data-v-2c556e24] {\n  fill: #263238;\n  transition: all ease 0.2s;\n}\n.wrapper .info__about .about .social__links svg:hover path[data-v-2c556e24] {\n  fill: #e25352;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .about .social__links svg[data-v-2c556e24] {\n    width: 32px;\n    height: 32px;\n}\n}\n.wrapper .info__about .divisor[data-v-2c556e24] {\n  height: 160px;\n  width: 1px;\n  background: rgba(0, 0, 0, 0.15);\n  margin: auto 60px;\n}\n@media (max-width: 1024px) {\n.wrapper .info__about .divisor[data-v-2c556e24] {\n    margin: auto 30px;\n}\n}\n@media (max-width: 900px) {\n.wrapper .info__about .divisor[data-v-2c556e24] {\n    display: none;\n}\n}\n.wrapper .info__about .links .utils[data-v-2c556e24] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n  margin-top: 38px;\n}\n.wrapper .info__about .links .utils .tooltip[data-v-2c556e24] {\n  display: inline-block;\n  height: fit-content;\n  top: 3px;\n}\n.wrapper .info__about .links .utils .tooltip__info[data-v-2c556e24] {\n  display: flex;\n  flex-direction: column;\n}\n.wrapper .info__about .links .utils .tooltip__paragraph[data-v-2c556e24]:not(:last-child) {\n  margin-bottom: 16px;\n}\n.wrapper .info__about .links .utils li[data-v-2c556e24] {\n  display: flex;\n  margin: 6px 0;\n  transition: all 0.35s ease;\n  width: 260px;\n}\n@media (max-width: 900px) {\n.wrapper .info__about .links .utils li[data-v-2c556e24] {\n    justify-content: center;\n    font-size: 20px;\n    line-height: 28px;\n    text-align: center;\n}\n}\n.wrapper .info__about .links .utils li a[data-v-2c556e24] {\n  font-weight: normal;\n  color: #263238;\n  font-size: 20px;\n  line-height: 28px;\n  position: relative;\n}\n.wrapper .info__about .links .utils li a[data-v-2c556e24]::after {\n  content: \"\";\n  position: absolute;\n  height: 1px;\n  bottom: 0;\n  left: 0;\n  background-color: #263238;\n  visibility: hidden;\n  transform: scaleX(0);\n  transition: all 0.3s ease-in-out;\n}\n.wrapper .info__about .links .utils li a[data-v-2c556e24]:hover {\n  color: #263238;\n  text-decoration: none;\n}\n.wrapper .info__about .links .utils li a[data-v-2c556e24]:hover::after {\n  visibility: visible;\n  transform: scaleX(1);\n  width: 100%;\n}\n@media (min-width: 900px) {\n.wrapper .info__about .links .utils[data-v-2c556e24] {\n    margin-top: 0;\n}\n.wrapper .info__about .links .utils li a[data-v-2c556e24] {\n    font-size: 16px;\n    line-height: 24px;\n    white-space: nowrap;\n}\n.wrapper .info__about .links .utils .tooltip[data-v-2c556e24] {\n    top: 1px;\n    margin-left: 8px;\n}\n}\n.wrapper .info__cities[data-v-2c556e24] {\n  margin-left: 120px;\n}\n@media (max-width: 1024px) {\n.wrapper .info__cities[data-v-2c556e24] {\n    margin-left: 60px;\n    margin-right: 20px;\n}\n}\n@media (max-width: 900px) {\n.wrapper .info__cities[data-v-2c556e24] {\n    width: 100%;\n    margin-left: 0;\n    margin-right: 0;\n}\n}\n.wrapper .info__cities .list__cities[data-v-2c556e24] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n}\n@media (max-width: 900px) {\n.wrapper .info__cities .list__cities[data-v-2c556e24] {\n    align-items: center;\n    text-align: center;\n    margin-top: 36px;\n    margin-bottom: 64px;\n}\n}\n.wrapper .info__cities .list__cities li[data-v-2c556e24] {\n  display: block;\n  margin: 12px 0;\n  transition: all 0.35s ease;\n  position: relative;\n  width: 200px;\n}\n@media (max-width: 900px) {\n.wrapper .info__cities .list__cities li[data-v-2c556e24] {\n    display: flex;\n    justify-content: center;\n    width: 300px;\n    font-size: 20px;\n    line-height: 28px;\n}\n}\n.wrapper .info__cities .list__cities li a[data-v-2c556e24] {\n  font-weight: normal;\n  font-size: 16px;\n  line-height: 24px;\n  color: #263238;\n  position: relative;\n}\n@media (max-width: 900px) {\n.wrapper .info__cities .list__cities li a[data-v-2c556e24] {\n    font-size: 20px;\n    line-height: 28px;\n}\n}\n.wrapper .info__cities .list__cities li a[data-v-2c556e24]::after {\n  content: \"\";\n  position: absolute;\n  height: 1px;\n  bottom: 0;\n  left: 0;\n  background-color: #263238;\n  visibility: hidden;\n  transform: scaleX(0);\n  transition: all 0.3s ease-in-out;\n}\n.wrapper .info__cities .list__cities li a[data-v-2c556e24]:hover {\n  color: #263238;\n  text-decoration: none;\n}\n.wrapper .info__cities .list__cities li a[data-v-2c556e24]:hover::after {\n  visibility: visible;\n  transform: scaleX(1);\n  width: 100%;\n}\n.wrapper .copyright[data-v-2c556e24] {\n  background: #5d7a89;\n  height: 60px;\n  display: flex;\n  align-items: center;\n}\n@media (max-width: 1200px) {\n.wrapper .copyright[data-v-2c556e24] {\n    padding-left: 60px;\n}\n}\n@media (max-width: 900px) {\n.wrapper .copyright[data-v-2c556e24] {\n    height: 92px;\n    padding-left: 0;\n}\n}\n.wrapper .copyright .copyright__content[data-v-2c556e24] {\n  max-width: 1180px;\n  width: 100%;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n@media (max-width: 900px) {\n.wrapper .copyright .copyright__content[data-v-2c556e24] {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n}\n@media (max-width: 900px) {\n.wrapper .copyright .copyright__content img[data-v-2c556e24] {\n    margin-top: -14px;\n    width: 146px;\n}\n}\n.wrapper .copyright .copyright__content p[data-v-2c556e24] {\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 15px;\n  color: #ffffff;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n@media (max-width: 900px) {\n.wrapper .copyright .copyright__content p[data-v-2c556e24] {\n    margin-top: 10px;\n}\n}\n.wrapper .juridic[data-v-2c556e24] {\n  font-size: 10px;\n  text-align: center;\n  margin-bottom: 24px;\n}\n\n/*# sourceMappingURL=Footer.vue.map */", map: {"version":3,"sources":["/home/marcos/magspace/study/nina/packages/libs/molecules/src/Footer.vue","Footer.vue"],"names":[],"mappings":"AAoVA;EACA,iBAAA;EACA,WAAA;EACA,cAAA;EACA,aAAA;ACnVA;ADqVA;AANA;IAOA,kBAAA;AClVE;AACF;ADmVA;AATA;IAUA,sBAAA;IACA,eAAA;IACA,mBAAA;AChVE;AACF;ADkVA;EACA,gBAAA;EACA,yBAAA;EACA,aAAA;EACA,kBAAA;AChVA;ADkVA;AANA;IAOA,mBAAA;AC/UE;AACF;ADiVA;AAVA;IAWA,eAAA;IACA,WAAA;IACA,sBAAA;IACA,mBAAA;AC9UE;AACF;ADgVA;EACA,gBAAA;EACA,WAAA;EACA,cAAA;AC9UA;ADgVA;AALA;IAMA,eAAA;AC7UE;AACF;AD+UA;EACA,mBAAA;EACA,eAAA;EACA,iBAAA;EACA,yBAAA;EACA,cAAA;EACA,gBAAA;AC7UA;AD+UA;AARA;IASA,YAAA;IACA,eAAA;AC5UE;AACF;AD+UA;EACA,kBAAA;EACA,mBAAA;EACA,eAAA;EACA,cAAA;EACA,iBAAA;EACA,gBAAA;EACA,gBAAA;AC7UA;AD+UA;AATA;IAUA,eAAA;IACA,iBAAA;AC5UE;AACF;AD+UA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,iBAAA;EACA,kBAAA;EACA,cAAA;AC7UA;ADgVA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;AC9UA;ADgVA;EACA,+BAAA;EACA,WAAA;AC9UA;ADiVA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,WAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;AC/UA;ADiVA;EACA,qBAAA;AC/UA;ADkVA;EACA,iBAAA;AChVA;ADmVA;EACA,YAAA;EACA,kBAAA;ACjVA;ADmVA;AAJA;IAKA,YAAA;AChVE;AACF;ADqVA;EACA,gBAAA;EACA,aAAA;ACnVA;ADqVA;AAJA;IAKA,8BAAA;AClVE;AACF;ADoVA;EACA,kBAAA;AClVA;ADoVA;AAHA;IAIA,eAAA;ACjVE;AACF;ADoVA;EACA,eAAA;AClVA;ADsVA;EACA,aAAA;EACA,yBAAA;ACpVA;ADsVA;EACA,aAAA;ACpVA;ADwVA;AACA;IACA,WAAA;IACA,YAAA;ACtVE;AACF;AD2VA;EACA,aAAA;EACA,UAAA;EACA,+BAAA;EACA,iBAAA;ACzVA;AD2VA;AANA;IAOA,iBAAA;ACxVE;AACF;AD0VA;AAVA;IAWA,aAAA;ACvVE;AACF;AD0VA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,YAAA;EACA,gBAAA;ACxVA;AD0VA;EACA,qBAAA;EACA,mBAAA;EACA,QAAA;ACxVA;AD0VA;EACA,aAAA;EACA,sBAAA;ACxVA;AD0VA;EACA,mBAAA;ACxVA;AD4VA;EACA,aAAA;EACA,aAAA;EACA,0BAAA;EACA,YAAA;AC1VA;AD4VA;AANA;IAOA,uBAAA;IACA,eAAA;IACA,iBAAA;IACA,kBAAA;ACzVE;AACF;AD2VA;EACA,mBAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;ACzVA;AD2VA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,OAAA;EACA,yBAAA;EACA,kBAAA;EACA,oBAAA;EACA,gCAAA;ACzVA;AD4VA;EACA,cAAA;EACA,qBAAA;AC1VA;AD4VA;EACA,mBAAA;EACA,oBAAA;EACA,WAAA;AC1VA;ADgWA;AAlEA;IAmEA,aAAA;AC7VE;AD8VF;IACA,eAAA;IACA,iBAAA;IACA,mBAAA;AC5VE;AD8VF;IACA,QAAA;IACA,gBAAA;AC5VE;AACF;ADiWA;EACA,kBAAA;AC/VA;ADiWA;AAHA;IAIA,iBAAA;IACA,kBAAA;AC9VE;AACF;ADgWA;AARA;IASA,WAAA;IACA,cAAA;IACA,eAAA;AC7VE;AACF;AD+VA;EACA,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,YAAA;AC7VA;AD+VA;AANA;IAOA,mBAAA;IACA,kBAAA;IACA,gBAAA;IACA,mBAAA;AC5VE;AACF;AD8VA;EACA,cAAA;EACA,cAAA;EACA,0BAAA;EACA,kBAAA;EACA,YAAA;AC5VA;AD8VA;AAPA;IAQA,aAAA;IACA,uBAAA;IACA,YAAA;IACA,eAAA;IACA,iBAAA;AC3VE;AACF;AD4VA;EACA,mBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;AC1VA;AD4VA;AAPA;IAQA,eAAA;IACA,iBAAA;ACzVE;AACF;AD2VA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,OAAA;EACA,yBAAA;EACA,kBAAA;EACA,oBAAA;EACA,gCAAA;ACzVA;AD4VA;EACA,cAAA;EACA,qBAAA;AC1VA;AD4VA;EACA,mBAAA;EACA,oBAAA;EACA,WAAA;AC1VA;ADmWA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;AChWA;ADkWA;AANA;IAOA,kBAAA;AC/VE;AACF;ADiWA;AAVA;IAWA,YAAA;IACA,eAAA;AC9VE;AACF;ADgWA;EACA,iBAAA;EACA,WAAA;EACA,cAAA;EACA,aAAA;EACA,kCAAA;AC9VA;ADgWA;AAPA;IAQA,aAAA;IACA,sBAAA;IACA,uBAAA;IACA,mBAAA;AC7VE;AACF;ADgWA;AADA;IAEA,iBAAA;IACA,YAAA;AC7VE;AACF;ADgWA;EACA,mBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;AC9VA;AD+VA;AAVA;IAWA,gBAAA;AC5VE;AACF;ADiWA;EACA,eAAA;EACA,kBAAA;EACA,mBAAA;AC9VA;;AAEA,qCAAqC","file":"Footer.vue","sourcesContent":["<template>\n  <div class=\"wrapper\">\n    <section class=\"info\">\n      <div class=\"info__about\">\n        <div class=\"about\">\n          <h2>Sobre o <strong>Fatal Model</strong></h2>\n          <p class=\"description\">\n            Lançado em 2016, o Fatal Model é a maior plataforma de anúncios de\n            acompanhantes do Brasil. A missão Fatal Model é 'organizar e\n            dignificar o mercado de acompanhantes do mundo'. Acompanhantes\n            mulheres, homens e transex de todo o Brasil em mais de 25 mil\n            anúncios ativos.\n          </p>\n          <ul class=\"social__links\">\n            <li>\n              <a\n                href=\"https://www.youtube.com/c/FatalModel\"\n                target=\"_blank\"\n                title=\"Youtube Fatal Model\"\n              >\n                <svg\n                  xmlns=\"http://www.w3.org/2000/svg\"\n                  width=\"24\"\n                  height=\"24\"\n                  viewBox=\"0 0 32 32\"\n                >\n                  <title>Youtube Fatal Model</title>\n                  <path\n                    fill=\"#263238\"\n                    fill-rule=\"evenodd\"\n                    d=\"M28.1213 8.24389C27.663 7.64021 26.8821 7.17082 26.0507 7.01525C23.6069 6.55118 8.36122 6.54986 5.91882 7.01525C5.25209 7.14023 4.65841 7.44207 4.1484 7.91146C1.99948 9.90599 2.67284 20.602 3.19082 22.3347C3.40863 23.0846 3.6902 23.6258 4.04481 23.9808C4.50169 24.4502 5.12724 24.7733 5.84577 24.9182C7.8579 25.3344 18.224 25.5671 26.0082 24.9807C26.7254 24.8558 27.3602 24.522 27.8609 24.0327C29.8478 22.0461 29.7123 10.749 28.1212 8.24387M13.3178 19.448V11.9659C15.9741 13.2158 18.0314 14.4231 20.4645 15.7249C18.4577 16.8378 15.9741 18.0864 13.3178 19.448Z\"\n                  />\n                </svg>\n              </a>\n            </li>\n            <li>\n              <a\n                href=\"https://www.instagram.com/fatal_modelbr/\"\n                target=\"_blank\"\n                title=\"Instagram Fatal Model\"\n              >\n                <svg\n                  xmlns=\"http://www.w3.org/2000/svg\"\n                  width=\"24\"\n                  height=\"24\"\n                  viewBox=\"0 0 32 32\"\n                >\n                  <title>Instagram Fatal Model</title>\n                  <path\n                    fill=\"#263238\"\n                    fill-rule=\"evenodd\"\n                    d=\"M10.4927 2.83689C8.3222 2.93483 6.44091 3.46552 4.92182 4.9782C3.39742 6.49883 2.87336 8.38736 2.77519 10.5353C2.71416 11.8759 2.35727 22.0042 3.39211 24.6604C4.08997 26.4523 5.46445 27.83 7.27277 28.5301C8.11656 28.8583 9.07975 29.0806 10.4927 29.1455C22.3071 29.6801 26.6866 29.389 28.5334 24.6604C28.8611 23.8187 29.0866 22.8565 29.149 21.4471C29.6889 9.60235 29.0614 7.03493 27.0023 4.97827C25.3692 3.34912 23.4482 2.24003 10.4927 2.83689ZM10.6014 26.7632C9.30786 26.705 8.60602 26.4893 8.13769 26.308C6.95956 25.8501 6.07465 24.9687 5.61958 23.7974C4.83151 21.7792 5.09288 12.1936 5.16319 10.6425C5.23218 9.12319 5.53998 7.73491 6.61196 6.66293C7.93868 5.33949 9.6528 4.69101 21.324 5.21775C22.847 5.28656 24.2388 5.5936 25.3134 6.66293C26.6401 7.98636 27.2982 9.71344 26.7622 21.3399C26.7038 22.6302 26.4875 23.3303 26.3058 23.7975C25.1051 26.8745 22.3429 27.3019 10.6014 26.7632ZM21.4526 8.92609C21.4526 9.80221 22.1651 10.5142 23.0447 10.5142C23.9243 10.5142 24.6381 9.80221 24.6381 8.92609C24.6381 8.04999 23.9243 7.33797 23.0447 7.33797C22.1651 7.33797 21.4526 8.04999 21.4526 8.92609ZM9.14996 15.9906C9.14996 19.7438 12.2001 22.7864 15.9627 22.7864C19.7252 22.7864 22.7753 19.7438 22.7753 15.9906C22.7753 12.2373 19.7252 9.19608 15.9627 9.19608C12.2001 9.19608 9.14996 12.2373 9.14996 15.9906ZM11.5407 15.9906C11.5407 13.5555 13.5202 11.5796 15.9627 11.5796C18.4051 11.5796 20.3846 13.5555 20.3846 15.9906C20.3846 18.427 18.4051 20.4029 15.9627 20.4029C13.5202 20.4029 11.5407 18.427 11.5407 15.9906Z\"\n                  />\n                </svg>\n              </a>\n            </li>\n            <li>\n              <a\n                href=\"https://www.facebook.com/FatalModelBr\"\n                target=\"_blank\"\n                title=\"Facebook Fatal Model\"\n              >\n                <svg\n                  xmlns=\"http://www.w3.org/2000/svg\"\n                  width=\"24\"\n                  height=\"24\"\n                  viewBox=\"0 0 32 32\"\n                >\n                  <title>Facebook Fatal Model</title>\n                  <path\n                    fill=\"#263238\"\n                    fill-rule=\"evenodd\"\n                    d=\"M2.66663 16C2.66663 8.63601 8.63596 2.66667 16 2.66667V2.66801C23.364 2.66801 29.3333 8.63734 29.3333 16C29.3333 23.364 23.364 29.3333 16 29.3333C8.63596 29.3333 2.66663 23.364 2.66663 16ZM18.0933 19.8532V29.1699C17.4114 29.2774 16.7122 29.3332 16 29.3332C15.2924 29.3332 14.5977 29.2781 13.92 29.1719V19.8532H10.5333V15.9999H13.92V13.0666C13.92 9.71989 15.9067 7.87989 18.96 7.87989C20.4133 7.87989 21.9467 8.14655 21.9467 8.14655V11.4266H20.2667C18.6133 11.4266 18.0933 12.4532 18.0933 13.5066V15.9999H21.7867L21.2 19.8532H18.0933Z\"\n                  />\n                </svg>\n              </a>\n            </li>\n            <li>\n              <a\n                href=\"https://twitter.com/FatalModel\"\n                target=\"_blank\"\n                title=\"Twitter Fatal Model\"\n              >\n                <svg\n                  xmlns=\"http://www.w3.org/2000/svg\"\n                  width=\"24\"\n                  height=\"24\"\n                  viewBox=\"0 0 24 24\"\n                >\n                  <title>Twitter Fatal Model</title>\n                  <path\n                    fill=\"#263238\"\n                    fill-rule=\"evenodd\"\n                    d=\"M8.29 20.002C15.837 20.002 19.965 13.8457 19.965 8.5075C19.965 8.33225 19.965 8.15799 19.953 7.98471C20.756 7.41367 21.449 6.7048 22 5.89354C21.252 6.22041 20.457 6.43504 19.644 6.52955C20.5 6.02448 21.141 5.23094 21.448 4.29464C20.642 4.76525 19.761 5.09704 18.842 5.27525C17.288 3.64878 14.689 3.57002 13.036 5.1C11.971 6.08651 11.518 7.55742 11.849 8.96039C8.55 8.79696 5.476 7.26304 3.392 4.73966C2.303 6.58567 2.86 8.94661 4.663 10.132C4.01 10.1133 3.371 9.94001 2.8 9.62693V9.67812C2.801 11.6009 4.178 13.2569 6.092 13.638C5.488 13.8004 4.854 13.824 4.24 13.7069C4.777 15.353 6.318 16.4803 8.073 16.5128C6.62 17.6372 4.825 18.2476 2.977 18.2456C2.651 18.2446 2.325 18.2259 2 18.1875C3.877 19.3729 6.06 20.002 8.29 19.9991\"\n                  />\n                </svg>\n              </a>\n            </li>\n            <li>\n              <a\n                href=\"https://open.spotify.com/show/5svuSmKRcanDd2dMwj8HiB\"\n                target=\"_blank\"\n                title=\"Spotify Fatal Model\"\n              >\n                <svg\n                  xmlns=\"http://www.w3.org/2000/svg\"\n                  width=\"24\"\n                  height=\"24\"\n                  viewBox=\"0 0 32 32\"\n                >\n                  <title>Spotify Fatal Model</title>\n                  <path\n                    fill=\"#263238\"\n                    fill-rule=\"evenodd\"\n                    d=\"M2.66663 16C2.66663 8.63601 8.63596 2.66667 16 2.66667V2.66801C23.364 2.66801 29.3333 8.63734 29.3333 16C29.3333 23.364 23.364 29.3333 16 29.3333C8.63596 29.3333 2.66663 23.364 2.66663 16ZM8.39596 12.9453C12.5 11.7 19.5893 11.9347 23.8866 14.4867C24.4773 14.8387 25.2453 14.6427 25.5946 14.0507C25.9466 13.4587 25.752 12.6933 25.16 12.3413C20.212 9.40399 12.3826 9.12799 7.67196 10.5587C7.01329 10.7587 6.64129 11.4547 6.84129 12.1133C7.04129 12.7733 7.73729 13.144 8.39596 12.9453ZM22.316 18.6094C22.8053 18.9094 23.4453 18.7561 23.7466 18.2667C24.0466 17.7787 23.8933 17.1387 23.404 16.8387C19.288 14.3094 13.268 13.5974 8.42663 15.0667C7.8773 15.2334 7.56797 15.8134 7.7333 16.3627C7.89997 16.9121 8.47997 17.2214 9.03063 17.0561C13.2693 15.7694 18.7333 16.4067 22.316 18.6094ZM20.972 22.1733C21.364 22.4133 21.8746 22.2893 22.1146 21.8973C22.3546 21.5053 22.2306 20.9946 21.8386 20.7546C18.324 18.6066 13.968 18.1066 8.88929 19.268C8.43995 19.3706 8.16128 19.816 8.26395 20.2626C8.36528 20.7106 8.81195 20.9906 9.25862 20.888C13.9 19.828 17.8413 20.26 20.972 22.1733Z\"\n                  />\n                </svg>\n              </a>\n            </li>\n            <li>\n              <span v-if=\"viewportWidth < 900\">\n                <a>\n                  <svg\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                    width=\"24\"\n                    height=\"24\"\n                    viewBox=\"0 0 32 32\"\n                  >\n                    <title>Telegram Fatal Model</title>\n                    <path\n                      fill=\"#263238\"\n                      fill-rule=\"evenodd\"\n                      d=\"M29.3333 16C29.3333 23.3638 23.3638 29.3333 16 29.3333C8.63616 29.3333 2.66663 23.3638 2.66663 16C2.66663 8.63621 8.63616 2.66667 16 2.66667C23.3638 2.66667 29.3333 8.63621 29.3333 16ZM17.6356 11.1825L8.89914 15.14C7.36182 15.7996 8.26171 16.418 8.26171 16.418C8.26171 16.418 9.57405 16.9127 10.6989 17.2837C11.8238 17.6547 12.4237 17.2425 12.4237 17.2425L17.7106 13.3262C19.5853 11.9245 19.1354 13.0788 18.6854 13.5735C17.7106 14.6453 16.0983 16.3356 14.7484 17.696C14.1485 18.2731 14.4485 18.7678 14.7109 19.0152C15.474 19.725 17.2706 21.0157 18.0874 21.6024C18.3141 21.7654 18.4654 21.874 18.498 21.9009C18.6854 22.0658 19.7353 22.8078 20.3727 22.6429C21.0102 22.478 21.0852 21.5299 21.0852 21.5299L22.0225 15.0576C22.1058 14.4508 22.1891 13.8568 22.2668 13.3029C22.4689 11.8621 22.6329 10.6924 22.66 10.2755C22.7725 8.8739 21.4226 9.45105 21.4226 9.45105C21.4226 9.45105 18.498 10.7702 17.6356 11.1825Z\"\n                    />\n                  </svg>\n                </a>\n              </span>\n              <span v-else>\n                <a>\n                  <svg\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                    width=\"24\"\n                    height=\"24\"\n                    viewBox=\"0 0 32 32\"\n                  >\n                    <title>Telegram Fatal Model</title>\n                    <path\n                      fill=\"#263238\"\n                      fill-rule=\"evenodd\"\n                      d=\"M29.3333 16C29.3333 23.3638 23.3638 29.3333 16 29.3333C8.63616 29.3333 2.66663 23.3638 2.66663 16C2.66663 8.63621 8.63616 2.66667 16 2.66667C23.3638 2.66667 29.3333 8.63621 29.3333 16ZM17.6356 11.1825L8.89914 15.14C7.36182 15.7996 8.26171 16.418 8.26171 16.418C8.26171 16.418 9.57405 16.9127 10.6989 17.2837C11.8238 17.6547 12.4237 17.2425 12.4237 17.2425L17.7106 13.3262C19.5853 11.9245 19.1354 13.0788 18.6854 13.5735C17.7106 14.6453 16.0983 16.3356 14.7484 17.696C14.1485 18.2731 14.4485 18.7678 14.7109 19.0152C15.474 19.725 17.2706 21.0157 18.0874 21.6024C18.3141 21.7654 18.4654 21.874 18.498 21.9009C18.6854 22.0658 19.7353 22.8078 20.3727 22.6429C21.0102 22.478 21.0852 21.5299 21.0852 21.5299L22.0225 15.0576C22.1058 14.4508 22.1891 13.8568 22.2668 13.3029C22.4689 11.8621 22.6329 10.6924 22.66 10.2755C22.7725 8.8739 21.4226 9.45105 21.4226 9.45105C21.4226 9.45105 18.498 10.7702 17.6356 11.1825Z\"\n                    />\n                  </svg>\n                </a>\n              </span>\n            </li>\n            <li>\n              <a\n                href=\"https://www.tiktok.com/@fatalmodel\"\n                target=\"_blank\"\n                title=\"Tiktok Fatal Model\"\n              >\n                <svg\n                  width=\"24\"\n                  height=\"24\"\n                  viewBox=\"0 0 32 32\"\n                  xmlns=\"http://www.w3.org/2000/svg\"\n                >\n                  <title>Tiktok Fatal Model</title>\n                  <path\n                    d=\"M22.1335 7.76C22.1335 7.76 22.8135 8.42667 22.1335 7.76C21.2221 6.7195 20.7198 5.38324 20.7202 4H16.6002V20.5333C16.5684 21.428 16.1907 22.2755 15.5466 22.8973C14.9024 23.519 14.0421 23.8665 13.1469 23.8667C11.2535 23.8667 9.68021 22.32 9.68021 20.4C9.68021 18.1067 11.8935 16.3867 14.1735 17.0933V12.88C9.57354 12.2667 5.54688 15.84 5.54688 20.4C5.54688 24.84 9.22688 28 13.1335 28C17.3202 28 20.7202 24.6 20.7202 20.4V12.0133C22.3909 13.2131 24.3967 13.8569 26.4535 13.8533V9.73333C26.4535 9.73333 23.9469 9.85333 22.1335 7.76Z\"\n                    fill=\"#263238\"\n                    fill-rule=\"evenodd\"\n                  />\n                </svg>\n              </a>\n            </li>\n          </ul>\n\n          <options-telegram-footer v-if=\"openModal\" @close=\"closeModalTelegram\">\n            <template #icon>\n              <icon-telegram :width=\"34\" :height=\"34\" color=\"#5D7A89\" />\n              <div class=\"title__modal mt-20 mb-20\">Telegram</div>\n            </template>\n\n            <template #content>\n              <div class=\"options__content\">\n                <hr />\n                <a\n                  class=\"link\"\n                  title=\"Bot Telegram Fatal Model\"\n                  href=\"https://t.me/appscalculatorbot\"\n                  target=\"_blank\"\n                >\n                  <span>Bot Telegram para contratantes</span>\n                  <icon-external-link :width=\"20\" :height=\"20\" />\n                </a>\n                <hr />\n                <a\n                  class=\"link\"\n                  title=\"Canal Telegram Fatal Model\"\n                  href=\"https://t.me/novidadesfatalmodel\"\n                  target=\"_blank\"\n                >\n                  <span>Canal Telegram para acompanhantes</span>\n                  <icon-external-link :width=\"20\" :height=\"20\" />\n                </a>\n              </div>\n            </template>\n          </options-telegram-footer>\n        </div>\n        <hr class=\"divisor\" />\n        <nav class=\"links\">\n          <ul class=\"utils\">\n            <li>\n              <a href=\"/blog/\" target=\"_blank\" title=\"Blog Fatal Model\"\n                >Fatal Blog</a\n              >\n            </li>\n            <li>\n              <a href=\"/contact\" target=\"_blank\" title=\"Fale Conosco\"\n                >Fale Conosco</a\n              >\n            </li>\n            <li>\n              <a\n                href=\"https://fatalmodel.movidesk.com/kb\"\n                target=\"_blank\"\n                title=\"Perguntas Frequentes\"\n                >Perguntas Frequentes</a\n              >\n            </li>\n            <li v-if=\"!isConsumer\">\n              <a href=\"/planos\" target=\"_blank\" title=\"Planos para anunciantes\"\n                >Planos para anunciantes</a\n              >\n            </li>\n            <li>\n              <a href=\"/terms\" target=\"_blank\" title=\"Termos de uso\"\n                >Termos de uso</a\n              >\n            </li>\n            <li>\n              <a\n                href=\"tel:100\"\n                title=\"Denunciar Exploração Sexual\"\n                >Denunciar Exploração Sexual</a\n              >\n              <tooltip-information class=\"tooltip\" :icon-size=\"20\">\n                <template #content>\n                  <div class=\"tooltip__info\">\n                    <p class=\"tooltip__paragraph\">\n                      Exploração Sexual é a condição análoga à escravidão em que\n                      uma pessoa se beneficia sexualmente de outra pessoa sendo\n                      um crime previsto pela Constituição.\n                    </p>\n                    <p class=\"tooltip__paragraph\">\n                      Caso esteja em uma situação assim, ou conheça alguém que\n                      está, denuncie através do link ligando para o Disque\n                      Direitos Humanos (Disque 100).\n                    </p>\n                    <p class=\"tooltip__paragraph\">\n                      O Disque Direitos Humanos é um serviço de disseminação de\n                      informações sobre direitos de grupos vulneráveis e de\n                      denúncias de violações de direitos humanos.\n                    </p>\n                  </div>\n                </template>\n              </tooltip-information>\n            </li>\n          </ul>\n        </nav>\n      </div>\n      <nav class=\"info__cities\">\n        <ul class=\"list__cities\">\n          <li>\n            <a\n              href=\"/acompanhantes-curitiba-pr\"\n              title=\"Acompanhantes em Curitiba\"\n            >\n              Curitiba - PR\n            </a>\n          </li>\n          <li>\n            <a\n              href=\"/acompanhantes-campinas-sp\"\n              title=\"Acompanhantes em Campinas\"\n            >\n              Campinas - SP\n            </a>\n          </li>\n          <li>\n            <a\n              href=\"/acompanhantes-sao-paulo-sp\"\n              title=\"Acompanhantes em São Paulo\"\n            >\n              São Paulo - SP\n            </a>\n          </li>\n          <li>\n            <a href=\"/acompanhantes-manaus-am\" title=\"Acompanhantes em Manaus\">\n              Manaus - AM\n            </a>\n          </li>\n          <li>\n            <a\n              href=\"/acompanhantes-belo-horizonte-mg\"\n              title=\"Acompanhantes em Belo Horizonte\"\n            >\n              Belo Horizonte - MG\n            </a>\n          </li>\n          <li>\n            <a href=\"/acompanhantes-recife-pe\" title=\"Acompanhantes em Recife\">\n              Recife - PE\n            </a>\n          </li>\n        </ul>\n      </nav>\n    </section>\n    <section class=\"juridic\">\n      <div>CNPJ: {{ cnpj }}</div>\n    </section>\n    <section class=\"copyright\">\n      <div class=\"copyright__content\">\n        <img :src=\"logoFatal\" alt=\"Acompanhantes Fatal Model\" />\n        <p>Copyright {{ yearCopyright }} © Fatal Model.</p>\n      </div>\n    </section>\n  </div>\n</template>\n\n<script>\nexport default {\n  updated() {\n    this.viewportWidth = window.innerWidth\n  },\n}\n</script>\n\n<style scoped lang=\"scss\">\n.wrapper .info {\n  max-width: 1180px;\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n\n  @media (max-width: 1200px) {\n    padding-left: 60px;\n  }\n  @media (max-width: 900px) {\n    flex-direction: column;\n    padding-left: 0;\n    align-items: center;\n  }\n\n  &__about {\n    max-width: 910px;\n    padding: 80px 60px 80px 0;\n    display: flex;\n    position: relative;\n\n    @media (max-width: 1024px) {\n      padding-right: 40px;\n    }\n\n    @media (max-width: 900px) {\n      padding: 40px 0;\n      width: 100%;\n      flex-direction: column;\n      align-items: center;\n    }\n\n    .about {\n      max-width: 380px;\n      width: 100%;\n      color: #263238;\n\n      @media (max-width: 900px) {\n        padding: 0 32px;\n      }\n\n      h2 {\n        font-weight: normal;\n        font-size: 28px;\n        line-height: 28px;\n        text-transform: uppercase;\n        color: #263238;\n        max-width: 380px;\n\n        @media (max-width: 900px) {\n          width: 180px;\n          font-size: 24px;\n        }\n      }\n\n      .description {\n        font-style: italic;\n        font-weight: normal;\n        font-size: 16px;\n        color: #263238;\n        line-height: 20px;\n        max-width: 380px;\n        margin-top: 32px;\n\n        @media (max-width: 900px) {\n          font-size: 14px;\n          line-height: 17px;\n        }\n      }\n\n      .title__modal {\n        font-size: 18px;\n        font-weight: 600;\n        font-style: normal;\n        line-height: 105%;\n        text-align: center;\n        color: #5d7a89;\n      }\n\n      .options__content {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n\n        hr {\n          background: rgba(0, 0, 0, 0.15);\n          width: 100%;\n        }\n\n        .link {\n          padding: 10px 20px;\n          font-weight: 600;\n          font-size: 16px;\n          line-height: 22px;\n          color: #344fa5;\n          width: 100%;\n          display: flex;\n          align-items: center;\n          justify-content: space-between;\n\n          &:hover {\n            text-decoration: none;\n          }\n\n          &:last-child {\n            padding-bottom: 0;\n          }\n\n          span {\n            width: 312px;\n            margin-right: 12px;\n\n            @media (max-width: 900px) {\n              width: 228px;\n            }\n          }\n        }\n      }\n\n      .social__links {\n        margin-top: 24px;\n        display: flex;\n\n        @media (max-width: 900px) {\n          justify-content: space-between;\n        }\n\n        a {\n          margin-right: 18px;\n\n          @media (max-width: 900px) {\n            margin-right: 0;\n          }\n        }\n\n        span {\n          cursor: pointer;\n        }\n\n        svg {\n          path {\n            fill: #263238;\n            transition: all ease 0.2s;\n          }\n          &:hover path {\n            fill: #e25352;\n          }\n        }\n\n        @media (max-width: 900px) {\n          svg {\n            width: 32px;\n            height: 32px;\n          }\n        }\n      }\n    }\n\n    .divisor {\n      height: 160px;\n      width: 1px;\n      background: rgba(0, 0, 0, 0.15);\n      margin: auto 60px;\n\n      @media (max-width: 1024px) {\n        margin: auto 30px;\n      }\n\n      @media (max-width: 900px) {\n        display: none;\n      }\n    }\n\n    .links .utils {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      height: 100%;\n      margin-top: 38px;\n\n      .tooltip {\n        display: inline-block;\n        height: fit-content;\n        top: 3px;\n\n        &__info {\n          display: flex;\n          flex-direction: column;\n        }\n        &__paragraph:not(:last-child) {\n          margin-bottom: 16px;\n        }\n      }\n\n      li {\n        display: flex;\n        margin: 6px 0;\n        transition: all 0.35s ease;\n        width: 260px;\n\n        @media (max-width: 900px) {\n          justify-content: center;\n          font-size: 20px;\n          line-height: 28px;\n          text-align: center;\n        }\n\n        a {\n          font-weight: normal;\n          color: #263238;\n          font-size: 20px;\n          line-height: 28px;\n          position: relative;\n\n          &::after {\n            content: '';\n            position: absolute;\n            height: 1px;\n            bottom: 0;\n            left: 0;\n            background-color: #263238;\n            visibility: hidden;\n            transform: scaleX(0);\n            transition: all 0.3s ease-in-out;\n          }\n\n          &:hover {\n            color: #263238;\n            text-decoration: none;\n\n            &::after {\n              visibility: visible;\n              transform: scaleX(1);\n              width: 100%;\n            }\n          }\n        }\n      }\n\n      @media (min-width: 900px) {\n        margin-top: 0;\n        li a {\n          font-size: 16px;\n          line-height: 24px;\n          white-space: nowrap;\n        }\n        .tooltip {\n          top: 1px;\n          margin-left: 8px;\n        }\n      }\n    }\n  }\n\n  &__cities {\n    margin-left: 120px;\n\n    @media (max-width: 1024px) {\n      margin-left: 60px;\n      margin-right: 20px;\n    }\n\n    @media (max-width: 900px) {\n      width: 100%;\n      margin-left: 0;\n      margin-right: 0;\n    }\n\n    .list__cities {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      height: 100%;\n\n      @media (max-width: 900px) {\n        align-items: center;\n        text-align: center;\n        margin-top: 36px;\n        margin-bottom: 64px;\n      }\n\n      li {\n        display: block;\n        margin: 12px 0;\n        transition: all 0.35s ease;\n        position: relative;\n        width: 200px;\n\n        @media (max-width: 900px) {\n          display: flex;\n          justify-content: center;\n          width: 300px;\n          font-size: 20px;\n          line-height: 28px;\n        }\n        a {\n          font-weight: normal;\n          font-size: 16px;\n          line-height: 24px;\n          color: #263238;\n          position: relative;\n\n          @media (max-width: 900px) {\n            font-size: 20px;\n            line-height: 28px;\n          }\n\n          &::after {\n            content: '';\n            position: absolute;\n            height: 1px;\n            bottom: 0;\n            left: 0;\n            background-color: #263238;\n            visibility: hidden;\n            transform: scaleX(0);\n            transition: all 0.3s ease-in-out;\n          }\n\n          &:hover {\n            color: #263238;\n            text-decoration: none;\n\n            &::after {\n              visibility: visible;\n              transform: scaleX(1);\n              width: 100%;\n            }\n          }\n        }\n      }\n    }\n  }\n}\n\n.wrapper .copyright {\n  background: #5d7a89;\n  height: 60px;\n  display: flex;\n  align-items: center;\n\n  @media (max-width: 1200px) {\n    padding-left: 60px;\n  }\n\n  @media (max-width: 900px) {\n    height: 92px;\n    padding-left: 0;\n  }\n\n  .copyright__content {\n    max-width: 1180px;\n    width: 100%;\n    margin: 0 auto;\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n\n    @media (max-width: 900px) {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n    }\n\n    img {\n      @media (max-width: 900px) {\n        margin-top: -14px;\n        width: 146px;\n      }\n    }\n\n    p {\n      font-weight: normal;\n      font-size: 12px;\n      line-height: 15px;\n      color: #ffffff;\n      text-align: center;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 100%;\n      @media (max-width: 900px) {\n        margin-top: 10px;\n      }\n    }\n  }\n}\n\n.wrapper .juridic {\n  font-size: 10px;\n  text-align: center;\n  margin-bottom: 24px;\n}\n</style>\n",".wrapper .info {\n  max-width: 1180px;\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n}\n@media (max-width: 1200px) {\n  .wrapper .info {\n    padding-left: 60px;\n  }\n}\n@media (max-width: 900px) {\n  .wrapper .info {\n    flex-direction: column;\n    padding-left: 0;\n    align-items: center;\n  }\n}\n.wrapper .info__about {\n  max-width: 910px;\n  padding: 80px 60px 80px 0;\n  display: flex;\n  position: relative;\n}\n@media (max-width: 1024px) {\n  .wrapper .info__about {\n    padding-right: 40px;\n  }\n}\n@media (max-width: 900px) {\n  .wrapper .info__about {\n    padding: 40px 0;\n    width: 100%;\n    flex-direction: column;\n    align-items: center;\n  }\n}\n.wrapper .info__about .about {\n  max-width: 380px;\n  width: 100%;\n  color: #263238;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about {\n    padding: 0 32px;\n  }\n}\n.wrapper .info__about .about h2 {\n  font-weight: normal;\n  font-size: 28px;\n  line-height: 28px;\n  text-transform: uppercase;\n  color: #263238;\n  max-width: 380px;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about h2 {\n    width: 180px;\n    font-size: 24px;\n  }\n}\n.wrapper .info__about .about .description {\n  font-style: italic;\n  font-weight: normal;\n  font-size: 16px;\n  color: #263238;\n  line-height: 20px;\n  max-width: 380px;\n  margin-top: 32px;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about .description {\n    font-size: 14px;\n    line-height: 17px;\n  }\n}\n.wrapper .info__about .about .title__modal {\n  font-size: 18px;\n  font-weight: 600;\n  font-style: normal;\n  line-height: 105%;\n  text-align: center;\n  color: #5d7a89;\n}\n.wrapper .info__about .about .options__content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.wrapper .info__about .about .options__content hr {\n  background: rgba(0, 0, 0, 0.15);\n  width: 100%;\n}\n.wrapper .info__about .about .options__content .link {\n  padding: 10px 20px;\n  font-weight: 600;\n  font-size: 16px;\n  line-height: 22px;\n  color: #344fa5;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.wrapper .info__about .about .options__content .link:hover {\n  text-decoration: none;\n}\n.wrapper .info__about .about .options__content .link:last-child {\n  padding-bottom: 0;\n}\n.wrapper .info__about .about .options__content .link span {\n  width: 312px;\n  margin-right: 12px;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about .options__content .link span {\n    width: 228px;\n  }\n}\n.wrapper .info__about .about .social__links {\n  margin-top: 24px;\n  display: flex;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about .social__links {\n    justify-content: space-between;\n  }\n}\n.wrapper .info__about .about .social__links a {\n  margin-right: 18px;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about .social__links a {\n    margin-right: 0;\n  }\n}\n.wrapper .info__about .about .social__links span {\n  cursor: pointer;\n}\n.wrapper .info__about .about .social__links svg path {\n  fill: #263238;\n  transition: all ease 0.2s;\n}\n.wrapper .info__about .about .social__links svg:hover path {\n  fill: #e25352;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .about .social__links svg {\n    width: 32px;\n    height: 32px;\n  }\n}\n.wrapper .info__about .divisor {\n  height: 160px;\n  width: 1px;\n  background: rgba(0, 0, 0, 0.15);\n  margin: auto 60px;\n}\n@media (max-width: 1024px) {\n  .wrapper .info__about .divisor {\n    margin: auto 30px;\n  }\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .divisor {\n    display: none;\n  }\n}\n.wrapper .info__about .links .utils {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n  margin-top: 38px;\n}\n.wrapper .info__about .links .utils .tooltip {\n  display: inline-block;\n  height: fit-content;\n  top: 3px;\n}\n.wrapper .info__about .links .utils .tooltip__info {\n  display: flex;\n  flex-direction: column;\n}\n.wrapper .info__about .links .utils .tooltip__paragraph:not(:last-child) {\n  margin-bottom: 16px;\n}\n.wrapper .info__about .links .utils li {\n  display: flex;\n  margin: 6px 0;\n  transition: all 0.35s ease;\n  width: 260px;\n}\n@media (max-width: 900px) {\n  .wrapper .info__about .links .utils li {\n    justify-content: center;\n    font-size: 20px;\n    line-height: 28px;\n    text-align: center;\n  }\n}\n.wrapper .info__about .links .utils li a {\n  font-weight: normal;\n  color: #263238;\n  font-size: 20px;\n  line-height: 28px;\n  position: relative;\n}\n.wrapper .info__about .links .utils li a::after {\n  content: \"\";\n  position: absolute;\n  height: 1px;\n  bottom: 0;\n  left: 0;\n  background-color: #263238;\n  visibility: hidden;\n  transform: scaleX(0);\n  transition: all 0.3s ease-in-out;\n}\n.wrapper .info__about .links .utils li a:hover {\n  color: #263238;\n  text-decoration: none;\n}\n.wrapper .info__about .links .utils li a:hover::after {\n  visibility: visible;\n  transform: scaleX(1);\n  width: 100%;\n}\n@media (min-width: 900px) {\n  .wrapper .info__about .links .utils {\n    margin-top: 0;\n  }\n  .wrapper .info__about .links .utils li a {\n    font-size: 16px;\n    line-height: 24px;\n    white-space: nowrap;\n  }\n  .wrapper .info__about .links .utils .tooltip {\n    top: 1px;\n    margin-left: 8px;\n  }\n}\n.wrapper .info__cities {\n  margin-left: 120px;\n}\n@media (max-width: 1024px) {\n  .wrapper .info__cities {\n    margin-left: 60px;\n    margin-right: 20px;\n  }\n}\n@media (max-width: 900px) {\n  .wrapper .info__cities {\n    width: 100%;\n    margin-left: 0;\n    margin-right: 0;\n  }\n}\n.wrapper .info__cities .list__cities {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n}\n@media (max-width: 900px) {\n  .wrapper .info__cities .list__cities {\n    align-items: center;\n    text-align: center;\n    margin-top: 36px;\n    margin-bottom: 64px;\n  }\n}\n.wrapper .info__cities .list__cities li {\n  display: block;\n  margin: 12px 0;\n  transition: all 0.35s ease;\n  position: relative;\n  width: 200px;\n}\n@media (max-width: 900px) {\n  .wrapper .info__cities .list__cities li {\n    display: flex;\n    justify-content: center;\n    width: 300px;\n    font-size: 20px;\n    line-height: 28px;\n  }\n}\n.wrapper .info__cities .list__cities li a {\n  font-weight: normal;\n  font-size: 16px;\n  line-height: 24px;\n  color: #263238;\n  position: relative;\n}\n@media (max-width: 900px) {\n  .wrapper .info__cities .list__cities li a {\n    font-size: 20px;\n    line-height: 28px;\n  }\n}\n.wrapper .info__cities .list__cities li a::after {\n  content: \"\";\n  position: absolute;\n  height: 1px;\n  bottom: 0;\n  left: 0;\n  background-color: #263238;\n  visibility: hidden;\n  transform: scaleX(0);\n  transition: all 0.3s ease-in-out;\n}\n.wrapper .info__cities .list__cities li a:hover {\n  color: #263238;\n  text-decoration: none;\n}\n.wrapper .info__cities .list__cities li a:hover::after {\n  visibility: visible;\n  transform: scaleX(1);\n  width: 100%;\n}\n\n.wrapper .copyright {\n  background: #5d7a89;\n  height: 60px;\n  display: flex;\n  align-items: center;\n}\n@media (max-width: 1200px) {\n  .wrapper .copyright {\n    padding-left: 60px;\n  }\n}\n@media (max-width: 900px) {\n  .wrapper .copyright {\n    height: 92px;\n    padding-left: 0;\n  }\n}\n.wrapper .copyright .copyright__content {\n  max-width: 1180px;\n  width: 100%;\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n@media (max-width: 900px) {\n  .wrapper .copyright .copyright__content {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n}\n@media (max-width: 900px) {\n  .wrapper .copyright .copyright__content img {\n    margin-top: -14px;\n    width: 146px;\n  }\n}\n.wrapper .copyright .copyright__content p {\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 15px;\n  color: #ffffff;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n@media (max-width: 900px) {\n  .wrapper .copyright .copyright__content p {\n    margin-top: 10px;\n  }\n}\n\n.wrapper .juridic {\n  font-size: 10px;\n  text-align: center;\n  margin-bottom: 24px;\n}\n\n/*# sourceMappingURL=Footer.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-2c556e24";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
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
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('Footer', __vue_component__);
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

export default __vue_component__;
export { install };