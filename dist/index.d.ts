import { Directive, Plugin } from 'vue';

interface HTMLElementWithKeyMap extends HTMLElement {
    _keyMap: Record<any, any>[];
    _keyHandler: (e: Event) => Event | undefined;
}
interface SVGElementWithKeyMap extends SVGElement {
    _keyMap: Record<any, any>[];
    _keyHandler: (e: Event) => Event | undefined;
}
declare function buildDirective(alias: Record<string, string | number>): Directive<HTMLElementWithKeyMap | SVGElementWithKeyMap>;

type KeyMap = Record<string, Record<string, () => void> | (() => void)>;
interface Options {
    modifier?: 'prevent' | 'stop' | 'capture';
    alias?: Record<string, string | number>;
    capture?: boolean;
}
declare function useHotkey(keymap: KeyMap, options?: Options): void;

declare const HotkeyPlugin: Plugin;

export { buildDirective as HotkeyDirective, HotkeyPlugin as default, useHotkey };
