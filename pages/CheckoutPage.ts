import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async verifyTotals() {
    const money = (text: string) => parseFloat(text.replace(/[^0-9.]/g, ''));

    const itemPrice = money(await this.page.locator('[data-test="inventory-item-price"]').innerText());
    const subtotal = money(await this.page.locator('[data-test="subtotal-label"]').innerText());
    const tax = money(await this.page.locator('[data-test="tax-label"]').innerText());
    const total = money(await this.page.locator('[data-test="total-label"]').innerText());

    expect(subtotal).toBeCloseTo(itemPrice, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  }

  async finishOrder() {
    await this.page.locator('[data-test="finish"]').click();
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  }
}
