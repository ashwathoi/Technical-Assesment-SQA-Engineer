import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
