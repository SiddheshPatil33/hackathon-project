step-1: create a folder
step-2: setup playwright and install dependencies (npm init playwright@latest)
step-3: install luxon for date and time (npm install luxon and npm install --save-dev @types/luxon)
step-4: install allure report dependencies(npm install -D allure-playwright)
step-5: add in congif file :-

import { defineConfig } from '@playwright/test';



export default defineConfig({

  reporter: [

    ['line'], 

    ['allure-playwright', { outputFolder: 'allure-results' }]

  ],

  use: {

    /* Capture video on first retry of a failed test, or 'on' to always capture */

    video: 'on-first-retry', // Options: 'off', 'on', 'retain-on-failure', 'on-first-retry'

    

    /* You can also capture traces for Allure */

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

  },

});
step-6: create a file in tests folder("file_name".spec.ts) 
step-7: write Automation Script
step-8: npx playwright test nav.spec.ts --headed --project=chromium (To Run the script)
step-9: npx allure generate allure-results --clean -o allure-report (to create allure report)
step-10: npx allure open allure-report (to open allure report)
for delete all- npx playwright uninstall --all