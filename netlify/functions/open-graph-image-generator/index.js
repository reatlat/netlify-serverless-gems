/**
 * Open Graph Image Generator
 * @link https://netlify.serverless-gems.dev/function/open-graph-image-generator/
 */
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event, context) => {

  console.log({event}, {context});

  const { httpMethod, queryStringParameters } = event;

  if (httpMethod !== "GET")
    return {
      statusCode: 405,
      body: JSON.stringify({
        status: "error",
        message: `${httpMethod} method not allowed. Use GET.`,
      }),
    };

  const { url } = queryStringParameters;

  if (!url)
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: `Missing required parameter: url`,
      }),
    };

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { height: 630, width: 1200 },
      executablePath:
        process.env.CHROME_EXECUTABLE_PATH ||
        (await chromium.executablePath(
          "/var/task/node_modules/@sparticuz/chromium/bin"
        )),
    });

    const page = await browser.newPage();

    // go to page and wait 1second for page to load
    await page.goto(url, { timeout: 6000, waitUntil: "load" }); // 'networkidle2'

    const buffer = await page.screenshot();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: error.message,
      }),
    };
  }
};
