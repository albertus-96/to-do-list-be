import config from '../configs/config';

const fs = require('fs');

/* Function to check whether or not
the directories for storing images already exist. */
const checkUploadDir = () => {
	const uploadDir = 'public/uploads';
	const imagesDir = '/images';

	// Screenshot images directories
	if (!fs.existsSync(uploadDir + 'images')) {
		fs.mkdir(uploadDir + imagesDir, { recursive: true }, (err: Error) => {
			if (err) {
				console.error(err.message);
				return err.message;
			}
		});
	}
};

// Function for removing images from directories after deletion or update of a data.
const removeFromStorage = (path: string) => {
	fs.unlink(path, (err: Error) => {
		if (err) {
			console.error(err.message);
		}
	});
};

// Function for storing images inputted by user to the server.
const uploadFile = (file: any, destination: any = config.imgDir) => {
	const currentDate = Date.now();
	const img = file;
	const savedImageName = currentDate + '-' + img.name;

	img.mv(`public/${destination}/${savedImageName}`, (err: Error) => {
		if (err) {
			console.error(err.message);
		}
	});
	return savedImageName;
};

export { checkUploadDir, removeFromStorage, uploadFile };
