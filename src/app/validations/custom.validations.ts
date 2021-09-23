export const objectId = (value: string, helpers: any) => {
	if (!value.match(/^[0-9a-fA-F]{24}$/)) {
		return helpers.message('"{{#label}}" must be a valid mongo id');
	}
	return value;
};

export const todoDeadline = (value: string, helpers: any) => {
	if (new Date(value) > new Date()) {
		return value;
	} else {
		return helpers.message('Deadline already expired');
	}
};
