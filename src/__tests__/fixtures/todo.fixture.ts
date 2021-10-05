//test image
const imagePath = 'src/__tests__/assets/images/test-image.jpeg';
const imagePath2 = 'src/__tests__/assets/images/test-image2.jpg';

//payload for new todo
export const addNewTodo = {
	desc: 'new todo',
	deadline: '2099-12-12T00:00:00.000Z',
	screenshot: imagePath,
};

//payload for updated todo
export const updateTodo = {
	desc: 'update todo',
	screenshot: imagePath2,
};

//wrong todo id should return no todo
export const wrongTodoId = '615127b43cbaeb3a9d34ff91';
