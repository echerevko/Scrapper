#!/usr/bin/env node

const dotenv = require("dotenv");
const puppeteer = require("puppeteer");
const chalk = require("chalk");
const { selectors } = require("./datamodel");
const scraping = require("./scraping");

async function main() {
  const { EXTRACT_URL, QUERY_LICENSE: license, DEBUG } = process.env;
  const headless = typeof DEBUG === "undefined" || DEBUG == false;
  const outputs = ["00-query.png", "01-results.png"];
  const screenshots = [...outputs];

  // open browser
  const browser = await puppeteer.launch({ headless });

  // open page
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(EXTRACT_URL);

  // enter query string
  await page.type("#ts-regnr-sok", license);
  await page.screenshot({ path: screenshots.shift() });

  // do the query
  await page.click("#btnSok");
  await page.screenshot({ path: screenshots.shift() });

  // extract all the values now
  const data = await scraping(page, { license }, selectors);
  console.log(chalk.yellow("extracted: "), data);

  // cleanup & steps screenshots
  browser.close();
  console.log(chalk.blue("\nSee screenshots: "), outputs);
}

// load .env variables, console.log(process.env);
const envConfigurationResult = dotenv.config();
if (envConfigurationResult.error) throw envConfigurationResult.error;

main();
