import { describe, beforeEach, it, expect } from "bun:test";

import { LogisticsApp, AirLogistic, SeaLogistic, LandLogistic, NoDeliverableException, NoLogisticException, Delivery, Airplane, Ship, Truck } from './main';

describe('LogisticsApp', () => {
  let logisticsApp: LogisticsApp;

  beforeEach(() => {
    logisticsApp = new LogisticsApp();
  });

  it('should launch the app without crashing', () => {
    expect(logisticsApp).toBeDefined();
    expect(logisticsApp.getDeliveries()).toHaveLength(0);
  })

  describe('plan', () => {
    it('should add to deliverables', () => {
        logisticsApp
            .plan(new Delivery(AirLogistic.LOGISTIC_TYPE))
            .plan(new Delivery(SeaLogistic.LOGISTIC_TYPE))
            .plan(new Delivery(LandLogistic.LOGISTIC_TYPE));
        expect(logisticsApp.getDeliveries()).toHaveLength(3);
    });

    it('should return the instance of LogisticsApp', () => {
        const retLogisticsApp = logisticsApp.plan(new Delivery(AirLogistic.LOGISTIC_TYPE));
        expect(retLogisticsApp).toBeInstanceOf(LogisticsApp);
    })
  });

  describe('createLogistics', () => {
    it('should throw a NoDeliverableException if there are no deliverables', () => {
      expect(() => logisticsApp.createLogistics()).toThrow(new NoDeliverableException);
    });

    it('should return an instance of AirLogistic if the deliverable is of type AirLogistic', () => {
      logisticsApp.plan(new Delivery(AirLogistic.LOGISTIC_TYPE));

      const result = logisticsApp.createLogistics();

      expect(result).toBeInstanceOf(AirLogistic);
    });

    it('should return an instance of SeaLogistic if the deliverable is of type SeaLogistic', () => {
        logisticsApp.plan(new Delivery(SeaLogistic.LOGISTIC_TYPE));
  
        const result = logisticsApp.createLogistics();
  
        expect(result).toBeInstanceOf(SeaLogistic);
      });

      it('should return an instance of LandLogistic if the deliverable is of type LandLogistic', () => {
        logisticsApp.plan(new Delivery(LandLogistic.LOGISTIC_TYPE));
  
        const result = logisticsApp.createLogistics();
  
        expect(result).toBeInstanceOf(LandLogistic);
      });

    it('should throw a NoLogisticException if the deliverable is of an unknown type', () => {
      const unknownDeliverable = { getLogisticType: () => 'unknown' } as Delivery;
      logisticsApp.plan(unknownDeliverable);

      expect(() => logisticsApp.createLogistics()).toThrow(new NoLogisticException);
    });

    it('should remove the deliverable from the list of deliveries', () => {
      logisticsApp.plan(new Delivery(LandLogistic.LOGISTIC_TYPE));

      logisticsApp.createLogistics();

      expect(logisticsApp.getDeliveries()).toHaveLength(0)
    });


    describe('Transportable', () => {
        it('should transport by airplane', () => {
            logisticsApp.plan(new Delivery(AirLogistic.LOGISTIC_TYPE));
            const transport = logisticsApp.createLogistics().createTransport();
            const result = transport.deliver();
            expect(transport).toBeInstanceOf(Airplane);
            expect(result).toEqual('Delivering by airplane');
        })

        it('should transport by ship', () => {
            logisticsApp.plan(new Delivery(SeaLogistic.LOGISTIC_TYPE));
            const transport = logisticsApp.createLogistics().createTransport();
            const result = transport.deliver();
            expect(transport).toBeInstanceOf(Ship);
            expect(result).toEqual('Delivering by ship');
        })

        it('should transport by truck', () => {
            logisticsApp.plan(new Delivery(LandLogistic.LOGISTIC_TYPE));
            const transport = logisticsApp.createLogistics().createTransport();
            const result = transport.deliver();
            expect(transport).toBeInstanceOf(Truck);
            expect(result).toEqual('Delivering by truck');
        })
    })
  });
});