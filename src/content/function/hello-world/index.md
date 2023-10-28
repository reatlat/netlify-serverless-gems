---
title: Hello World
description: It`s a simple function that returns a string.
tags: [example]
---

```js
exports.handler = async (event, context) => {

  console.log({event}, {context});

  const {body, httpMethod, queryStringParameters} = event;

  let name = "World";

  // if method GET
  if (httpMethod === "GET") {
    name = (queryStringParameters || {}).name || "World";
  }
  if (httpMethod === "POST") {
    name = (JSON.parse(body) || {}).name || "World";
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name}!`,
    }),
  };

};
```

Check the source code on [GitHub](https://github.com/{{ build.issues.owner }}/{{ build.issues.repo }}/blob/main/netlify/functions/{{ title | slugify }}/index.js).

{% include "./test.njk" %}

