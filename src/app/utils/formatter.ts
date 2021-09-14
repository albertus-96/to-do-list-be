import http from 'http';
// Formatter for response
const response = (
	res: http.ServerResponse,
	message: string,
	data: object = {},
	success: Boolean = true,
	net_code: number = 200
) => {
	res.writeHead(net_code, { 'Content-Type': 'application/json' });
	res.write(
		JSON.stringify(
			success
				? {
						success: success,
						message: message,
						data: data,
				  }
				: {
						success: success,
						message: message,
						err_code: net_code,
						data: data,
				  }
		)
	);
	res.end();
};

export default response;
