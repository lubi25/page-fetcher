const fs = require('fs');
const axios = require('axios');

const [, , url, filePath] = process.argv;

const writeStream = fs.createWriteStream(filePath);

let downloadedBytes = 0;

axios.get(url, { responseType: 'stream' })
  .then((response) => {
    response.data.on('data', (chunk) => {
      downloadedBytes += chunk.length;
      writeStream.write(chunk);
    });

    response.data.on('end', () => {
      console.log(`Downloaded and saved ${downloadedBytes} bytes to ${filePath}`);
      writeStream.end();
    });
  })
  .catch((error) => console.log(error));