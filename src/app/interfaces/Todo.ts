//interface for data todo
export interface ITodo {
	userId?: string;
	desc: string;
	deadline: string;
	done?: boolean;
	screenshot?: { name: string; url: string };
}
