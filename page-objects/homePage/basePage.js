const exp = require('constants');
const readline = require('readline');
const {Builder, By, Key, until} = require("selenium-webdriver");

const baseURL = 'https://crmdev.crmmarshal.com/';

// Locators for the home page
const logoLocator = By.css("img[class='mr-2]'");

// Locators for the request dropdown and the pages under it
const requestLocator = By.css("a[aria-controls='REQUEST']");
const productRequisitionLocator = By.css(`a[href='${baseURL}product-requisition-lists']`);
const incidentReportLocator = By.css(`a.nav-link[href='${baseURL}trouble-tickets-lists']`);
const projectRequestLocator = By.css(`a.nav-link[href='${baseURL}project-request-lists']`);
const taskLocator = By.css(`a[href='${baseURL}task-lists']`);

// Locators for the outreach dropdown and the pages under it 
const outreachLocator = By.css("a[aria-controls='OUTREACH']");
const donorOutreachLocator = By.css(`a[href='${baseURL}donor-outreach/list']`);
const marketPlaceLocator = By.css(`a[href='${baseURL}marketplace-lists']`); 

//Locators for the Projects dropdown and the pages under it
const projectsLocator = By.css("a[aria-controls='PROJECTS']");
const projectTemplatesLocator = By.css(`a[href='${baseURL}project-templates']`);
const projectManagementLocator = By.css(`a[href='${baseURL}project-management']`);
const projectListLocator = By.css(`a[href='${baseURL}project-approved-list']`);

// Locators for the Inventory dropdwon and the pages under it
const inventoryLocator = By.css("a[aria-controls='INVENTORY']");
const assetManagementLocator = By.css(`a[href='${baseURL}asset-maintenance-list']`);
const assetDisposalLocator = By.css(`a[href='${baseURL}asset-disposal-list']`);
const inHouseInventoryLocator = By.css(`a[href='${baseURL}in-house-inventory-list']`);

// Locators for the Office Admin dropdown and the pages under it 
const officeAdminLocator = By.css("a[aria-controls='OFFICE_ADMIN']");
const documentsLocator = By.css(`a[href='${baseURL}documents/list']`);
const whoToCallLocator = By.css(`a[href='${baseURL}who-to-call-lists']`);
const emailLocator = By.css(`a[href='${baseURL}email/email-sent']`);
const volunteerScheduleLocator = By.css(`a[href='${baseURL}workers-schedule-lists']`);
const trainingDevelopmentLocator = By.css(`a[href='${baseURL}training-development-list']`);

// Locators for Human Resources dropdown and the pages under it
const humanResourcesLocator = By.css("a[aria-controls='HUMAN_RESOURCES']");
const employeeListLocator = By.css(`a[href='${baseURL}employee-lists']`);
const leaveAbsenceLocator = By.css(`a[href='${baseURL}leave-absence-lists']`);

// Locators for the financials dropdown and the pages under it
const financialsLocator = By.css("a[aria-controls='FINANCIALS']");
const donationLocator = By.css(`a[href='${baseURL}donation-lists']`);
const pledgeLocator = By.css(`a[href='${baseURL}pledge-list']`);
const expensesLocator = By.css(`a[href='${baseURL}expense-list']`);
const budgetLocator = By.css(`a[href='${baseURL}budget-list']`);

// Locators for the business dropdown and the pages under it
const businessLocator = By.css("a[aria-controls='BUSINESS']");
const vendorListLocator = By.css(`a[href='${baseURL}vendor-list']`);

//Locators for the Data Import dropdown and the pages under it
const dataImportLocator = By.css("a[aria-controls='DATA_IMPORT']");
const userListImportLocator = By.css(`a[href='${baseURL}member-import']`);
const donationImportLocator = By.css(`a[href='${baseURL}contributions-import']`);
const importAuditUsersLocator = By.css(`a[href='${baseURL}audit-import-member-list']`);
const importAuditDonationsLocator = By.css(`a[href='${baseURL}audit-import-contributions-list']`);


async function navigateToHomePage(driver){
    driver.get(`${baseURL}login`);

}

async function navigateToHomePageViaLogo(driver) {
    await driver.findElement(By.css("img[src='/dashboard/images/logohead.jpeg']"))
}

async function loginToHomePage(driver){
    await driver.findElement(By.name("username")).sendKeys("////////////");
    await driver.findElement(By.name("password")).sendKeys("////////////");
    await driver.findElement(By.name("remember")).click();
    await driver.findElement(By.css("button.btn.linkbtn")).click();

}

async function verifyLogin(driver){
    // Click the remember me button to leave the device
    await driver.findElement(By.name("remember_me"))
    // Click the send code button
    await driver.findElement(By.css("button.btn.btn-sm")).click();
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

async function navigateToProductRequisition(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, requestLocator);
    await driver.findElement(requestLocator).click();
    // Open Product Requisition page
    await waitForElementClickable(driver, productRequisitionLocator);
    await driver.findElement(productRequisitionLocator).click();
    
}

async function navigateToIncidentReport(driver) {
    // Wait for the request dropdown to be clickable
    await waitForElementClickable(driver, requestLocator);
    // Click the requests dropdown
    await driver.findElement(requestLocator).click();
    //Wait for element to be visible
    await waitForElementVisible(driver, incidentReportLocator)
    // Wait for the trouble tickets page
    await waitForElementClickable(driver, incidentReportLocator);
    await driver.findElement(incidentReportLocator).click();
    // Close the request dropdown
    await driver.findElement(requestLocator).click();
}

async function navigateToProjectRequest(driver) {
    // Wait for the request dropdown to be clickable
    await waitForElementClickable(driver, requestLocator);
    // Click the requests dropdown
    await driver.findElement(requestLocator).click();
    // Wait for the project request page to open
    await waitForElementClickable(driver, projectRequestLocator);
    await driver.findElement(projectRequestLocator).click();
    // Close the request dropdown
    await waitForElementClickable(driver, requestLocator);
    await driver.findElement(requestLocator).click();
}

async function navigateToTasks(driver) {
    // Wait for the request dropdown to be clickable
    await waitForElementClickable(driver, requestLocator);
    // Click the requests dropdown
    await driver.findElement(requestLocator).click();
    // Wait for the task page to be clickable
    await waitForElementClickable(driver, taskLocator);
    // Click the tasks page
    await driver.findElement(taskLocator).click();
    // Close the request dropdown
    await waitForElementClickable(driver, requestLocator);
    await driver.findElement(requestLocator).click();
}

async function navigateToDonorOutreach(driver) {
    // Click the Outreach dropdown
    await waitForElementClickable(driver, outreachLocator);
    await driver.findElement(outreachLocator).click();
    // Open Donor Outreach page
    await waitForElementClickable(driver, donorOutreachLocator);
    await driver.findElement(donorOutreachLocator).click();
}

async function navigateToMarketPlace(driver) {
    // Click the Outreach dropdown
    await waitForElementClickable(driver, outreachLocator);
    await driver.findElement(outreachLocator).click();
    // Open Market Place page
    await waitForElementClickable(driver, marketPlaceLocator);
    await driver.findElement(marketPlaceLocator).click();
}

async function navigateToProjectTemplates(driver) {
    // Click the Project dropdown
    await waitForElementClickable(driver, projectsLocator);
    await driver.findElement(projectsLocator).click();
    // Open Project Templates page
    await waitForElementClickable(driver, projectTemplatesLocator);
    await driver.findElement(projectTemplatesLocator).click();
    //Close the project dropdown
    await waitForElementClickable(driver, projectsLocator);
    await driver.findElement(projectsLocator).click();
}

async function navigateToProjectManagement(driver) {
    // Click the Projects dropdown
    await waitForElementClickable(driver, projectsLocator);
    await driver.findElement(projectsLocator).click();
    // Open Project Management page
    await waitForElementClickable(driver, projectManagementLocator);
    await driver.findElement(projectManagementLocator).click();
    //Close the project dropdown
    await waitForElementClickable(driver, projectsLocator);
    await driver.findElement(projectsLocator).click();
}

async function navigateToProjectList(driver) {
    // Click the Projects dropdown
    await waitForElementClickable(driver, projectsLocator);
    await driver.findElement(projectsLocator).click();
    // Open Project List page
    await waitForElementClickable(driver, projectListLocator);
    await driver.findElement(projectListLocator).click();
    //Close the project dropdown
    await waitForElementClickable(driver, projectsLocator);
    await driver.findElement(projectsLocator).click();
}

async function navigateToAssetManagement(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
    // Open Asset Management page
    await waitForElementClickable(driver, assetManagementLocator);
    await driver.findElement(assetManagementLocator).click();
    //Close the Inventory Dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
}

async function navigateToAssetDisposal(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
    // Open Asset Disposal page
    await waitForElementClickable(driver, assetDisposalLocator);
    await driver.findElement(assetDisposalLocator).click();
    //Close the Inventory Dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
}

async function navigateToInHouseInventory(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
    // Open In House Inventory page
    await waitForElementClickable(driver, inHouseInventoryLocator);
    await driver.findElement(inHouseInventoryLocator).click();
    // Close the Inventory Dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
}

async function navigateToDocuments(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
    // Open In House Inventory page
    await waitForElementClickable(driver, documentsLocator);
    await driver.findElement(documentsLocator).click();
    // Close the Office Admin Dropdown
    await waitForElementClickable(driver, inventoryLocator);
    await driver.findElement(inventoryLocator).click();
}

async function navigateToWhoToCall(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
    // Open In House Inventory page
    await waitForElementClickable(driver, whoToCallLocator);
    await driver.findElement(whoToCallLocator).click();
    // Close the Office Admin Dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
}

async function navigateToEmail(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
    // Open In House Inventory page
    await waitForElementClickable(driver, emailLocator);
    await driver.findElement(emailLocator).click();
    // Close the Office Admin Dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
}

async function navigateToVolunteerSchedule(driver) {
    // Click the requests dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
    // Open In House Inventory page
    await waitForElementClickable(driver, volunteerScheduleLocator);
    await driver.findElement(volunteerScheduleLocator).click();
    // Close the Office Admin Dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
}

async function navigateToTrainingDevelopment(driver) {
    // Click the Office Admin dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
    // Open In training and development page
    await waitForElementClickable(driver, trainingDevelopmentLocator);
    await driver.findElement(trainingDevelopmentLocator).click();
    // Close the Office Admin Dropdown
    await waitForElementClickable(driver, officeAdminLocator);
    await driver.findElement(officeAdminLocator).click();
}

async function navigateToEmployeeList(driver) {
    // Click the Human Resources dropdown
    await waitForElementClickable(driver, humanResourcesLocator);
    await driver.findElement(humanResourcesLocator).click();
    // Open the Employee List page
    await waitForElementClickable(driver, employeeListLocator);
    await driver.findElement(employeeListLocator).click();
    // Close the Human Resources Dropdown
    await waitForElementClickable(driver, humanResourcesLocator);
    await driver.findElement(humanResourcesLocator).click();
}

async function navigateToLeaveAbsence(driver) {
    // Click the Human Resources dropdown
    await waitForElementClickable(driver, humanResourcesLocator);
    await driver.findElement(humanResourcesLocator).click();
    // Open the Employee List page
    await waitForElementClickable(driver, leaveAbsenceLocator);
    await driver.findElement(leaveAbsenceLocator).click();
    // Close the Human Resources Dropdown
    await waitForElementClickable(driver, humanResourcesLocator);
    await driver.findElement(humanResourcesLocator).click();
}

async function navigateToDonations(driver) {
    // Click the Financials dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
    // Open the donation page
    await waitForElementClickable(driver, donationLocator);
    await driver.findElement(donationLocator).click();
    // Close the financials Dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
}

async function navigateToPledges(driver) {
    // Click the Financials dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
    // Open the pledges page
    await waitForElementClickable(driver, pledgeLocator);
    await driver.findElement(pledgeLocator).click();
    // Close the financials Dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
}

async function navigateToExpenses(driver) {
    // Click the Financials dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
    // Open the expenses page
    await waitForElementClickable(driver, expensesLocator);
    await driver.findElement(expensesLocator).click();
    // Close the financials Dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
}

async function navigateToBudgets(driver) {
    // Click the Financials dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
    // Open the donation page
    await waitForElementClickable(driver, budgetLocator);
    await driver.findElement(budgetLocator).click();
    // Close the financials Dropdown
    await waitForElementClickable(driver, financialsLocator);
    await driver.findElement(financialsLocator).click();
}

async function navigateToVendorList(driver) {
    // Click the Business dropdown
    await waitForElementClickable(driver, businessLocator);
    await driver.findElement(businessLocator).click();
    // Open the donation page
    await waitForElementClickable(driver, vendorListLocator);
    await driver.findElement(vendorListLocator).click();
    // Close the business Dropdown
    await waitForElementClickable(driver, businessLocator);
    await driver.findElement(businessLocator).click();
}

async function navigateToUserListImport(driver) {
    // Click the Data Import dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
    // Open the User List Import page
    await waitForElementClickable(driver, userListImportLocator);
    await driver.findElement(userListImportLocator).click();
    // Close the Data Import Dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
}

async function navigateToDonationImport(driver) {
    // Click the Data Import dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
    // Open the User List Import page
    await waitForElementClickable(driver, donationImportLocator);
    await driver.findElement(donationImportLocator).click();
    // Close the Data Import Dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
}

async function navigateToImportAuditUsers(driver) {
    // Click the Data Import dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
    // Open the User List Import page
    await waitForElementClickable(driver, importAuditUsersLocator);
    await driver.findElement(importAuditUsersLocator).click();
    // Close the Data Import Dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
}

async function navigateToImportAuditDonations(driver) {
    // Click the Data Import dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
    // Open the User List Import page
    await waitForElementClickable(driver, importAuditDonationsLocator);
    await driver.findElement(importAuditDonationsLocator).click();
    // Close the Data Import Dropdown
    await waitForElementClickable(driver, dataImportLocator);
    await driver.findElement(dataImportLocator).click();
}

async function selectDate(driver, datepickerIndex, targetDate) {
    /**
     * Selects a date from a Flatpickr calendar.
     * 
     * @param {WebDriver} driver - Selenium WebDriver instance.
     * @param {number} datepickerIndex - Index of the date picker if multiple exist (0-based).
     * @param {string} targetDate - Date in "YYYY-MM-DD" format.
     */

    let [year, month, day] = targetDate.split("-").map(Number);

    // Locate all visible datepickers
    let datepickers = await driver.findElements(By.css(".flatpickr-calendar.open"));

    if (datepickers.length === 0) {
        throw new Error("No open date pickers found!");
    }

    if (datepickerIndex >= datepickers.length) {
        throw new Error(`Invalid datepickerIndex: ${datepickerIndex}. Only found ${datepickers.length} date pickers.`);
    }

    let datepicker = datepickers[datepickerIndex];

    // Select the year
    let yearInput = await datepicker.findElement(By.css(".cur-year"));
    await yearInput.clear();
    await yearInput.sendKeys(year);

    // Select the month from dropdown
    let monthDropdown = await datepicker.findElement(By.css(".flatpickr-monthDropdown-months"));
    await monthDropdown.sendKeys(getMonthName(month));

    // Wait for days to update after month/year change
    await driver.wait(until.elementLocated(By.css(".flatpickr-day")), 2000);

    // Select the day
    let dayElement = await datepicker.findElement(By.xpath(`//span[@aria-label='${getFormattedDate(year, month, day)}']`));
    await dayElement.click();
}

/**
 * Returns the month name required for Flatpickr selection.
 */
function getMonthName(monthNumber) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1];  // Month is 1-based
}

/**
 * Returns the formatted date string for Flatpickr.
 */
function getFormattedDate(year, month, day) {
    return `${getMonthName(month)} ${day}, ${year}`;
}

module.exports = {
    navigateToHomePage,
    navigateToHomePageViaLogo,
    loginToHomePage,
    verifyLogin,
    waitForElementVisible,
    waitForElementPresent,
    waitForElementClickable,
    navigateToProductRequisition,
    navigateToIncidentReport,
    navigateToProjectRequest,
    navigateToTasks,
    navigateToDonorOutreach,
    navigateToMarketPlace,
    navigateToProjectTemplates,
    navigateToProjectManagement,
    navigateToProjectList,
    navigateToAssetManagement,
    navigateToAssetDisposal,
    navigateToInHouseInventory,
    navigateToDocuments,
    navigateToWhoToCall,
    navigateToEmail,
    navigateToVolunteerSchedule,
    navigateToTrainingDevelopment,
    navigateToEmployeeList,
    navigateToLeaveAbsence,
    navigateToDonations,
    navigateToPledges,
    navigateToExpenses,
    navigateToBudgets,
    navigateToVendorList,
    navigateToUserListImport,
    navigateToDonationImport,
    navigateToImportAuditUsers,
    navigateToImportAuditDonations,
    selectDate

}
