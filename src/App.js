import React, { Component } from "react";
import { NotificationService, NotificationWrapper } from "./components/Message";

class App extends Component {
	render() {
		return (
			<div className="App">
				<button
					onClick={() => {
						NotificationService.success("Notification", "This is a prompt message for success, and it will disappear in 4 seconds", null, 4);
					}}
				>
					Success
				</button>
				<button
					onClick={() => {
						NotificationService.error("Notification", "This is a prompt message for Error, and it will disappear in 6 seconds", "closeable", 6);
					}}
				>
					Error
				</button>
				<button
					onClick={() => {
						NotificationService.success("Notification", "This is a prompt message for success, and it will not disappear until you close", "closeable", 0);
					}}
				>
					Sticky
				</button>
				<NotificationWrapper />
			</div>
		);
	}
}

export default App;
