const readline = require('readline');
const {Builder, By, Key, until} = require("selenium-webdriver");
const basePage = require('../homePage/basePage');
const entryPage = require('../entryPages');
const { elementLocated, elementIsVisible } = require('selenium-webdriver/lib/until');

const baseURL = 'https://crmdev.crmmarshal.com/';

// Locators for the buttons on the project tmeplates page
const emailLocator = By.className("btn btn-primary dropdown-toggle");
const taskLocator = By.css(`a[href='${baseURL}project-task/ajZiMUQ4WUxPMDNQOFAxeFJqWHFnQT09']`);
const meetingLocator = By.css(`a[href='${baseURL}project-meeting/ajZiMUQ4WUxPMDNQOFAxeFJqWHFnQT09']`);
const createProjectLocator = By.css("button[aria-controls='CreatPage']");
const editProjectLocator = By.className("btn btn-primary btn-icon-text editprotemp");
const addEntryLocator = By.css("button[class='btn btn-primary btn-icon-text add-new-fun']")

// Array for the available prioprites to select from
const priorities = {
    critical: "Critical",
    high: "High", 
    medium: "Medium",
    low: "Low"
}

// Array for the available task statuses
const statuses = {
    new: "New",
    inProgress: "In Progress",
    onHold: "On-Hold",
    completed: "Completed"
}

async function navigateToMeetings(driver) {
    // Wait for the meeting button to be clickable (using new wait method)
    await basePage.waitForElementClickable(driver, meetingLocator);
    // Click the meeting button
    await driver.findElement(meetingLocator).click();
}

async function navigateToTasks(driver) {
    //Wait for the task button to be clickable
    await basePage.waitForElementClickable(driver, taskLocator);
    // Click the task buttom
    await driver.findElement(taskLocator).click();
}

async function createMeeting(driver, topic, start_date, time, period, summary, participants) {
    await basePage.waitForElementClickable(driver, addEntryLocator);
    // Click the add entry button
    await driver.findElement(addEntryLocator).click();
    // Wait for the meeting topic button to be clickable
    let meetingTopic = By.name("meeting[topic]");
    await basePage.waitForElementVisible(driver, meetingTopic);
    // Enter the meeting topic
    await driver.findElement(By.name("meeting[topic]")).sendKeys(topic);
    // Click the date box to open the meeting calendar
    await driver.findElement(By.name("meeting_date")).click();
    // Select the date from the calendar
    await basePage.selectDate(driver, 0, start_date);
    // Open the time dropdown
    let timeField = By.css("input[class='form-control datepicker']");
    // Enter the time
    await driver.findElement(timeField).sendKeys(time);
    await driver.findElement(timeField).sendKeys(period);
    // Switch to the discussion frame
    let discussionFrame = By.css("iframe[class='cke_wysiwyg_frame cke_reset']");
    await driver.switchTo().frame(await driver.findElement(discussionFrame));
    // Fill in the discussion
    await driver.findElement(By.css("body[class='cke_editable cke_editable_themed cke_contents_ltr cke_show_borders']")).sendKeys(summary);
    // Switch back to the main frame
    await driver.switchTo().defaultContent();
    for (let participant of participants) {
        // Add Participants
        let participantsField = await driver.findElement(By.css("input[class='form-control member-group-search ui-autocomplete-input']"));
        
        // Type the participant's name
        await participantsField.sendKeys(participant);
    
        // Wait for the dropdown to populate
        await driver.sleep(750);  // Adjust the timing as necessary
    
        // Select the name from the dropdown
        await participantsField.sendKeys(Key.ARROW_DOWN);  // Navigate to the suggestion
        await participantsField.sendKeys(Key.ENTER);       // Select the suggestion
        
        // Optional: wait for a moment before adding the next participant
        await driver.sleep(700);  // Adjust based on your app's speed
    }
    // Create the meeting
    await driver.findElement(By.id("btnAdd")).click();
}

async function createProject(driver, projectID, projectTitle) {
    // Wait for the create project locator to be clickable
    await basePage.waitForElementClickable(driver, createProjectLocator);
    // Click the button to create the project
    await driver.findElement(createProjectLocator).click();
    await driver.sleep(300);
    //Fill in the project ID field
    await driver.findElement(By.css("input[placeholder='Project ID']")).sendKeys(projectID);
    // Fill in the project title field
    await driver.findElement(By.name("title")).sendKeys(projectTitle);
    // Create the project
    let submitButton = await driver.wait(until.elementLocated(By.css("[type='submit']")), 10000);
    await driver.wait(until.elementIsVisible(submitButton), 30000); 
    await driver.wait(until.elementIsEnabled(submitButton), 30000);
    await driver.findElement(submitButton).click();
    //await driver.executeScript("arguments[0].click();", submitButton);
}

async function createTask(driver, task, personResponsible, start_date, end_date, priority, status) {
    await basePage.waitForElementClickable(driver, addEntryLocator);
    // Click the add entry button
    await driver.findElement(addEntryLocator).click();

    let projectTaskLocator = By.name("project_task[task]");
    await basePage.waitForElementClickable(driver, projectTaskLocator);
    // Enter the task name
    await driver.findElement(projectTaskLocator).sendKeys(task);

    // Fill in person responsible field
    await driver.findElement(By.name("responsible_name")).sendKeys(personResponsible);
    // Wait for the intellisense field to populate
    await driver.sleep(1000);
    // Click the first option in the intellisense field
    await driver.findElement(By.css("a[tabindex='-1']")).click();

    await driver.findElement(By.name("project_task[start_date]")).click();
    
    await basePage.selectDate(driver, 0, start_date);

    // await driver.sleep(3000);

    await basePage.selectDate(driver, 0, end_date);

    // Open the priority dropdown
    await driver.findElement(By.name("project_task[priority]")).click();
    // Select the priority for the task
    await driver.findElement(By.css(`option[value='${priority}']`)).click();
    // Open the status dropdown
    await driver.findElement(By.name("project_task[status]")).click();
    // Select the status for the task
    await driver.findElement(By.css(`option[value='${status}']`)).click();

    // Click the empty space to exit the dropdown
    await driver.findElement(By.css("div[class='form-group  col-md-4']")).click();

    // Create the task
    await driver.findElement(By.id("btnAdd")).click();
}

async function deleteTask(driver, taskNumber) {
    const selectedTask = By.xpath(`//button[@data-id='${taskNumber}' and @title='Delete']`);
    await basePage.waitForElementClickable(driver, selectedTask);
    await driver.findElement(selectedTask).click();
}

module.exports = {
    priorities,
    statuses,
    navigateToMeetings,
    navigateToTasks,
    createMeeting,
    createProject,
    createTask,
    deleteTask
}