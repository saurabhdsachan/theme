import React, { Component } from "react";
import styled from "styled-components";
import Notification from "./Notification";
import NotificationService from "./NotificationService";

const NotificationWrapperStyled = styled.div`
	position: absolute;
	font-size: 12px;
	width: 100vw;
	top: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

class NotificationWrapper extends Component {
	state = {
		notificationsList: []
	};

	componentWillMount = () => {
		NotificationService.addChangeListener(this.handleStateChange);
	};

	componentWillUnmount = () => {
		NotificationService.removeChangeListener(this.handleStateChange);
	};

	handleStateChange = notificationsList => {
		this.setState({
			notificationsList
		});
	};

	onRequestHide = id => {
		console.log(id);
		NotificationService.remove(id);
	};

	render() {
		const { notificationsList } = this.state;
		return (
			<NotificationWrapperStyled>
				{notificationsList.map(notification => (
					<Notification key={`${notification.id}`} onRequestHide={this.onRequestHide} {...notification} />
				))}
			</NotificationWrapperStyled>
		);
	}
}

export default NotificationWrapper;
