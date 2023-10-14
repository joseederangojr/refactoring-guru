export interface FurnitureFactory {
    createChair: () => Chair;
    createSofa: () => Sofa;
    createTable: () => Table;
}

export interface Chair {
    sit: () => string;
}
export interface Sofa {
    slouch: () => string;
}
export interface Table {
    do: () => string;
}

export interface Order { }

export interface FurnitureShop {
    order: (order: Order) => FurnitureShop;
    deliver: () =>  Chair | Sofa | Table;
    getOrders: () => Order[];
}

export class VictorianFurnitureFactory implements FurnitureFactory {
    static FURNITURE_TYPE = 'victorian';
    createChair() {
        return new VictorianChair();
    }

    createSofa() {
        return new VictorianSofa();
    }

    createTable() {
        return new VictorianTable();
    }
}

export class ModernFurnitureFactory implements FurnitureFactory {
    static FURNITURE_TYPE = 'modern';
    createChair() {
        return new ModernChair();
    }

    createSofa() {
        return new ModernSofa();
    }

    createTable() {
        return new ModernTable();
    }
}

export class ArtDecoFurnitureFactory implements FurnitureFactory {
    static FURNITURE_TYPE = 'artdeco';
    createChair() {
        return new ArtDecoChair();
    }

    createSofa() {
        return new ArtDecoSofa();
    }

    createTable() {
        return new ArtDecoTable();
    }
}

export class VictorianChair implements Chair {
    sit() {
        return 'VictorianChair'
    }
}
export class ModernChair implements Chair {
    sit() {
        return 'ModernChair'
    }
}
export class ArtDecoChair implements Chair {
    sit() {
        return 'ArtDecoChair'
    }
}

export class VictorianSofa implements Sofa {
    slouch() {
        return 'VictorianSofa'
    }
}
export class ModernSofa implements Sofa {
    slouch() {
        return 'ModernSofa'
    }
}
export class ArtDecoSofa implements Sofa {
    slouch() {
        return 'ArtDecoSofa'
    }
}

export class VictorianTable implements Table {
    do() {
        return 'VictorianTable';
    }
}
export class ModernTable implements Table {
    do() {
        return 'ModernTable';
    }
}
export class ArtDecoTable implements Table {
    do() {
        return 'ArtDecoTable';
    }
}

export class Furniture implements Order {
    constructor(public type: string, public furniture: string) {}
}

export class JoseFurnitureShop implements FurnitureShop {
    private orders: Order[] = [];

    order(order: Order): JoseFurnitureShop {
        this.orders.push(order);
        return this;
    }

    private factory(order: Furniture): FurnitureFactory {

        switch(order.type) {
            case VictorianFurnitureFactory.FURNITURE_TYPE:
                return new VictorianFurnitureFactory();
            case ModernFurnitureFactory.FURNITURE_TYPE:
                return new ModernFurnitureFactory();
            case ArtDecoFurnitureFactory.FURNITURE_TYPE:
                return new ArtDecoFurnitureFactory();
            default:
                throw new NoFurnitureException();
        }
    }

    deliver(): Chair | Sofa | Table {
        if(this.orders.length === 0) {
            throw new NoOrderException();
        }
        const order = this.orders.shift() as Furniture
        const factory = this.factory(order);
        switch(order.furniture) {
            case 'chair':
                return factory.createChair();
            case 'sofa':
                return factory.createSofa();
            case 'table':
                return factory.createTable();
            default:
                throw new NoFurnitureException();
        }
    }

    getOrders() {
        return this.orders
    }
}

export class NoOrderException extends Error {}
export class NoFurnitureException extends Error {}