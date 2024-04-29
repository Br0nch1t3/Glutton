import { WebElement } from "selenium-webdriver";

export async function getTextFromElements(wes: Array<WebElement>) {
  const texts = [];

  for (const we of wes) {
    const text = await we.getText();

    texts.push(text);
  }

  return texts;
}
