export default async (file) =>
  new Promise((resolve) => {
    const { createReadStream, filename, mimetype } = file;
    const stream = createReadStream();
    const bufs = [];
    stream.on('data', (d) => {
      bufs.push(d);
    });
    stream.on('end', () => {
      const buffer = Buffer.concat(bufs);
      resolve({
        name: filename,
        type: mimetype,
        size: bufs.reduce((sum, buf) => sum + buf.length, 0),
        buffer: buffer.toString('base64'),
      });
    });
  });
