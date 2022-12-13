import { getCurrentInstance, inject, onMounted, onScopeDispose } from 'vue'
import { assignKeyHandler } from './helpers'
import { getKeyMap } from './keycodes'

export function useHotkey(keymap: Record<string, Function>, modifier?: 'prevent' | 'stop') {
  const alias = inject('hotkey-alias')

  const _keyMap = getKeyMap(keymap, alias ?? {})
  const _modifier: Record<string, boolean> = {}
  if (modifier)
    _modifier[modifier] = true

  const keyHandler = (e: Event) => assignKeyHandler(e, _keyMap, _modifier)

  onMounted(() => {
    document.addEventListener('keydown', keyHandler)
    document.addEventListener('keyup', keyHandler)
  })

  if (getCurrentInstance()) {
    onScopeDispose(() => {
      document.removeEventListener('keydown', keyHandler)
      document.removeEventListener('keyup', keyHandler)
    })
  }
}