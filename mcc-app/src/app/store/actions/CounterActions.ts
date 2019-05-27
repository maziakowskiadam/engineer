export class ChangeCounterValue {
    static readonly type = '[CounterState] ChangeValue';
    constructor(public step: number) {}
}

export class SetCounterZero {
    static readonly type = '[CounterState] SetZero';
    constructor() {}
}
