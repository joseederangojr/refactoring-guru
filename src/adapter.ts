export interface Plug {
    getProngCount(): number;
}

export interface Outlet {
    attach(plug: Plug): boolean;
    getReceptacleProngHoleCount(): number;
}

export interface Type<T extends string> {
    getType(): T;
}


export class TypeAPlug implements Plug, Type<'A'> {
    getType(): "A" {
        return 'A';
    }

    getProngCount(): number {
        return 2
    }
}

export class TypeBPlug implements Plug, Type<'B'> {
    getType(): "B" {
        return 'B';
    }

    getProngCount(): number {
        return 3
    }
}

export class TypeAOutlet implements Outlet, Type<'A'> {

    getType(): "A" {
        return 'A';
    }

    getReceptacleProngHoleCount(): number {
        return 2
    }

    attach(plug: Plug & Type<string>): boolean {
        if(plug.getType() !== this.getType() || plug.getProngCount() !== this.getReceptacleProngHoleCount()) {
            throw new PlugNotSupportedException();
        }

        return true;
    }
}

/**
 * @description Adapter is a structural design pattern that allows objects with incompatible export interfaces to collaborate.
 * @see https://refactoring.guru/design-patterns/adapter
 */
export class TypeBToTypeAAdapter implements Plug, Type<'A'> {
    constructor(private plug: Plug & Type<'B'>) {}

    getType(): "A" {
        return 'A';
    }

    getProngCount(): number {
        return this.plug.getProngCount() - 1;
    }
}

export class PlugNotSupportedException extends Error {}