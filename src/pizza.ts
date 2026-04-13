/**
 * Abstract Pizza class — the Product in the Builder pattern.
 *
 * Concrete subclasses (VeggiePizza, MeatLoversPizza) inherit all shared
 * properties and override `getType()` to identify themselves.
 */
export abstract class Pizza {
  size: string = "";
  dough: string = "";
  sauce: string = "";
  cheese: string = "";
  toppings: string[] = [];

  abstract getType(): string;

  describe(): string {
    const lines = [
      `${this.getType()} (${this.size})`,
      `  Dough:    ${this.dough}`,
      `  Sauce:    ${this.sauce}`,
      `  Cheese:   ${this.cheese}`,
      `  Toppings: ${this.toppings.length ? this.toppings.join(", ") : "none"}`,
    ];
    return lines.join("\n");
  }

  getPrice(): number {
    const sizePrice: Record<string, number> = {
      Small: 8,
      Medium: 10,
      Large: 12,
    };
    const base = sizePrice[this.size] ?? 10;
    return base + this.toppings.length * 1.5;
  }
}

export class VeggiePizza extends Pizza {
  getType(): string {
    return "Veggie Pizza";
  }
}

export class MeatLoversPizza extends Pizza {
  getType(): string {
    return "Meat Lovers Pizza";
  }
}
