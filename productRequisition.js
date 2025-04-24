const readline = require('readline');
const {Builder, By, Key, until} = require("selenium-webdriver");

const branch = {
    houstonBranch: 5,
    californiaUptownBranch: 74,
    brisbaneBranch: 123,
 }

const teams = {
    businessAnalysis: 2,
    cyberSecurity: 1
}

const priorities = {
    high: "High", 
    medium: "Medium",
    low: "Low"
}

const statuses = {
    newRequest: 1,
    onHold: 2,
    deferred: 3,
    rejected: 4,
    approved: 5
}

//Fill the Product Requesition form
async function fillProductRequisitionEntry(driver, 
    productName, 
    branch, 
    team,
    priority,
    status,
    purchaser = null) {
    // Fill form by filling out each required field
    await driver.findElement(By.name("product_name")).sendKeys(productName);
    await driver.findElement(By.name("branch_id")).click();
    await driver.findElement(By.css(`option[value='${branch}']`)).click();
    await driver.sleep(150);
    await driver.findElement(By.name("purchaser")).sendKeys(purchaser);
    // Open dropdown and select the team from the dropdown
    await driver.findElement(By.name("department_id")).click();
    await driver.findElement(By.css(`option[value='${team}']`)).click();
    // Open the priority dropdown and select a priority
    await driver.findElement(By.name("priority")).click();
    await driver.findElement(By.css(`option[value='${priority}']`)).click();
    await driver.findElement(By.name("status")).click();
    await driver.findElement(By.css(`option[value='${status}']`)).click();
    await driver.findElement(By.css("input[value='Yes']")).click();
    await driver.findElement(By.name("assignapprovaltoa")).sendKeys("Jeremiah");
    await driver.sleep(1000);
    await driver.findElement(By.css("a[tabindex='-1']")).click();
    await driver.findElement(By.name("product_cost_amount")).sendKeys("60,000");
    await driver.findElement(By.name("business_justification")).sendKeys("This form needs to be tested to verify that it is working the way it is intended.");
    await driver.findElement(By.name("product_description")).sendKeys("Imaginary product used strictly for testing.");
}

module.exports = {
    branch,
    teams,
    priorities,
    statuses,
    fillProductRequisitionEntry
}