import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout happy path', () => {
  test('standard user completes backpack checkout and sees order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();

    await cartPage.verifyItemInCart('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo('Test', 'User', '12345');
    await checkoutPage.verifyTotals();
    await checkoutPage.finishOrder();
  });
});