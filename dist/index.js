"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  HotkeyDirective: () => buildDirective,
  default: () => src_default,
  useHotkey: () => useHotkey
});
module.exports = __toCommonJS(src_exports);

// src/helpers.js
var areObjectsEqual = (a, b) => Object.entries(a).every(([key, value]) => b[key] === value);
var splitCombination = (combination) => {
  combination = combination.replace(/\s/g, "");
  combination = combination.includes("numpad+") ? combination.replace("numpad+", "numpadadd") : combination;
  combination = combination.includes("++") ? combination.replace("++", "+=") : combination;
  return combination.split(/\+{1}/);
};
var returnCharCode = (key) => key.length === 1 ? key.charCodeAt(0) : void 0;
var getHotkeyCallback = (keyMap, keyCode, eventKeyModifiers) => {
  const key = keyMap.find(
    ({ code, modifiers }) => code === keyCode && areObjectsEqual(eventKeyModifiers, modifiers)
  );
  if (!key)
    return false;
  return key.callback;
};
var assignKeyHandler = (e, keyMap, modifiers) => {
  const { keyCode, ctrlKey, altKey, shiftKey, metaKey } = e;
  const eventKeyModifiers = { ctrlKey, altKey, shiftKey, metaKey };
  if (modifiers.prevent)
    e.preventDefault();
  if (modifiers.stop)
    e.stopPropagation();
  const callback = getHotkeyCallback(keyMap, keyCode, eventKeyModifiers);
  if (!callback)
    return e;
  e.preventDefault();
  callback[e.type](e);
};

// src/keycodes/aliases.js
var aliases_default = {
  "windows": 91,
  "\u21E7": 16,
  "\u2325": 18,
  "\u2303": 17,
  "\u2318": 91,
  "ctl": 17,
  "control": 17,
  "option": 18,
  "pause": 19,
  "break": 19,
  "caps": 20,
  "return": 13,
  "escape": 27,
  "spc": 32,
  "pgup": 33,
  "pgdn": 34,
  "ins": 45,
  "del": 46,
  "cmd": 91
};

// src/keycodes/functionkeys.js
var functionkeys_default = {
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123
};

// src/keycodes/lowercase.js
var lowercase_default = {
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90
};

// src/keycodes/numpad.js
var numpad_default = {
  "numpad*": 106,
  "numpad+": 43,
  "numpadadd": 43,
  "numpad-": 109,
  "numpad.": 110,
  "numpad/": 111,
  "numlock": 144,
  "numpad0": 96,
  "numpad1": 97,
  "numpad2": 98,
  "numpad3": 99,
  "numpad4": 100,
  "numpad5": 101,
  "numpad6": 102,
  "numpad7": 103,
  "numpad8": 104,
  "numpad9": 105
};

// src/keycodes/codes.js
var codes_default = {
  "backspace": 8,
  "tab": 9,
  "enter": 13,
  "shift": 16,
  "ctrl": 17,
  "alt": 18,
  "pause/break": 19,
  "capslock": 20,
  "esc": 27,
  "space": 32,
  "pageup": 33,
  "pagedown": 34,
  "end": 35,
  "home": 36,
  "left": 37,
  "up": 38,
  "right": 39,
  "down": 40,
  "insert": 45,
  "delete": 46,
  "command": 91,
  "meta": 91,
  "leftcommand": 91,
  "rightcommand": 93,
  "scrolllock": 145,
  "mycomputer": 182,
  "mycalculator": 183,
  ";": 186,
  "=": 187,
  ",": 188,
  "-": 189,
  ".": 190,
  "/": 191,
  "`": 192,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222,
  ":": 186,
  "+": 187,
  "<": 188,
  "_": 189,
  ">": 190,
  "?": 191,
  "~": 192,
  "{": 219,
  "|": 220,
  "}": 221,
  '"': 222,
  ...lowercase_default,
  ...numpad_default,
  ...functionkeys_default,
  ...aliases_default
};

// src/keycodes/index.js
var noop = () => {
};
var defaultModifiers = {
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false
};
function isApplePlatform() {
  return typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}
var alternativeKeyNames = {
  option: "alt",
  command: "meta",
  return: "enter",
  escape: "esc",
  plus: "+",
  mod: isApplePlatform() ? "meta" : "ctrl"
};
var searchKeyCode = (key) => codes_default[key.toLowerCase()] || returnCharCode(key);
var resolveCodesAndModifiers = (keys, alias) => {
  let modifiers = { ...defaultModifiers };
  if (keys.length > 1) {
    return keys.reduce((acc, key2) => {
      key2 = alternativeKeyNames[key2] || key2;
      if (defaultModifiers.hasOwnProperty(`${key2}Key`))
        acc.modifiers = { ...acc.modifiers, [`${key2}Key`]: true };
      else
        acc.code = alias[key2] || searchKeyCode(key2);
      return acc;
    }, { modifiers });
  }
  const key = alternativeKeyNames[keys[0]] || keys[0];
  if (defaultModifiers.hasOwnProperty(`${key}Key`))
    modifiers = { ...modifiers, [`${key}Key`]: true };
  const code = alias[key] || searchKeyCode(key);
  return {
    modifiers,
    code
  };
};
var getKeyMap = (combinations, alias) => {
  const result = [];
  Object.keys(combinations).forEach((combination) => {
    const { keyup, keydown } = combinations[combination];
    const callback = {
      keydown: keydown || (keyup ? noop : combinations[combination]),
      keyup: keyup || noop
    };
    const keys = splitCombination(combination);
    const { code, modifiers } = resolveCodesAndModifiers(keys, alias);
    result.push({
      code,
      modifiers,
      callback
    });
  });
  return result;
};

// src/directive.ts
function bindEvent(el, { value, modifiers }, alias) {
  el._keyMap = getKeyMap(value, alias);
  el._keyHandler = (e) => assignKeyHandler(e, el._keyMap, modifiers);
  document.addEventListener("keydown", el._keyHandler);
  document.addEventListener("keyup", el._keyHandler);
}
function unbindEvent(el) {
  document.removeEventListener("keydown", el._keyHandler);
  document.removeEventListener("keyup", el._keyHandler);
}
function buildDirective(alias) {
  return {
    mounted(el, binding) {
      bindEvent(el, binding, alias);
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        unbindEvent(el);
        bindEvent(el, binding, alias);
      }
    },
    unmounted(el) {
      unbindEvent(el);
    }
  };
}

// src/composable.ts
var import_vue = require("vue");
function useHotkey(keymap, options = {}) {
  const _keyMap = getKeyMap(keymap, options.alias || {});
  const _modifier = {};
  if (options.modifier)
    _modifier[options.modifier] = true;
  const keyHandler = (e) => assignKeyHandler(e, _keyMap, _modifier);
  (0, import_vue.onMounted)(() => {
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("keyup", keyHandler);
  });
  if ((0, import_vue.getCurrentInstance)()) {
    (0, import_vue.onScopeDispose)(() => {
      document.removeEventListener("keydown", keyHandler);
      document.removeEventListener("keyup", keyHandler);
    });
  }
}

// src/index.ts
var HotkeyPlugin = {
  install(app, alias = {}) {
    app.provide("hotkey-alias", alias);
    app.directive("hotkey", buildDirective(alias));
  }
};
var src_default = HotkeyPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HotkeyDirective,
  useHotkey
});
