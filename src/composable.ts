import { getCurrentInstance, onMounted, onScopeDispose } from 'vue'
import { assignKeyHandler } from './helpers'
import { getKeyMap } from './keycodes'

type KeyMap = Record<string, Record<string, () => void> | (() => void)>

interface Options {
  modifier?: 'prevent' | 'stop' | 'capture'
  alias?: Record<string, string | number>
  capture?: boolean
}

export function useHotkey(keymap: KeyMap, options: Options = {}) {
  const _keyMap = getKeyMap(keymap, options.alias || {})
  const _modifier: Record<string, boolean> = {}
  if (options.modifier)
    _modifier[options.modifier] = true

  const keyHandler = (e: Event) => assignKeyHandler(e, _keyMap, _modifier)

  onMounted(() => {
    document.addEventListener('keydown', keyHandler, options.capture)
    document.addEventListener('keyup', keyHandler, options.capture)
  })

  if (getCurrentInstance()) {
    onScopeDispose(() => {
      document.removeEventListener('keydown', keyHandler, options.capture)
      document.removeEventListener('keyup', keyHandler, options.capture)
    })
  }
}
