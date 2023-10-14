export interface App {
    plan: (delivery: Deliverable) => App;
    transport:() => Transportable
    getDeliveries:() => Deliverable[]
}

export interface Deliverable {
    getLogisticType(): string
}

export interface Logisticable {
    createTransport(): Transportable
}

export interface Transportable {
    deliver(): string
}

export class Delivery implements Deliverable {
    private type: string;
    constructor(type: string) {
        this.type = type;
    }

    getLogisticType(): string {
        return this.type;
    }
}

export class SeaLogistic implements Logisticable {
    static LOGISTIC_TYPE = 'sea';
    createTransport(): Transportable {
        return new Ship();
    }
}

export class AirLogistic implements Logisticable {
    static LOGISTIC_TYPE = 'air';
    createTransport(): Transportable {
        return new Airplane();
    }
}

export class LandLogistic implements Logisticable {
    static LOGISTIC_TYPE = 'land';
    createTransport(): Transportable {
        return new Truck();
    }
}

export class Airplane implements Transportable {
    deliver(): string {
        return 'Delivering by airplane';
    }
}

export class Ship implements Transportable {
    deliver(): string {
        return 'Delivering by ship';
    }
}

export class Truck implements Transportable {
    deliver(): string {
        return 'Delivering by truck';
    }
}


export class LogisticsApp implements App {
    private deliverables: Deliverable[] = [];

    plan(delivery: Deliverable): LogisticsApp {
        this.deliverables.push(delivery);
        return this;
    }

    private createLogistics(delivery: Deliverable): Logisticable {
        switch(delivery.getLogisticType()) {
            case AirLogistic.LOGISTIC_TYPE:
                return new AirLogistic();
            case SeaLogistic.LOGISTIC_TYPE:
                return new SeaLogistic();
            case LandLogistic.LOGISTIC_TYPE:
                return new LandLogistic();
            default:
                throw new NoLogisticException
        }
    }

    transport(): Transportable {
        if(this.deliverables.length === 0) {
            throw new NoDeliverableException
        }

        const deliverable = this.deliverables.shift()
        const transport = this.createLogistics(deliverable!).createTransport();
        return transport;
    }

    getDeliveries(): Deliverable[] {
        return this.deliverables;
    }
}

export class NoDeliverableException extends Error {}
export class NoLogisticException extends Error {}