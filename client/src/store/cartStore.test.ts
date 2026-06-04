import { describe, expect, it, beforeEach } from "vitest";

import { useCartStore } from "./cartStore";

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
    });
  });

  const pizza = {
    id: "1",
    name: "Pizza",
    category: "all",
    description: "Test Pizza",
    price: 10,
    image: "pizza.jpg",
  };

  it("should add item to cart", () => {
    const store = useCartStore.getState();

    store.addItem(pizza);

    expect(
      useCartStore.getState().items.length
    ).toBe(1);
  });

  it("should increase quantity when adding existing item", () => {
    const store = useCartStore.getState();

    store.addItem(pizza);
    store.addItem(pizza);

    expect(
      useCartStore.getState().items[0].quantity
    ).toBe(2);
  });

  it("should increase quantity", () => {
    const store = useCartStore.getState();

    store.addItem(pizza);

    store.increaseQuantity("1");

    expect(
      useCartStore.getState().items[0].quantity
    ).toBe(2);
  });

  it("should decrease quantity", () => {
    const store = useCartStore.getState();

    store.addItem(pizza);

    store.increaseQuantity("1");
    store.decreaseQuantity("1");

    expect(
      useCartStore.getState().items[0].quantity
    ).toBe(1);
  });

  it("should remove item when quantity reaches zero", () => {
    const store = useCartStore.getState();

    store.addItem(pizza);

    store.decreaseQuantity("1");

    expect(
      useCartStore.getState().items.length
    ).toBe(0);
  });
});