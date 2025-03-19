# Test Automation Template

This project is a **Test Automation Template** designed for the course at **Tallinn Learning School**. It is intended for learning and practicing:

- The **Page Object Pattern**.
- Writing **End-to-End (E2E) Tests**.
- Using **Mocks** with **Playwright**.

## Configuration Instructions

### Step 1: Rename the File

Rename the provided `prod.env.example` file to `prod.env` in the root directory of the project.

### Step 2: Fill in the Values

Open the `prod.env` file and fill in the following fields with the required configuration values:

- **TEST_USERNAME**: The username for the service.
- **TEST_PASSWORD**: The password for the service.
- **URL**: The base URL for the service.

Example:

```plaintext
TEST_USERNAME=myUsername
TEST_PASSWORD=myPassword
URL=https://example.com
```

#How to launch test cases:
#test.only... + command in Terminal in debug mode, detailed mode, to see test execution step by step:
npx playwright test -g "TL-18-6" --debug --workers=1
npx playwright test -g "TL-18-6" --debug --workers=1 --project=chromium

#test.only... + command in Terminal without debug mode, fast mode:
npx playwright test -g "TL-18-6" --headed --workers=1  
npx playwright test -g "TL-18-6" --headed --workers=1 --project=chromium

#How to run all tests on all browsers:
npx playwright test "e2e-flow-simple.spec.ts" --headed --workers=1
npx playwright test "e2e-flow-simple.spec.ts" --debug --workers=1 --project=chromium
npx playwright test "e2e-flow-simple.spec.ts" --headed --workers=1 --project=chromium
npx playwright test "e2e-flow-simple.spec.ts" --headed --workers=1 --project=webkit
npx playwright test "e2e-flow-simple.spec.ts" --headed --workers=1 --project=firefox
