import http from 'http';
import fs from 'fs';

export function writeDataToFile(filename: string, content: unknown) {
	return fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
}

export function getBody<Object>(req: http.IncomingMessage): Promise<Object> {
	return new Promise((resolve) => {
		//create a body
		let body: Uint8Array[] = [];

		//get the data
		req.on('data', (chunk) => {
			body.push(chunk);
		});

		//put data to body
		req.on('end', () => {
			if (body.length === 0) {
				resolve({} as Object);
			} else {
				resolve(JSON.parse(Buffer.concat(body).toString()));
			}
		});
	});
}
