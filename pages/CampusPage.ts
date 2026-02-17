import { Page, expect } from '@playwright/test';
import { CampusLocators } from '../locators/campusLocators';

export class CampusPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://www.coursera.org');
        await this.page.getByRole('link', { name: 'For Enterprise' }).first().click();
        await this.page.getByRole('link', { name: 'For Campus' }).first().click();
    }

    async fillContactForm(data: any) {
        await this.page.getByPlaceholder(CampusLocators.firstName).fill(data.firstName);
        await this.page.getByPlaceholder(CampusLocators.lastName).fill(data.lastName);
        await this.page.getByPlaceholder(CampusLocators.email).fill(data.email);
        await this.page.getByPlaceholder(CampusLocators.phone).fill(data.phone);
        await this.page.getByLabel(CampusLocators.instType).selectOption(data.instType);
        await this.page.getByPlaceholder(CampusLocators.instName).fill(data.instName);
        await this.page.getByLabel(CampusLocators.jobRole).selectOption(data.jobRole);
        await this.page.getByLabel(CampusLocators.department).selectOption(data.dept);
        await this.page.getByLabel(CampusLocators.describeNeeds).selectOption(data.needs);
        await this.page.getByLabel(CampusLocators.learners).selectOption(data.learners);
        await this.page.getByLabel(CampusLocators.country).selectOption(data.country);
        if (data.state) {
            await this.page.getByLabel(CampusLocators.state).selectOption(data.state);
        }
    }

    async submitForm() {
        await this.page.getByRole('button', { name: CampusLocators.submitBtn, exact: true }).click();
    }

    async verifyEmailErrorVisible() {
        await expect(this.page.locator(CampusLocators.emailError)).toBeVisible();
    }
}