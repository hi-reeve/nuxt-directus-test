const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "directus-drizzle", "schema.ts");

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }
    const newData = data.replace(/\.default*\([^)|(?<!]*\) */g, "");

    fs.writeFile(filePath, newData, "utf8", err => {
        if (err) {
            console.error("Error writing to the file:", err);
            return;
        }

        console.log("Replacements were successful!");
    });
});
