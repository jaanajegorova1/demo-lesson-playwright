import { expect, Locator, Page } from '@playwright/test'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { BasePage } from './base-page'
import { Popup } from '../atoms/Popup'

export class OrderPage extends BasePage {
  readonly statusButton: Button
  readonly nameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly statusModal: Locator
  readonly orderNumberFiled: Input
  readonly createOrderButton: Button
  readonly trackingButton: Button
  readonly trackingCodeTitle: Locator
  readonly trackingCodeInputField: Input
  readonly orderCreatedModal: Popup
  readonly popupTitle: Popup
  readonly popupTrackingCodeText: Locator
  readonly popupCloseButton: Button
  readonly popupOkButton: Button

  constructor(page: Page) {
    super(page)
    this.statusButton = new Button(page, '[data-name=openStatusPopup-button]')
    this.nameField = new Input(page, '#name')
    this.phoneField = new Input(page, '#phone')
    this.commentField = new Input(page, '#comment')
    this.statusModal = page.locator('[data-name="searchOrder-popup"]')
    this.orderNumberFiled = new Input(page, '[data-name="searchOrder-popup"] input')
    this.createOrderButton = new Button(page, '.button:has-text("Order")')
    this.trackingCodeTitle = page.locator('.order-search-popup__label')
    this.trackingButton = new Button(page, '[data-name="searchOrder-submitButton"]')
    this.trackingCodeInputField = new Input(page, '[name="id"]')
    this.orderCreatedModal = new Popup(page, '[data-name="popup__container"]')
    this.popupTitle = new Popup(page, 'h3.notification-popup__text')
    this.popupTrackingCodeText = page.locator('span.notification-popup__text')
    this.popupCloseButton = new Button(
      page,
      '[data-name="orderSuccessfullyCreated-popup-close-button"]',
    )
    this.popupOkButton = new Button(page, '[data-name="orderSuccessfullyCreated-popup-ok-button"]')
  }

  async extractCreatedOrderIdNumber(): Promise<string> {
    const orderId = await this.popupTrackingCodeText.innerText()
    return orderId.split(' ')[2]
  }

  async checkTrackingCodeTitle(): Promise<void> {
    await expect(this.trackingCodeTitle).toBeVisible()
    await expect(this.trackingCodeTitle).toContainText('Enter the tracking code')
  }
}
