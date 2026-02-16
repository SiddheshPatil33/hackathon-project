import {Page,Locator} from '@playwright/test';
import {navLocators} from '../Locators/navLocators.ts';

export class NavigationPage 
{
    page:Page;
    searchBox:Locator;
    dropdownOptions:string;
    ViewButton:Locator;
    firstCourses:Locator;


    constructor(page:Page){
        this.page=page;
        this.searchBox = page.locator(navLocators.searchBox);
        this.dropdownOptions = navLocators.dropdownOptions;
        this.ViewButton = page.getByRole('button', { name: 'View' });

        this.firstCourses = page.locator(navLocators.coursePage);
    }

    async searchCourse(courseName:string){
        await this.page.goto('https://www.coursera.org/');

        await this.searchBox.click();
        await this.searchBox.fill(courseName);
        await this.searchBox.press('Enter');

    }

    async applyFilter(dropdown:string, filterOption:string)
    {
        await this.page.getByTestId(dropdown).click();

        await this.page.locator(this.dropdownOptions).filter({ hasText: filterOption }).click();

        await this.ViewButton.click();

    }

    async getCourseDetails()
    {
        const firstCourses = await this.firstCourses.first();
        const courses = await firstCourses.locator('li').all();
        console.log('Total courses found:', courses.length);
        let count = 1;

        for(const course of courses)
        {
            console.log('Course:', await course.locator(navLocators.courseTitle).textContent());
            console.log('Rating:', await course.locator(navLocators.courseRating).textContent());
            console.log('Duration:', await course.locator(navLocators.courseDuration).textContent());
            console.log('----------------------------------');

            if (count == 2) break; // Limit to first 5 courses
            count++;
        }


    }
    
 


}

