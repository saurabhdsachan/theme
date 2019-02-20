import { EventEmitter } from "events";

const Constants = {
	CHANGE: "change",
	INFO: "info",
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error"
};

const getUniqueId = () => {
	const stamp = new Date();
	return stamp.getTime();
};

class NotificationService extends EventEmitter {
	constructor() {
		super();
		this.listNotify = [];
	}

	create(notify) {
		const defaultNotify = {
			type: "info",
			title: null,
			message: null,
			timer: 5000,
			id: getUniqueId()
		};
		this.listNotify.push(Object.assign(defaultNotify, notify));
		this.emitChange();
	}

	remove(id) {
		this.listNotify = this.listNotify.filter(n => id !== n.id);
		this.emitChange();
	}

	success(title, message, closeable, timer) {
		this.create({
			type: Constants.SUCCESS,
			title,
			message,
			closeable,
			timer
		});
	}

	error(title, message, closeable, timer) {
		this.create({
			type: Constants.ERROR,
			title,
			message,
			closeable,
			timer
		});
	}

	emitChange() {
		this.emit(Constants.CHANGE, this.listNotify);
	}

	addChangeListener(callback) {
		this.addListener(Constants.CHANGE, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(Constants.CHANGE, callback);
	}
}

export default new NotificationService();
