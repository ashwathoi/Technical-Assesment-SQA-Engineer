import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyItemInCart(itemName: string) {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText(itemName);
  }

  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
