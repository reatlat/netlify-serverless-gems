---
title: Open Graph Image Generator
description: The function generates an Open Graph image from a website URL.
tags: [image, open-graph, puppeteer]
---


```js
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

exports.handler = async (event, context) => {
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
    await page.goto(url, { waitUntil: "domcontentloaded" });

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

```

Netlify requires setup config like this:

```yaml
[functions]
  node_bundler = "esbuild"
  external_node_modules = ["@sparticuz/chromium"]
```

Check the source code on [GitHub](https://github.com/{{ build.issues.owner }}/{{ build.issues.repo }}/blob/main/netlify/functions/{{ title | slugify }}/index.js).

{% include "./test.njk" %}

