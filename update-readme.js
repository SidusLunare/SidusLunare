// update-readme.js

// 1. We'll use axios to fetch data from an external API
//    so make sure to add axios as a dependency in your package.json:
//    npm install axios
const axios = require("axios");
const fs = require("fs");

async function main() {
  // Read the existing README
  let readme = fs.readFileSync("README.md", "utf8");

  // Fetch a random programming quote (or any other API you like)
  // This example uses https://api.quotable.io which is a free quotes API
  let quote, author;
  try {
    const response = await axios.get(
      "https://api.quotable.io/random?tags=technology,famous-quotes"
    );
    quote = response.data.content;
    author = response.data.author;
  } catch (err) {
    // If the API fails, use a fallback
    quote =
      "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.";
    author = "John Woods";
  }

  // We’ll look for a placeholder in the README between <!-- START QUOTE --> and <!-- END QUOTE -->
  // so we can replace just that section (and not overwrite the entire file).
  const newReadme = readme.replace(
    // This regex finds whatever is between these two comment markers
    /(?<=<!-- START QUOTE -->)([\s\S]*?)(?=<!-- END QUOTE -->)/,
    `\n> ${quote}\n>\n> **— ${author}**\n`
  );

  // Write back to README.md
  fs.writeFileSync("README.md", newReadme);
}

main();
