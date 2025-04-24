const basePage = require('../../page-objects/homePage/basePage.js')
const addEntry = require('../../page-objects/entryPages.js')
var webDriver = require("selenium-webdriver")
const assert = require("assert");
const { Driver } = require('selenium-webdriver/chrome.js');

var driver = new webDriver.Builder().forBrowser('chrome').build();

jest.setTimeout(60000);

describe("Home Page Tests", () => {
    test('Smoke Test for Screens', async () => {
        await basePage.navigateToHomePage(driver);
        await basePage.loginToHomePage(driver);
        await driver.sleep(2000);
        await basePage.navigateToProductRequisition(driver);
        await basePage.navigateToProjectRequest(driver);
        await basePage.navigateToIncidentReport(driver);
        await basePage.navigateToTasks(driver);
        await basePage.navigateToDonorOutreach(driver);
        await basePage.navigateToMarketPlace(driver);
        await basePage.navigateToProjectTemplates(driver);
        await basePage.navigateToProjectManagement(driver);
        await basePage.navigateToProjectList(driver);
        await basePage.navigateToAssetManagement(driver);
        await basePage.navigateToAssetDisposal(driver);
        await basePage.navigateToInHouseInventory(driver);
        // Currently trying to figure a workaround to return to the homepage after going to documents page
        // await basePage.navigateToDocuments(driver);
        // await basePage.navigateToHomePageViaLogo(driver);
        await basePage.navigateToWhoToCall(driver);
        await basePage.navigateToEmail(driver);
        await basePage.navigateToVolunteerSchedule(driver);
        // await driver.sleep(1000);
        await basePage.navigateToTrainingDevelopment(driver);
        await basePage.navigateToEmployeeList(driver);
        await basePage.navigateToLeaveAbsence(driver);
        // await driver.sleep(1000);
        await basePage.navigateToDonations(driver);
        await basePage.navigateToPledges(driver);
        await basePage.navigateToExpenses(driver);
        await basePage.navigateToBudgets(driver);
        await basePage.navigateToVendorList(driver);
        await basePage.navigateToUserListImport(driver);
        await basePage.navigateToDonationImport(driver);
        await basePage.navigateToImportAuditUsers(driver);
        await basePage.navigateToImportAuditDonations(driver);
    });
});