import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found'
import { OrderFoundPage } from '../pages/order-found'

test('TL-18-01 signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkVisible()
  await loginPage.signInButton.checkDisabled(true)
})

test('TL-18-02 login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkDisabled(false)
  await orderCreationPage.nameField.checkVisible()
})

test('TL-18-1 Check footer on login page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.checkFooterAttached()
  await loginPage.langButtonRu.checkVisible()
  await loginPage.langButtonEn.checkVisible()
  await loginPage.privacyPolicyLink.checkVisible()
  await loginPage.cookiePolicyLink.checkVisible()
  await loginPage.tosLink.checkVisible()
})

test('TL-18-2 Check footer on order page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterAttached()
  await orderPage.langButtonRu.checkVisible()
  await orderPage.langButtonEn.checkVisible()
  await orderPage.privacyPolicyLink.checkVisible()
  await orderPage.cookiePolicyLink.checkVisible()
  await orderPage.tosLink.checkVisible()
})

test('TL-18-3 Check footer on order not found page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const notFoundPage = new OrderNotFoundPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  await orderPage.orderNumberFiled.fill('12341234')
  await orderPage.trackingButton.click()
  await notFoundPage.checkNotFoundTitle()
  await notFoundPage.checkFooterAttached()
  await notFoundPage.langButtonRu.checkVisible()
  await notFoundPage.langButtonEn.checkVisible()
  await notFoundPage.privacyPolicyLink.checkVisible()
  await notFoundPage.cookiePolicyLink.checkVisible()
  await notFoundPage.tosLink.checkVisible()
})

test('TL-18-4 Check footer on order found page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const foundPage = new OrderFoundPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  await orderPage.orderNumberFiled.fill('5757')
  await orderPage.trackingButton.click()
  await foundPage.checkFoundTitle()
  await foundPage.checkFooterAttached()
  await foundPage.langButtonRu.checkVisible()
  await foundPage.langButtonEn.checkVisible()
  await foundPage.privacyPolicyLink.checkVisible()
  await foundPage.cookiePolicyLink.checkVisible()
  await foundPage.tosLink.checkVisible()
})

test('TL-18-5 error message displayed when incorrect credentials used', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.checkVisible()
  await loginPage.usernameField.fill('tertyuiopüäölkjhgfd')
  await loginPage.passwordField.checkVisible()
  await loginPage.passwordField.fill('tertyuiopüäölkjhgfd')
  await loginPage.signInButton.click()
  await loginPage.authorizationErrorPopup.checkVisible()
  await loginPage.authorizationErrorPopup.checkAuthorizationErrorText()
  await loginPage.authorizationPopupCloseButton.checkVisible()
  await loginPage.authorizationPopupCloseButton.click()
  await loginPage.signInButton.checkVisible()
})

test('TL-18-6 create order and search order by orderId', async ({ page }) => {
  //login:
  const loginPage = new LoginPage(page)
  const foundPage = new OrderFoundPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  //create order:
  await orderPage.nameField.fill(faker.internet.username())
  await orderPage.phoneField.fill(faker.phone.number())
  await orderPage.commentField.fill(faker.word.words())
  await orderPage.createOrderButton.checkVisible()
  await orderPage.createOrderButton.click()
  await orderPage.popupTitle.checkVisible()
  await orderPage.popupTrackingCodeText.isVisible()
  await orderPage.popupCloseButton.checkVisible()
  await orderPage.popupOkButton.checkVisible()
  const orderId = await orderPage.extractCreatedOrderIdNumber()
  console.log(orderId)
  await orderPage.popupOkButton.click()
  await orderPage.popupOkButton.checkDisabled(false)
  //search order by orderId:
  await orderPage.statusButton.click()
  await orderPage.statusModal.isVisible()
  await orderPage.checkTrackingCodeTitle()
  await orderPage.trackingCodeInputField.click()
  await orderPage.trackingCodeInputField.pressSequentially(orderId)
  await orderPage.trackingButton.click()
  await foundPage.checkFoundOrderStatus()
  await foundPage.checkFoundTitle()
})
