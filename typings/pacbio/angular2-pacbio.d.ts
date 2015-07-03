declare type int = number;

declare var zone: any;
declare var Zone: any;

declare module "angular2/change_detection" {
  class ChangeDetectorRef {}
  class Pipe {
    supports(obj: any): boolean;
    onDestroy(): void;
    transform(value: any): any;
  }
  class PipeFactory {
    supports(obs: any): boolean;
    create(cdRef: any): Pipe;
  }
  class NullPipeFactory {}
  class PipeRegistry {
    constructor(pipes: any);
    get(type: string, obj: any, cdRef: ChangeDetectorRef): Pipe;
  }
  class JitChangeDetection {}
  class ChangeDetection {}
  class DynamicChangeDetection {}
  var defaultPipes: any;
}

declare module "angular2/pipes" {
  class PipeFactory { }
  class Pipe { }

  class CollectionChangeRecord {
    currentIndex: int;
    previousIndex: int;
    item: any;
    _nextPrevious: CollectionChangeRecord;
    _prev: CollectionChangeRecord;
    _next: CollectionChangeRecord;
    _prevDup: CollectionChangeRecord;
    _nextDup: CollectionChangeRecord;
    _prevRemoved: CollectionChangeRecord;
    _nextRemoved: CollectionChangeRecord;
    _nextAdded: CollectionChangeRecord;
    _nextMoved: CollectionChangeRecord;
    constructor(item: any);
    toString(): string;
  }

  class KeyValueChangesFactory extends PipeFactory {
    constructor();
    supports(obj: any): boolean;
    create(cdRef: any): Pipe;
  }

  class KeyValueChanges extends Pipe {
    private _records;
    private _mapHead;
    private _previousMapHead;
    private _changesHead;
    private _changesTail;
    private _additionsHead;
    private _additionsTail;
    private _removalsHead;
    private _removalsTail;
    constructor();
    static supportsObj(obj: any): boolean;
    supports(obj: any): boolean;
    transform(map: any): any;
    isDirty: boolean;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachChangedItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    check(map: any): boolean;
    _reset(): void;
    _truncate(lastRecord: KVChangeRecord, record: KVChangeRecord): void;
    _isInRemovals(record: KVChangeRecord): boolean;
    _addToRemovals(record: KVChangeRecord): void;
    _removeFromSeq(prev: KVChangeRecord, record: KVChangeRecord): void;
    _removeFromRemovals(record: KVChangeRecord): void;
    _addToAdditions(record: KVChangeRecord): void;
    _addToChanges(record: KVChangeRecord): void;
    toString(): string;
    _forEach(obj: any, fn: Function): void;
  }

  class KVChangeRecord {
    key: any;
    previousValue: any;
    currentValue: any;
    _nextPrevious: KVChangeRecord;
    _next: KVChangeRecord;
    _nextAdded: KVChangeRecord;
    _nextRemoved: KVChangeRecord;
    _prevRemoved: KVChangeRecord;
    _nextChanged: KVChangeRecord;
    constructor(key: any);
    toString(): string;
  }

  class IterableChangesFactory extends PipeFactory {
    constructor();
    supports(obj: any): boolean;
    create(cdRef: any): Pipe;
  }

  class IterableChanges extends Pipe {
    private _collection;
    private _length;
    private _linkedRecords;
    private _unlinkedRecords;
    private _previousItHead;
    private _itHead;
    private _itTail;
    private _additionsHead;
    private _additionsTail;
    private _movesHead;
    private _movesTail;
    private _removalsHead;
    private _removalsTail;
    constructor();
    static supportsObj(obj: any): boolean;
    supports(obj: any): boolean;
    collection: any;
    length: int;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachMovedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    transform(collection: any): any;
    check(collection: any): boolean;
    isDirty: boolean;
    _reset(): void;
    _mismatch(record: CollectionChangeRecord, item: any, index: int): CollectionChangeRecord;
    _verifyReinsertion(record: CollectionChangeRecord, item: any, index: int): CollectionChangeRecord;
    _truncate(record: CollectionChangeRecord): void;
    _reinsertAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _moveAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _addAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _insertAfter(record: CollectionChangeRecord, prevRecord: CollectionChangeRecord, index: int): CollectionChangeRecord;
    _remove(record: CollectionChangeRecord): CollectionChangeRecord;
    _unlink(record: CollectionChangeRecord): CollectionChangeRecord;
    _addToMoves(record: CollectionChangeRecord, toIndex: int): CollectionChangeRecord;
    _addToRemovals(record: CollectionChangeRecord): CollectionChangeRecord;
    toString(): string;
  }
}

declare module "angular2/src/core/zone/ng_zone" {
  class NgZone {
    runOutsideAngular(func: Function): any;
  }
}

declare module 'angular2/src/services/url_resolver' {
  class UrlResolver {}
}

declare module "angular2/src/facade/lang" {
  function isPresent(obj: any): boolean;
  function isBlank(obj: any): boolean;
  function isString(obj: any): boolean;
  function isFunction(obj: any): boolean;
  function isType(obj: any): boolean;
  function stringify(token: any): string;

  class StringWrapper {
    static fromCharCode(code: int): string;
    static charCodeAt(s: string, index: int): number;
    static split(s: string, regExp: any): string[];
    static equals(s: string, s2: string): boolean;
    static replace(s: string, from: string, replace: string): string;
    static replaceAll(s: string, from: RegExp, replace: string): string;
    static toUpperCase(s: string): string;
    static toLowerCase(s: string): string;
    static startsWith(s: string, start: string): boolean;
    static substring(s: string, start: int, end?: int): string;
    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
    static contains(s: string, substr: string): boolean;
  }
}

declare module "angular2/src/facade/async" {
  class Observable {}
  class EventEmitter {
    next(val:any);
    return(val:any);
    throw(val:any);
  }
}

declare module "angular2/src/render/dom/shadow_dom/style_url_resolver" {
  class StyleUrlResolver {}
}

declare module "angular2/src/core/life_cycle/life_cycle" {
  class LifeCycle {
    tick(): any;
  }
}

declare module "zone.js" {
  var zone: any;
  var Zone: any;
}

declare module "angular2/directives" {
  function NgSwitch(): void;
  function NgSwitchWhen(): void;
  function NgSwitchDefault(): void;
  function NgNonBindable(): void;
  function NgIf(): void;
  function NgFor(): void;

  var formDirectives: any;
  var coreDirectives: any;

}

declare module "angular2/forms" {
  var formDirectives: any;
  class FormBuilder {
    group(controls: any): any;
  }

  class Control {
    constructor(controls: any);
    updateValidity(): void;
    updateValueAndValidity(value: any): void;
    updateValue(value: any);
    _valueChanges: any;
    valueChanges: any;
    errors: any;
    pristine: boolean;
    touched: boolean;
    valid: boolean;
  }

  class ControlArray {
    removeAt(index: any);
    push(item: any);
  }

  class ControlGroup {
    constructor(controls: any);
    updateValidity(): void;
    updateValueAndValidity(value: any): void;
    controls: any;
    valueChanges: any;
    errors: any;
    pristine: boolean;
    touched: boolean;
    valid: boolean;
  }

  class Validators {
    static required: any;
  }
}

declare module "angular2/render" {
  interface List<T> { }
  class RenderViewRef {}

  class RenderElementRef {
    renderView: RenderViewRef;
    boundElementIndex: number;
  }

  class Renderer {
    setElementProperty(location: any, propertyName: string, propertyValue: any);
    setElementAttribute(location: any, attributeName: string, attributeValue: string);
    setElementClass(location: any, className: string, isAdd: boolean);
    setElementStyle(location: any, styleName: string, styleValue: string);
    invokeElementMethod(location: any, methodName: string, args: List<any>);
  }

  class EmulatedScopedShadowDomStrategy {
    constructor(styleInliner: any, styleUrlResolver: any, styleHost: any);
  }

  class EmulatedUnscopedShadowDomStrategy {
    constructor(styleUrlResolver: any, styleHost: any);
  }

  class NativeShadowDomStrategy {
    constructor(styleUrlResolver: any);
  }

  class ShadowDomStrategy {}
}

declare module "angular2/src/facade/browser" {
  var __esModule: boolean;
  var win: any;
  var document: any;
  var location: any;
  var gc: () => void;
  var Event: any;
  var MouseEvent: any;
  var KeyboardEvent: any;
}

declare module "angular2/src/router/browser_location" {
  class BrowserLocation {
    path(): string;
  }
}

declare module "angular2/src/router/location" {
  class Location {
    normalize(url: string): string;
    path(): string;
  }
}

declare module "angular2/src/facade/collection" {
  interface List<T> {
  }

  interface StringMap<K, V> {
  }

  function isListLikeIterable(obj: any): boolean;
  function iterateListLike(obj: any, fn: Function): void;

  class ListWrapper {
    static create(): List<any>;
    static createFixedSize(size: any): List<any>;
    static get(m: any, k: any): any;
    static set(m: any, k: any, v: any): void;
    static clone(array: List<any>): any[];
    static map(array: any, fn: any): any;
    static forEach(array: List<any>, fn: Function): void;
    static push(array: any, el: any): void;
    static first(array: any): any;
    static last(array: any): any;
    static find(list: List<any>, pred: Function): any;
    static indexOf(array: List<any>, value: any, startIndex?: number): number;
    static reduce<T, E>(list: List<T>, fn: (accumValue: E, currentValue: T, currentIndex: number, array: T[]) => E, init: E): E;
    static filter(array: any, pred: Function): any;
    static any(list: List<any>, pred: Function): boolean;
    static contains(list: List<any>, el: any): boolean;
    static reversed(array: any): any[];
    static concat(a: any, b: any): any;
    static isList(list: any): boolean;
    static insert(list: any, index: int, value: any): void;
    static removeAt(list: any, index: int): any;
    static removeAll(list: any, items: any): void;
    static removeLast<T>(list: List<T>): T;
    static remove(list: any, el: any): boolean;
    static clear(list: any): void;
    static join(list: any, s: any): any;
    static isEmpty(list: any): boolean;
    static fill(list: List<any>, value: any, start?: int, end?: int): void;
    static equals(a: List<any>, b: List<any>): boolean;
    static slice<T>(l: List<T>, from?: int, to?: int): List<T>;
    static splice<T>(l: List<T>, from: int, length: int): List<T>;
    static sort<T>(l: List<T>, compareFn?: (a: T, b: T) => number): void;
  }

  class StringMapWrapper {
    static create(): StringMap<any, any>;
    static contains(map: StringMap<string, any>, key: string): boolean;
    static get<V>(map: StringMap<string, V>, key: string): V;
    static set<V>(map: StringMap<string, V>, key: string, value: V): void;
    static keys(map: StringMap<string, any>): List<string>;
    static isEmpty(map: StringMap<string, any>): boolean;
    static delete(map: StringMap<string, any>, key: string): void;
    static forEach<K, V>(map: StringMap<string, V>, callback: Function): void;
    static merge<V>(m1: StringMap<string, V>, m2: StringMap<string, V>): StringMap<string, V>;
    static equals<V>(m1: StringMap<string, V>, m2: StringMap<string, V>): boolean;
  }
}

declare module "angular2/router" {
  interface Promise<T> {}
  class Instruction {}
  class Router {
    parent: Router;
    navigate(url: string): Promise<any>;
    config(config: any): Promise<any>;
    deactivate(): Promise<any>;
    activate(instruction: Instruction): Promise<any>;
    recognize(url: string): Instruction;
    recognize(url: string): Instruction;
    renavigate(): Promise<any>;
    generate(name:string, params:any): string;
    subscribe(onNext: Function): void;
  }
  class RouterOutlet {
    constructor(elementRef: any, _loader: any, _parentRouter: any, _injector: any, nameAttr: any);
    _loader: any;
    _parentRouter: any;
    _injector: any;
    _childRouter: any;
    _componentRef: any;
    _elementRef: any;
    _currentInstruction: any;
    /**
     * Given an instruction, update the contents of this viewport.
     */
    activate(instruction: any): any;
    deactivate(): any;
    canDeactivate(instruction: any): any;
  }
  var RouterLink: any;
  var RouteParams: any;
  var routerInjectables: any;
  var RouteConfigAnnotation: any;
  var RouteConfig: any;
}


declare module "angular2/src/dom/browser_adapter" {
    class BrowserDomAdapter {
        static makeCurrent(): void;
        logError(error: any): void;
        attrToPropMap: any;
        query(selector: string): any;
        querySelector(el: any, selector: string): Node;
        querySelectorAll(el: any, selector: string): any;
        on(el: any, evt: any, listener: any): void;
        onAndCancel(el: any, evt: any, listener: any): Function;
        dispatchEvent(el: any, evt: any): void;
        createMouseEvent(eventType: string): MouseEvent;
        createEvent(eventType: any): Event;
        getInnerHTML(el: any): any;
        getOuterHTML(el: any): any;
        nodeName(node: Node): string;
        nodeValue(node: Node): string;
        type(node: HTMLInputElement): string;
        content(node: Node): Node;
        firstChild(el: any): Node;
        nextSibling(el: any): Node;
        parentElement(el: any): any;
        childNodes(el: any): any;
        childNodesAsList(el: any): any;
        clearNodes(el: any): void;
        appendChild(el: any, node: any): void;
        removeChild(el: any, node: any): void;
        replaceChild(el: Node, newChild: any, oldChild: any): void;
        remove(el: any): any;
        insertBefore(el: any, node: any): void;
        insertAllBefore(el: any, nodes: any): void;
        insertAfter(el: any, node: any): void;
        setInnerHTML(el: any, value: any): void;
        getText(el: any): any;
        setText(el: any, value: string): void;
        getValue(el: any): any;
        setValue(el: any, value: string): void;
        getChecked(el: any): any;
        setChecked(el: any, value: boolean): void;
        createTemplate(html: any): HTMLElement;
        createElement(tagName: any, doc?: Document): HTMLElement;
        createTextNode(text: string, doc?: Document): Text;
        createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLScriptElement;
        createStyleElement(css: string, doc?: Document): HTMLStyleElement;
        createShadowRoot(el: HTMLElement): DocumentFragment;
        getShadowRoot(el: HTMLElement): DocumentFragment;
        getHost(el: HTMLElement): HTMLElement;
        clone(node: Node): Node;
        hasProperty(element: any, name: string): boolean;
        getElementsByClassName(element: any, name: string): any;
        getElementsByTagName(element: any, name: string): any;
        classList(element: any): any;
        addClass(element: any, classname: string): void;
        removeClass(element: any, classname: string): void;
        hasClass(element: any, classname: string): any;
        setStyle(element: any, stylename: string, stylevalue: string): void;
        removeStyle(element: any, stylename: string): void;
        getStyle(element: any, stylename: string): any;
        tagName(element: any): string;
        attributeMap(element: any): any;
        hasAttribute(element: any, attribute: string): any;
        getAttribute(element: any, attribute: string): any;
        setAttribute(element: any, name: string, value: string): void;
        removeAttribute(element: any, attribute: string): any;
        templateAwareRoot(el: any): any;
        createHtmlDocument(): Document;
        defaultDoc(): Document;
        getBoundingClientRect(el: any): any;
        getTitle(): string;
        setTitle(newTitle: string): void;
        elementMatches(n: any, selector: string): boolean;
        isTemplateElement(el: any): boolean;
        isTextNode(node: Node): boolean;
        isCommentNode(node: Node): boolean;
        isElementNode(node: Node): boolean;
        hasShadowRoot(node: any): boolean;
        isShadowRoot(node: any): boolean;
        importIntoDoc(node: Node): Node;
        isPageRule(rule: any): boolean;
        isStyleRule(rule: any): boolean;
        isMediaRule(rule: any): boolean;
        isKeyframesRule(rule: any): boolean;
        getHref(el: Element): string;
        getEventKey(event: any): string;
        getGlobalEventTarget(target: string): EventTarget;
        getHistory(): History;
        getLocation(): Location;
        getBaseHref(): any;
    }
}

declare module "angular2/di" {

  function bind(token: any): any;
  class Injector {
     resolveAndCreateChild(bindings: [any]): Injector;
  }
  var Binding: any;
  var ResolvedBinding: any;
  var Dependency: any;
  var Key: any;
  var KeyRegistry: any;
  var TypeLiteral: any;
  var NoBindingError: any;
  var AbstractBindingError: any;
  var AsyncBindingError: any;
  var CyclicDependencyError: any;
  var InstantiationError: any;
  var InvalidBindingError: any;
  var NoAnnotationError: any;
  var OpaqueToken: any;
  var ___esModule: any;
  var InjectAnnotation: any;
  var InjectPromiseAnnotation: any;
  var InjectLazyAnnotation: any;
  var OptionalAnnotation: any;
  var InjectableAnnotation: any;
  var DependencyAnnotation: any;
  var Inject: any;
  var InjectPromise: any;
  var InjectLazy: any;
  var Optional: any;
  var Injectable: any;
}
