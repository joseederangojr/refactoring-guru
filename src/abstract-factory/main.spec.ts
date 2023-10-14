import { describe, beforeEach, it, expect } from "bun:test";
import {
    ArtDecoFurnitureFactory,
    ArtDecoSofa,
    JoseFurnitureShop,
    ModernFurnitureFactory,
    ModernTable,
    NoFurnitureException,
    NoOrderException,
    Order,
    VictorianChair,
    VictorianFurnitureFactory,
} from './main'
describe('JoseFurnitureShop', () => {
    let shop: JoseFurnitureShop;
  
    beforeEach(() => {
      shop = new JoseFurnitureShop();
    });

    it('should launch the app without crashing', () => {
        expect(shop).toBeInstanceOf(JoseFurnitureShop);
        expect(shop.getOrders()).toHaveLength(0);
      })
  
    describe('order', () => {
      it('should add an order to the orders array', () => {
        const order: Order = { type: VictorianFurnitureFactory.FURNITURE_TYPE, furniture: 'chair' };
        shop.order(order);
        expect(shop.getOrders()).toHaveLength(1);
      });
  
      it('should return the instance of JoseFurnitureShop', () => {
        const order: Order = { type: ModernFurnitureFactory.FURNITURE_TYPE, furniture: 'table' };
        const retShop = shop.order(order);
        expect(retShop).toBeInstanceOf(JoseFurnitureShop);
      });
    });
  
    describe('deliver', () => {
      it('should throw a NoOrderException if there are no orders', () => {
        expect(() => shop.deliver()).toThrow(new NoOrderException());
      });
  
      it('should return a Chair instance if the order is for a chair', () => {
        const order: Order = { type: ArtDecoFurnitureFactory.FURNITURE_TYPE, furniture: 'sofa' };
        shop.order(order);
        const result = shop.deliver();
        expect(result).toBeInstanceOf(ArtDecoSofa);
      });
  
      it('should return a Sofa instance if the order is for a sofa', () => {
        const order: Order = { type: ModernFurnitureFactory.FURNITURE_TYPE, furniture: 'table' };
        shop.order(order);
        const result = shop.deliver();
        expect(result).toBeInstanceOf(ModernTable);
      });
  
      it('should return a Table instance if the order is for a table', () => {
        const order: Order = { type: VictorianFurnitureFactory.FURNITURE_TYPE, furniture: 'chair' };
        shop.order(order);
        const result = shop.deliver();
        expect(result).toBeInstanceOf(VictorianChair);
      });
  
      it('should throw a NoFurnitureException if the order is for an unknown furniture item', () => {
        const order: Order = { type: ModernFurnitureFactory.FURNITURE_TYPE, furniture: 'unknown' };
        shop.order(order);
        expect(() => shop.deliver()).toThrow(new NoFurnitureException());
      });

      it('should throw a NoFurnitureException if the order is for an unknown furniture type', () => {
        const order: Order = { type: 'unknown', furniture: 'chair' };
        shop.order(order);
        expect(() => shop.deliver()).toThrow(new NoFurnitureException());
      });
    });
  });