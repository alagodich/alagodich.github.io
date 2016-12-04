const tinify = require("tinify"),
    path = require('path'),
    fs = require('fs'),
    // When creating a new post make sure that script optimizing only new images
    dayPathToOptimize = 'PUT PATH HERE',
    // Get one to execute
    apiKey = null;

let imageCount = 0;
tinify.key = apiKey;

for (const year of fs.readdirSync('images')) {
    if (parseInt(year, 10)) {
        console.log(`optimizing year ${year}`);
        const months = fs.readdirSync(path.join('images', year));
        for (const month of months) {
            if (parseInt(month, 10)) {
                console.log(`month ${month}`);
                const days = fs.readdirSync(path.join('images', year, month));
                for (const day of days) {
                    if (parseInt(day, 10)) {
                        console.log(`day ${day}`);
                        const dayPath = path.join('images', year, month, day)
                            images = fs.readdirSync(dayPath);

                        if (dayPath !== dayPathToOptimize) {
                            continue;
                        }

                        for (const image of images) {
                            if (image[0] !== '.') {
                                imageCount++;
                                const imagePath = path.join('images', year, month, day, image);
                                // Commented for security
                                // const source = tinify.fromFile(imagePath);
                                // source.toFile(imagePath);
                            }
                        }
                    }
                }
            }
        }
    }
}
