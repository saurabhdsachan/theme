import React, { Component } from "react";
import styled from "styled-components";
import cancelIcon from "./images/cancel.svg";
import errorIcon from "./images/error.svg";
import successIcon from "./images/success.svg";

const NotificationStyled = styled.div`
	background: white;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	max-width: 350px;
	padding: 12px;
	margin-bottom: 12px;
	padding: 10px 16px;
	background: #fff;
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: all;
	img {
		height: 20px;
		width: 20px;
	}
	button {
		background: transparent;
		border: 0;
		outline: none;
		img {
			height: 10px;
			width: 10px;
		}
	}
`;
const TitleStyled = styled.div`
	margin-bottom: 6px;
	font-size: 1.1em;
`;

export default class Notification extends Component {
	componentDidMount = () => {
		const { timer } = this.props;
		if (timer !== 0) {
			this.timeout = setTimeout(this.requestHide, timer * 1000);
		}
	};

	componentWillUnmount = () => {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	};

	getIcon = type => {
		switch (type) {
			case "success":
				return successIcon;
			case "error":
				return errorIcon;

			default:
				break;
		}
	};

	handleClick = () => {
		this.requestHide();
	};

	requestHide = () => {
		const { onRequestHide, id } = this.props;
		onRequestHide(id);
	};

	render() {
		const { type, title, message, id, closeable } = this.props;
		return (
			<NotificationStyled role="alert" className={`notification, notification-${type}`}>
				<div style={{ marginRight: "12px" }}>
					<img src={this.getIcon(type)} alt={type} />
				</div>
				<div>
					<TitleStyled>
						{title}
						{id}
					</TitleStyled>
					<div className="message">{message}</div>
				</div>
				{closeable && (
					<div style={{ marginLeft: "12px" }}>
						<button onClick={this.handleClick}>
							<img src={cancelIcon} alt="close" />
						</button>
					</div>
				)}
			</NotificationStyled>
		);
	}
}
