import { Pizza, VeggiePizza, MeatLoversPizza } from "../src/pizza";
import { PizzaBuilder } from "../src/pizza-builder";
import { PizzaDirector } from "../src/pizza-director";

// ── Abstract Pizza ──

describe("Pizza (abstract)", () => {
  test("VeggiePizza returns correct type", () => {
    const pizza = new VeggiePizza();
    expect(pizza.getType()).toBe("Veggie Pizza");
  });

  test("MeatLoversPizza returns correct type", () => {
    const pizza = new MeatLoversPizza();
    expect(pizza.getType()).toBe("Meat Lovers Pizza");
  });

  test("describe() includes type, size, dough, sauce, cheese, toppings", () => {
    const pizza = new VeggiePizza();
    pizza.size = "Large";
    pizza.dough = "Whole Wheat";
    pizza.sauce = "Marinara";
    pizza.cheese = "Mozzarella";
    pizza.toppings = ["Mushrooms", "Olives"];

    const desc = pizza.describe();
    expect(desc).toContain("Veggie Pizza");
    expect(desc).toContain("Large");
    expect(desc).toContain("Whole Wheat");
    expect(desc).toContain("Marinara");
    expect(desc).toContain("Mozzarella");
    expect(desc).toContain("Mushrooms");
    expect(desc).toContain("Olives");
  });

  test("describe() shows 'none' when no toppings", () => {
    const pizza = new MeatLoversPizza();
    pizza.size = "Small";
    pizza.dough = "Thin";
    pizza.sauce = "BBQ";
    pizza.cheese = "Cheddar";
    expect(pizza.describe()).toContain("none");
  });

  test("getPrice() calculates correctly based on size and toppings", () => {
    const pizza = new VeggiePizza();
    pizza.size = "Small";
    pizza.toppings = [];
    expect(pizza.getPrice()).toBe(8);

    pizza.size = "Medium";
    expect(pizza.getPrice()).toBe(10);

    pizza.size = "Large";
    expect(pizza.getPrice()).toBe(12);

    pizza.toppings = ["A", "B", "C"];
    expect(pizza.getPrice()).toBe(12 + 3 * 1.5); // 16.5
  });
});

// ── PizzaBuilder ──

describe("PizzaBuilder", () => {
  test("creates a VeggiePizza when type is 'veggie'", () => {
    const builder = new PizzaBuilder("veggie");
    const pizza = builder.build();
    expect(pizza).toBeInstanceOf(VeggiePizza);
    expect(pizza.getType()).toBe("Veggie Pizza");
  });

  test("creates a MeatLoversPizza when type is 'meat-lovers'", () => {
    const builder = new PizzaBuilder("meat-lovers");
    const pizza = builder.build();
    expect(pizza).toBeInstanceOf(MeatLoversPizza);
    expect(pizza.getType()).toBe("Meat Lovers Pizza");
  });

  test("fluent setters return the builder for chaining", () => {
    const builder = new PizzaBuilder("veggie");
    const result = builder
      .setSize("Large")
      .setDough("Whole Wheat")
      .setSauce("Marinara")
      .setCheese("Mozzarella")
      .addTopping("Olives");

    expect(result).toBe(builder);
  });

  test("sets all properties on the built pizza", () => {
    const pizza = new PizzaBuilder("meat-lovers")
      .setSize("Medium")
      .setDough("Thin Crust")
      .setSauce("BBQ")
      .setCheese("Cheddar Blend")
      .addTopping("Pepperoni")
      .addTopping("Bacon")
      .build();

    expect(pizza.size).toBe("Medium");
    expect(pizza.dough).toBe("Thin Crust");
    expect(pizza.sauce).toBe("BBQ");
    expect(pizza.cheese).toBe("Cheddar Blend");
    expect(pizza.toppings).toEqual(["Pepperoni", "Bacon"]);
  });

  test("addTopping accumulates multiple toppings", () => {
    const pizza = new PizzaBuilder("veggie")
      .addTopping("Mushrooms")
      .addTopping("Peppers")
      .addTopping("Onions")
      .build();

    expect(pizza.toppings).toHaveLength(3);
    expect(pizza.toppings).toContain("Mushrooms");
    expect(pizza.toppings).toContain("Peppers");
    expect(pizza.toppings).toContain("Onions");
  });
});

// ── PizzaDirector ──

describe("PizzaDirector", () => {
  test("buildVeggiePizza creates a fully configured VeggiePizza", () => {
    const builder = new PizzaBuilder("veggie");
    const director = new PizzaDirector(builder);
    const pizza = director.buildVeggiePizza();

    expect(pizza).toBeInstanceOf(VeggiePizza);
    expect(pizza.size).toBe("Large");
    expect(pizza.dough).toBe("Whole Wheat");
    expect(pizza.sauce).toBe("Marinara");
    expect(pizza.cheese).toBe("Mozzarella");
    expect(pizza.toppings).toEqual([
      "Bell Peppers",
      "Mushrooms",
      "Black Olives",
      "Red Onions",
      "Spinach",
    ]);
  });

  test("buildMeatLoversPizza creates a fully configured MeatLoversPizza", () => {
    const builder = new PizzaBuilder("meat-lovers");
    const director = new PizzaDirector(builder);
    const pizza = director.buildMeatLoversPizza();

    expect(pizza).toBeInstanceOf(MeatLoversPizza);
    expect(pizza.size).toBe("Large");
    expect(pizza.dough).toBe("Classic Hand-Tossed");
    expect(pizza.sauce).toBe("BBQ");
    expect(pizza.cheese).toBe("Cheddar Blend");
    expect(pizza.toppings).toEqual([
      "Pepperoni",
      "Italian Sausage",
      "Bacon",
      "Ham",
      "Ground Beef",
    ]);
  });

  test("setBuilder allows swapping the builder", () => {
    const veggieBuilder = new PizzaBuilder("veggie");
    const meatBuilder = new PizzaBuilder("meat-lovers");
    const director = new PizzaDirector(veggieBuilder);

    const veggiePizza = director.buildVeggiePizza();
    expect(veggiePizza).toBeInstanceOf(VeggiePizza);

    director.setBuilder(meatBuilder);
    const meatPizza = director.buildMeatLoversPizza();
    expect(meatPizza).toBeInstanceOf(MeatLoversPizza);
  });

  test("director-built pizzas have correct prices", () => {
    const veggieBuilder = new PizzaBuilder("veggie");
    const director = new PizzaDirector(veggieBuilder);
    const veggiePizza = director.buildVeggiePizza();
    // Large ($12) + 5 toppings * $1.50 = $19.50
    expect(veggiePizza.getPrice()).toBe(19.5);

    const meatBuilder = new PizzaBuilder("meat-lovers");
    director.setBuilder(meatBuilder);
    const meatPizza = director.buildMeatLoversPizza();
    // Large ($12) + 5 toppings * $1.50 = $19.50
    expect(meatPizza.getPrice()).toBe(19.5);
  });
});
