const readline = require('readline');
const {Builder, By, Key, until} = require("selenium-webdriver");

const addEntryLocator = By.css("a[class='btn btn-primary btn-icon-text']");
const submitLocator = By.id("btnAdd");

// Specific locator for adding entries on the project page
const addProjectEntryLocator = By.css("a[class='btn btn-primary btn-icon-text add-new-fun']");

async function addEntry(driver) {
    // Wait for add entry button to be clickable
    await waitForElementClickable(driver, addEntryLocator);
    // Click the add entry button
    await driver.findElement(addEntryLocator).click();

}

async function addProjectEntry(driver) {
    // Wait for add entry button to be clickable
    await waitForElementClickable(driver, addProjectEntryLocator);
    // Click the add entry button
    await driver.findElement(addProjectEntryLocator).click();
}

async function submitEntry(driver) {
     // Wait for submit button to be clickable
     await waitForElementClickable(driver, submitLocator);
     // Click the submit button
     await driver.findElement(submitLocator).click();
}

// Wait functions
async function waitForElementVisible(driver, locator, timeout = 10000) {
    await driver.wait(async function () {
        const element = await driver.findElement(locator);
        return element.isDisplayed();
    }, timeout, `Element ${locator} was not visible after ${timeout} ms`);
}

async function waitForElementPresent(driver, locator, timeout = 10000) {
    await driver.wait(until.elementLocated(locator), timeout, `Element ${locator} was not located after ${timeout} ms`);
}

async function waitForElementClickable(driver, locator, timeout = 10000) {
    await driver.wait(async function () {
        const element = await driver.findElement(locator);
        return element.isEnabled() && element.isDisplayed();
    }, timeout, `Element ${locator} was not clickable after ${timeout} ms`);
}

//Fill the Project Request Form
async function fillProjectRequestForm(driver, name, startYear, startMonth, startDay, endYear, endMonth, endDay) {
    // Fill out the project request form fields
    await driver.findElement(By.name("project[title]")).sendKeys(name);
    await driver.findElement(By.name("project[branch_id]")).click();
    await driver.findElement(By.css("option[value='74']")).click(); // Select branch
    await driver.findElement(By.name("project[priority]")).click();
    await driver.findElement(By.css("option[value='Low']")).click(); // Select priority
    await driver.findElement(By.name("end_date")).click();
    await driver.sleep(5000);
    await driver.findElement(By.css("span[aria-label='September 20, 2024']")).click();

    // Function to set the year and month using the dropdowns and input field
    async function setMonthAndYear(targetYear, targetMonth) {
        const monthMap = { 
            "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, 
            "June": 5, "July": 6, "August": 7, "September": 8, "October": 9, 
            "November": 10, "December": 11
        };

        // Select the correct month from the dropdown
        const monthDropdown = await driver.findElement(By.className("flatpickr-monthDropdown-month"));
        await monthDropdown.click(); // Open the month dropdown
        const monthOption = await driver.findElement(By.css(`option[value='${monthMap[targetMonth]}']`));
        await monthOption.click(); // Select the desired month

        // Clear the year input field and set the desired year
        const yearInput = await driver.findElement(By.css("input[class='numInput cur-year']"));
        await yearInput.clear(); // Clear the year input
        await yearInput.sendKeys(targetYear); // Type the target year

        // // Optional: Press Enter to confirm the year (depending on the behavior of the picker)
        // await yearInput.sendKeys(webdriver.Key.ENTER);
    }

    // Open the start date calendar and set the start date
    await driver.findElement(By.name("start_date")).click(); // Open start date calendar
    await setMonthAndYear(startYear, startMonth); // Set the correct month and year
    await driver.sleep(750);
    const startDaySelector = `span[aria-label='${startMonth} ${startDay}, ${startYear}']`;
    await driver.findElement(By.css(startDaySelector)).click(); // Select the start day

    // Wait for the end date calendar to automatically open
   await driver.findElement(By.css("div[class='card-body']")).click();
   await driver.sleep(750);
   await driver.findElement(By.name("end_date")).click();

    // Set the correct month and year for the end date
    await setMonthAndYear(endYear, endMonth); // Set the correct month and year for end date
    await driver.sleep(750);

    // Select the end day
    const endDaySelector = `span[aria-label='${endMonth} ${endDay}, ${endYear}']`;
    await driver.findElement(By.css(endDaySelector)).click(); // Select the end date
}

module.exports = {
    addEntry,
    submitEntry,
    fillProjectRequestForm
}
