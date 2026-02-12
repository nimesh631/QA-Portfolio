const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require("assert");
// var should = require("chai").should();

describe("add todo tests", function() {
  it("successfully added todo", async function() {
    let driver = await new Builder().forBrowser("firefox").build();

    await driver.get("https://lambdatest.github.io/sample-todo-app/");

    // add todo
    await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

    // wait until the last li has the correct text
    let lastTodo = await driver.wait(
      until.elementLocated(By.xpath("//ul/li[last()]")),
      5000
    );
    await driver.wait(until.elementTextIs(lastTodo, "Learn Selenium"), 5000);

    // assert
    let todoText = await lastTodo.getText();

    // node assertion
    assert.strictEqual(todoText, "Learn Selenium");

    // assert using chai should
    // todoText.should.equal("Learn Selenium");

    await driver.quit();
  });
});
