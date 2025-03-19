import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'

export class OrderFoundPage extends BasePage {
  readonly orderDetails: Locator
  readonly orderDetailsStatus: Locator
  readonly createdOrderDescription: Locator

  constructor(page: Page) {
    super(page)
    this.orderDetails = page.locator('.order-details')
    this.orderDetailsStatus = page
      .locator('span.status-list__status')
      .getByText('OPEN', { exact: true })
    this.createdOrderDescription = page.locator(
      '.status-list__description.status-list__description_active',
    )
  }

  async checkFoundOrderStatus(): Promise<void> {
    await expect(this.orderDetailsStatus).toBeVisible()
    await expect(this.orderDetailsStatus).toHaveText('OPEN')
  }
  async checkFoundTitle(): Promise<void> {
    await expect(this.orderDetails).toBeVisible()
    await expect(this.createdOrderDescription).toBeVisible()
    await expect(this.createdOrderDescription).toHaveText('Order has been created')
  }
}
