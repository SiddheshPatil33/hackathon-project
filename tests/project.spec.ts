import {test, expect} from '@playwright/test';
import { DateTime } from 'luxon';
import { NavigationPage } from '../pages/navigation.ts';
import {navLocators} from '../Locators/navLocators.ts';
import { CampusPage } from '../pages/CampusPage';

test('Project Test', async ({page}) => {
    const navigation = new NavigationPage(page);

    await navigation.searchCourse('web development');

    await navigation.applyFilter(navLocators.languageDropdown, 'English');
    await navigation.applyFilter(navLocators.levelDropdown, 'Beginner');
    await page.waitForTimeout(3000);
    
    await navigation.getCourseDetails();

})


test('Verify Coursera Campus Form Validation', async ({ page }) => {
    const campus = new CampusPage(page);
    const timestamp = DateTime.now().toFormat('yyyy-MM-dd_HH-mm');

    await campus.navigate();

    // Test 1: Invalid Email
    await campus.fillContactForm({
        firstName: 'Test',
        lastName: 'User',
        email: 'invalid-email@',
        phone: '1234567890',
        instType: 'University/4 Year College',
        instName: 'Test University',
        jobRole: 'Professor',
        dept: 'Teaching/Faculty/Research',
        needs: 'Get in touch with sales',
        learners: '101-500',
        country: 'India',
        state: 'Delhi'
    });
    
    await campus.submitForm();
    await campus.verifyEmailErrorVisible();
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `./screenshots/InvalidEmail_${timestamp}.png` });

    // Test 2: Valid Submission
    await page.reload();
    await campus.fillContactForm({
        firstName: 'Ajay',
        lastName: 'Chand',
        email: 'ajay009@global.com',
        phone: '9876543210',
        instType: 'University/4 Year College',
        instName: 'Global University',
        jobRole: 'Professor',
        dept: 'Teaching/Faculty/Research',
        needs: 'Get in touch with sales',
        learners: '101-500',
        country: 'India',
        state: 'Delhi'
    });

    await campus.submitForm();
    await expect(page).toHaveURL(/.*campus.*/); // Or verify success message
    await page.waitForTimeout(5000);
    await page.screenshot({ path: `./screenshots/Successful_${timestamp}.png` });
});