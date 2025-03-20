import { expect, Locator, Page } from '@playwright/test'

export class Input {
  readonly page: Page
  readonly inputLocator: Locator

  constructor(page: Page, selector: string) {
    this.page = page
    this.inputLocator = page.locator(selector)
  }

  async checkVisible(): Promise<void> {
    await expect(this.inputLocator).toBeVisible()
  }

  async fill(value: string): Promise<void> {
    await this.inputLocator.clear()
    await this.inputLocator.fill(value)
  }

  async click(): Promise<void> {
    await this.inputLocator.click()
  }

  async pressSequentially(value: string): Promise<void> {
    console.log(value)
    await this.inputLocator.clear()
    await this.inputLocator.pressSequentially(value)
  }
}
