// Formatter for response
const formatResponse = (message: string, data: object = {}, success: Boolean = true, err_code: number = 500) => {
	return success
		? {
				success: success,
				message: message,
				data: data,
		  }
		: {
				success: success,
				message: message,
				err_code: err_code,
				data: data,
		  };
};

export default formatResponse;
