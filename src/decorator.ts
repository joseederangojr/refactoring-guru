
export interface Ingredient {
    cost(): number;
}

export class Espresso implements Ingredient {
    cost() {
        return 50;
    }
}

export class Milk implements Ingredient {
    constructor(private ingredient: Ingredient) {}

    cost() {
        return this.ingredient.cost() + 20;
    }
}

export class Caramel implements Ingredient {
    constructor(private ingredient: Ingredient) {}

    cost() {
        return this.ingredient.cost() + 20;
    }
}

export class SaltedCaramel implements Ingredient {
    constructor(private ingredient: Ingredient) {}

    cost() {
        return this.ingredient.cost() + 20;
    }
}

export class Vanilla implements Ingredient {
    constructor(private ingredient: Ingredient) {}

    cost() {
        return this.ingredient.cost() + 20;
    }
}


export class Ice implements Ingredient {
    constructor(private ingredient: Ingredient) {}

    cost() {
        return this.ingredient.cost() + 10;
    }
}

/**
 * @description Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
 * @see https://refactoring.guru/design-patterns/decorator
 */
export class CoffeeRecipe {
    constructor(private coffee: Espresso) {}

    withMilk() {
        this.coffee = new Milk(this.coffee);
        return this;
    }

    withCaramel() {
        this.coffee = new Caramel(this.coffee);
        return this;
    }

    withSaltedCaramel() {
        this.coffee = new SaltedCaramel(this.coffee);
        return this;
    }

    withVanilla() {
        this.coffee = new Vanilla(this.coffee);
        return this;
    }

    withIce() {
        this.coffee = new Ice(this.coffee);
        return this;
    }


    brew() {
        return this.coffee
    }
}

export class Barista {
    constructor(private recipe: CoffeeRecipe) {}

    private reset() {
        this.recipe = new CoffeeRecipe(new Espresso());
    }

    makeAmericano() {
        const coffee = this.recipe
            .withIce();
        this.reset();
        return coffee.brew();
    }

    makeCaramelMacchiato() {
        const coffee = this.recipe
            .withIce()
            .withVanilla()
            .withCaramel()
            .withMilk()
        this.reset();
        return coffee.brew();
    }

    makeSaltedCaramel() {
        const coffee = this.recipe
            .withIce()
            .withSaltedCaramel()
            .withMilk()
            
        this.reset();
        return coffee.brew();
    }

    makeVanilla() {
        const coffee = this.recipe
            .withIce()
            .withVanilla()
            .withMilk()
            
        this.reset();
        return coffee.brew();
    }
}