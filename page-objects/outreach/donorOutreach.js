const readline = require('readline');
const {Builder, By, Key, until} = require("selenium-webdriver");

 const branch = {
    houstonBranch: 5,
    californiaUptownBranch: 74,
    brisbaneBranch: 123,
 }

 const donorStatus = {
    new: "New",
    contacted: "Contacted",
    cannotBeReached: "Cannot be Reached",
    nowADonor: "Now a Donor"
 }

// Fill the donor outreach form
async function fillDonorOutreachForm(driver, 
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    branch) {
    await driver.findElement(By.name("donor[first_name]")).sendKeys(firstName);
    await driver.findElement(By.name("donor[last_name]")).sendKeys(lastName);
    await driver.findElement(By.name("donor[email]")).sendKeys(email);
    await driver.findElement(By.name("donor[phone]")).sendKeys(phoneNumber);
    await driver.findElement(By.name("donor[branch_id]")).click();
    // After opening the branch dropdown, click the branch selected by the user
    await driver.findElement(By.css(`option[value='${branch}']`)).click();
    }

    module.exports = {
        branch,
        donorStatus,
        fillDonorOutreachForm
    }