import { Pizza, VeggiePizza, MeatLoversPizza } from "./pizza";

export type PizzaType = "veggie" | "meat-lovers";

/**
 * PizzaBuilder — constructs a Pizza step-by-step.
 *
 * Each setter returns `this` so calls can be chained fluently.
 * Call `build()` to retrieve the finished Pizza and reset the builder.
 */
export class PizzaBuilder {
  private pizza: Pizza;

  constructor(type: PizzaType) {
    this.pizza =
      type === "veggie" ? new VeggiePizza() : new MeatLoversPizza();
  }

  setSize(size: string): PizzaBuilder {
    this.pizza.size = size;
    return this;
  }

  setDough(dough: string): PizzaBuilder {
    this.pizza.dough = dough;
    return this;
  }

  setSauce(sauce: string): PizzaBuilder {
    this.pizza.sauce = sauce;
    return this;
  }

  setCheese(cheese: string): PizzaBuilder {
    this.pizza.cheese = cheese;
    return this;
  }

  addTopping(topping: string): PizzaBuilder {
    this.pizza.toppings.push(topping);
    return this;
  }

  build(): Pizza {
    return this.pizza;
  }
}
