import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.coursera.org/');
  await page.getByTestId('search-autocomplete-input').click();
  await page.getByTestId('search-autocomplete-input').fill('web development');
  await page.getByTestId('search-autocomplete-input').press('Enter');
  await page.getByTestId('filter-dropdown-language').click();
  await page.waitForTimeout(2000);
//   await page.getByRole('checkbox', { name: /English/i }).check();
  await page.locator('span.cds-checkboxAndRadio-labelContent').filter({ hasText: 'English' }).click();
  await page.getByRole('button', { name: 'View' }).click();
  // await page.waitForTimeout(2000);
  await page.getByTestId('filter-dropdown-productDifficultyLevel').click();
  // await page.waitForTimeout(2000);
  await page.locator('span.cds-checkboxAndRadio-labelContent').filter({ hasText: 'Beginner' }).click();
//   await page.getByRole('checkbox', { name: /Beginner/i }).check();
  await page.getByRole('button', { name: 'View' }).click();
  await page.waitForTimeout(3000); 

  const firstCourses = await page.locator('ul.cds-9').first();
  const courses = await firstCourses.locator('li').all();
  console.log('Total courses found:', courses.length);
  let count = 1;
  for (const course of courses) {
    console.log('Course:', await course.locator('.cds-CommonCard-title').textContent());
    console.log('Rating:', await course.locator('.cds-RatingStat-meter span').textContent());
    console.log('Duration:', await course.locator('.cds-CommonCard-metadata').textContent());
    console.log('----------------------------------');

    if (count == 2) break; // Limit to first 5 courses
    count++;

  }

});