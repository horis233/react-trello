import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

class ListTitle extends Component {
	static propTypes = {
		listTitle: PropTypes.string.isRequired,
		listId: PropTypes.string.isRequired,
		boardId: PropTypes.string.isRequired,
		cards: PropTypes.arrayOf(PropTypes.string).isRequired,
		dragHandleProps: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			newTitle: props.listTitle
		};
	}
	handleChange = (event) => {
		this.setState({ newTitle: event.target.value });
	};
	handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.handleSubmit();
		} else if (event.keyCode === 27) {
			this.revertTitle();
		}
	};
	handleSubmit = () => {
		const { newTitle } = this.state;
		const { listTitle, listId, boardId, dispatch } = this.props;
		if (newTitle === '') return;
		if (newTitle !== listTitle) {
			dispatch({
				type: 'EDIT_LIST_TITLE',
				payload: { listTitle: newTitle, listId, boardId }
			});
		}
		this.setState({ isOpen: false });
	};
	revertTitle = () => {
		this.setState({ newTitle: this.props.listTitle, isOpen: false });
	};
	deleteList = () => {
		const { listId, cards, boardId, dispatch } = this.props;
		dispatch({
			type: 'DELETE_LIST',
			payload: { cards, listId, boardId }
		});
	};
	openTitleEditor = () => {
		this.setState({ isOpen: true });
	};
	handleButtonKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.openTitleEditor();
		}
	};
	render() {
		const { isOpen, newTitle } = this.state;
		const { dragHandleProps, listTitle } = this.props;
		return (
			<div>
				{isOpen ? (
					<div className="list-title-textarea-wrapper">
						<Textarea
							autoFocus
							useCacheForDOMMeasurements
							value={newTitle}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							className="list-title-textarea"
							onBlur={this.handleSubmit}
							spellCheck={false}
						/>
					</div>
				) : (
					<div className="list-title">
						<div
							{...dragHandleProps}
							role="button"
							tabIndex={0}
							onClick={this.openTitleEditor}
							onKeyDown={(event) => {
								this.handleButtonKeyDown(event);
								dragHandleProps.onKeyDown(event);
							}}
							className="list-title-button"
						>
							{listTitle}
						</div>
						<button onClick={this.deleteList} className="delete-list-button">
							<FaTimesCircle />
						</button>
					</div>
				)}
			</div>
		);
	}
}
export default connect()(ListTitle);
