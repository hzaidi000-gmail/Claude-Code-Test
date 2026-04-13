import { Pizza } from "./pizza";
import { PizzaBuilder } from "./pizza-builder";

/**
 * PizzaDirector — orchestrates the PizzaBuilder with predefined recipes.
 *
 * The Director knows *which* steps to call and in *what order*, while the
 * Builder knows *how* to perform each step.  This separation is the core
 * of the Builder design pattern.
 */
export class PizzaDirector {
  private builder: PizzaBuilder;

  constructor(builder: PizzaBuilder) {
    this.builder = builder;
  }

  setBuilder(builder: PizzaBuilder): void {
    this.builder = builder;
  }

  buildVeggiePizza(): Pizza {
    return this.builder
      .setSize("Large")
      .setDough("Whole Wheat")
      .setSauce("Marinara")
      .setCheese("Mozzarella")
      .addTopping("Bell Peppers")
      .addTopping("Mushrooms")
      .addTopping("Black Olives")
      .addTopping("Red Onions")
      .addTopping("Spinach")
      .build();
  }

  buildMeatLoversPizza(): Pizza {
    return this.builder
      .setSize("Large")
      .setDough("Classic Hand-Tossed")
      .setSauce("BBQ")
      .setCheese("Cheddar Blend")
      .addTopping("Pepperoni")
      .addTopping("Italian Sausage")
      .addTopping("Bacon")
      .addTopping("Ham")
      .addTopping("Ground Beef")
      .build();
  }
}
