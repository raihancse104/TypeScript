interface Settings {
    timeout?: number;
    onError?(): void;
}

function getDefaultSettings() {
    return { timeout: 1000 };
}

function doSomething(settings: Settings) { /* ... */ }

// forgot to call `getDefaultSettings`
// but it is not caught because we don't check for call signatures
doSomething(getDefaultSettings);

// this is an oddly popular way of defining settings
// this example is from services/textChanges.ts
type ConfigurableStart = { useStart?: boolean }
type ConfigurableEnd = { useEnd?: boolean }
type ConfigurableStartEnd = ConfigurableStart & ConfigurableEnd
interface InsertOptions {
    prefix?: string
    suffix?: string
}
type ChangeOptions = ConfigurableStartEnd & InsertOptions;

function del(options: ConfigurableStartEnd = {},
             error: { error?: number } = {}) {
    let changes: ChangeOptions[];
    changes.push(options);
    changes.push(error);
}

class K {
    constructor(s: string) { }
}
// Ctor isn't a weak type because it has a construct signature
interface Ctor {
    new (s: string): K
    n?: number
}
let ctor: Ctor = K
