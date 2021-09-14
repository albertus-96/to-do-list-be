//interface for data todo
export interface ITodo {
	desc: string;
	deadline: string;
}

export interface ITodoDb extends ITodo {
	_id: string;
	done: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ITodoUpdate {
	desc?: string;
	deadline?: string;
	done?: boolean;
}
