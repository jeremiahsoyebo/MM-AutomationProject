const basePage = require('../../page-objects/homePage/basePage.js')
const addEntry = require('../../page-objects/entryPages.js')
const projectTemplates = require('../../page-objects/projects/projectTemplates.js')
var webDriver = require("selenium-webdriver")
const assert = require("assert");
const { Driver } = require('selenium-webdriver/chrome.js');

var driver = new webDriver.Builder().forBrowser('chrome').build();

jest.setTimeout(60000);

describe("Project Templates Tests", () => {
    test('Create Project', async () => {
        await basePage.navigateToHomePage(driver);
        await basePage.loginToHomePage(driver);
        await driver.sleep(2000);
        await basePage.navigateToProjectTemplates(driver);
        await projectTemplates.createProject(driver,
            projectID = "TP122",
            projectTitle = "Testing Project 122");
    });

    test('CMA-69: Create Task', async () => {
        await basePage.navigateToHomePage(driver);
        await basePage.loginToHomePage(driver);
        await driver.sleep(2000);
        await basePage.navigateToProjectTemplates(driver);
        await projectTemplates.navigateToTasks(driver);
        // await projectTemplates.deleteTask(driver, 34);
        await projectTemplates.createTask(driver,
            task = "Test Task",
            personResponsible = "Jeremiah Soyebo",
            start_date = "2025-04-17",
            end_date = "2025-07-25",
            priority = projectTemplates.priorities.critical,
            projectStatus = projectTemplates.statuses.inProgress);
        
    }); 

    test('CMA-68: Create Meeting', async () => {
        await basePage.navigateToHomePage(driver);
        await basePage.loginToHomePage(driver);
        await driver.sleep(1000);
        await basePage.navigateToProjectTemplates(driver);
        await projectTemplates.navigateToMeetings(driver);
        await projectTemplates.createMeeting(driver, 
            topic = "Test Meeting 205",
            start_date = "2025-06-29",
            time = "10:30",
            period = "AM",
            summary = "Test summary for a potential meeting. This will just be used for testing purposes to ensure validation fo key features within the application.",
            participants = ["Engineer", "Jeremiah"]
        );
    });
});