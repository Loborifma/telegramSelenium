const { Builder, By, until, Key } = require("selenium-webdriver");

//URL чата
const url = "https://web.telegram.org/a/#-1002021751367";
//Тригерные слова
const triggerWords = /(Отдам|Who wants)/gi;
//Промежуток между ответами в минутах
const delayBetweenAnswerInMinutes = 1;

/*---------------------------------------------------- Код программы --------------------------------------------------------------*/
let isMatch = false;
let isAnswered = false;
let lastProcessedTimeOfMessage = "";
let lastProcessedMessage = "";

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const waitTillAppear = async (driver, element = () => false) => {
  await driver.wait(element, Number.MAX_SAFE_INTEGER);
};

const checkIfTriggerWords = async (driver) => {
  const queryForMessage = By.css(".last-in-group.last-in-list .text-content");
  const queryForTime = By.css(".last-in-group.last-in-list .message-time");

  await waitTillAppear(driver, until.elementLocated(queryForMessage));
  const innerText = await driver.findElement(queryForMessage).getText();
  const timeOfMessage = await driver.findElement(queryForTime).getText();

  if (
    (innerText !== lastProcessedMessage ||
      timeOfMessage !== lastProcessedTimeOfMessage) &&
    innerText.search(triggerWords) !== -1
  ) {
    lastProcessedTimeOfMessage = timeOfMessage;
    lastProcessedMessage = innerText;
    return true;
  }

  return false;
};

const sendAnswer = async (driver) => {
  const messageField = await driver.findElement(
    By.css("#editable-message-text.form-control.allow-selection")
  );

  await messageField.sendKeys(Key.SPACE);
  await driver.executeScript("arguments[0].innerText = 'Беру'", messageField);

  const sendButton = By.css(
    ".Button.send.main-button.default.secondary.round.click-allowed"
  );
  await driver.wait(until.elementLocated(sendButton), 10000); // Ожидание, пока кнопка станет доступна
  const sendButtonElement = await driver.findElement(sendButton);

  try {
    await sendButtonElement.click(); // Попытка стандартного клика
  } catch (error) {
    await driver.executeScript("arguments[0].click();", sendButtonElement); // Клик через JavaScript
  }

  isAnswered = true;
};

const init = async (driver) => {
  isMatch = await checkIfTriggerWords(driver);

  if (isMatch) {
    await sendAnswer(driver);
    await delay(1000);
    await sendAnswer(driver);
  }
};

(async function main() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(url);
    await waitTillAppear(
      driver,
      until.elementLocated(By.id("editable-message-text"))
    );

    while (true) {
      await init(driver);

      if (isAnswered) {
        await delay(delayBetweenAnswerInMinutes * 60000);
        isAnswered = false;
      }

      await delay(1000);
    }
  } catch (e) {
    console.log(e);
  }
})();
