const readline = require('readline');
const {Builder, By, Key, until} = require("selenium-webdriver");

const Categories = {
    forRentOrSale: "for rent/sale",
    gifting: "gifting",
    trucks: "trucks",
    business: "business",
    pets: "pets",
    vocations: "vocations",
    wantedOrNeeded: "wanted/needs",
    lostOrFound: "lost/found",
    perks: "perks",
    christianEvents: "christian events",
    coupons: "coupons",
}

 // Delivery options in the market place form
 const DeliveryOptions = {
    notApplicable: "Not Applicable",
    canDeliver: "I can deliver",
    selfPickup: "Self Pickup",
    negotiable: "Negotiable"
};

// Offer statuses in the market place form
const OfferStatuses = {
    available: "Available",
    notAvailable: "No more Available"
};

const PaymentMethods = {
    notApplicable: "Not Applicable",
    check: "Cheque",
    cash: "Cash",
    bankDeposit: "BankDeposit"
};

const DisposalModes = {
    notApplicable: "Not Applicable",
    forSale: "For Sale",
    gifting: "Gifting",
    freeOfCharge: "Free Of Charge"
};

async function fillMarketPlaceForm(driver, 
    productTitle, 
    categories = [], 
    country, 
    email, 
    delivery, 
    offerStatus, 
    paymentMethod, 
    disposalMode, 
    productDetails, 
    phoneNumber = null, 
    city = null, 
    state = null, 
    zipCode = null, 
    location = null, 
    branch = null) {
    await driver.findElement(By.name("market[product_title]")).sendKeys(productTitle);
    // Opening the category dropdown with xpath, no other locators available
    await driver.findElement(By.xpath('//*[@id="ms-list-1"]/button')).click();
    await driver.sleep(750);

     // Select categories dynamically
     for (const category of categories) {
        const categoryLocator = By.css(`li[data-search-term='${category}']`);
        await driver.findElement(categoryLocator).click();
        await driver.sleep(150);
    }
    await driver.findElement(By.name("market[country]")).click();
    await driver.findElement(By.css(`option[value='${country}']`)).click();
    await driver.findElement(By.name("market[contact_email]")).sendKeys(email);
    await driver.findElement(By.name("market[delivery]")).click();
    await driver.findElement(By.css(`option[value='${delivery}']`)).click();
    await driver.findElement(By.name("market[offer_status]")).click();
    await driver.findElement(By.css(`option[value='${offerStatus}']`)).click();
    await driver.findElement(By.name("market[payment_method]")).click();
    await driver.findElement(By.css(`option[value='${paymentMethod}']`)).click();
    await driver.findElement(By.name("market[mode_disposal]")).click();
    await driver.findElement(By.css(`option[value='${disposalMode}']`)).click();
    await driver.findElement(By.name("market[details_product_service]")).sendKeys(productDetails);
    
}

module.exports = {
    Categories,
    DeliveryOptions,
    OfferStatuses,
    PaymentMethods,
    DisposalModes,
    fillMarketPlaceForm,
}