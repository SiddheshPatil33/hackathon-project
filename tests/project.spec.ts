import {test} from '@playwright/test';
import { NavigationPage } from '../pages/navigation.ts';
import {navLocators} from '../Locators/navLocators.ts';

test('Project Test', async ({page}) => {
    const navigation = new NavigationPage(page);

    await navigation.searchCourse('web development');

    await navigation.applyFilter(navLocators.languageDropdown, 'English');
    await navigation.applyFilter(navLocators.levelDropdown, 'Beginner');
    await page.waitForTimeout(3000);
    
    await navigation.getCourseDetails();

})