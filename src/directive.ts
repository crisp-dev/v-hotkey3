import type { Directive, DirectiveBinding } from 'vue'
import { getKeyMap } from './keycodes'
import { assignKeyHandler } from './helpers'

interface HTMLElementWithKeyMap extends HTMLElement {
  _keyMap: Record<any, any>[]
  _keyHandler: (e: Event) => Event | undefined
}

interface SVGElementWithKeyMap extends SVGElement {
  _keyMap: Record<any, any>[]
  _keyHandler: (e: Event) => Event | undefined
}

function bindEvent(el: HTMLElementWithKeyMap | SVGElementWithKeyMap, { value, modifiers }: DirectiveBinding, alias: Record<string, string | number>) {
  el._keyMap = getKeyMap(value, alias)
  el._keyHandler = e => assignKeyHandler(e, el._keyMap, modifiers)

  document.addEventListener('keydown', el._keyHandler, modifiers.capture)
  document.addEventListener('keyup', el._keyHandler, modifiers.capture)
}

function unbindEvent(el: HTMLElementWithKeyMap | SVGElementWithKeyMap, { modifiers }: DirectiveBinding) {
  document.removeEventListener('keydown', el._keyHandler, modifiers.capture)
  document.removeEventListener('keyup', el._keyHandler, modifiers.capture)
}

export function buildDirective(alias: Record<string, string | number>): Directive<HTMLElementWithKeyMap | SVGElementWithKeyMap> {
  return {
    mounted(el, binding) {
      bindEvent(el, binding, alias)
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        unbindEvent(el, binding)
        bindEvent(el, binding, alias)
      }
    },
    unmounted(el, binding) {
      unbindEvent(el, binding)
    },
  }
}
