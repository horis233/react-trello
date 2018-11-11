import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import ListTitle from './ListTitle';
import Cards from './Cards';
import './List.scss';

class List extends React.Component {
	static propTypes = {
		boardId: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
		// cards: PropTypes.arrayOf(PropTypes.object)
	};

	constructor() {
		super();
		this.state = {
			cardComposerIsOpen: false
		};
	}

	toggleCardComposer = () => this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

	render = () => {
		const { list, boardId, index } = this.props;
		console.log('LIST', this.props);
		const { cardComposerIsOpen } = this.state;
		return (
			<Draggable draggableId={list._id} index={index} disableInteractiveElementBlocking>
				{(provided) => (
					<div>
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							className="list-wrapper"
						>
							<div className="list">
								<ListTitle
									dragHandleProps={provided.dragHandleProps}
									listTitle={list.title}
									listId={list._id}
									cards={list.cards}
									boardId={boardId}
								/>
								<div className="cards-wrapper">
									<Cards
										listId={list._id}
										cardComposerIsOpen={cardComposerIsOpen}
										toggleCardComposer={
											this.toggleCardComposer
										}
										boardId={boardId}
									/>
								</div>
								{cardComposerIsOpen || (
									<button
										onClick={this.toggleCardComposer}
										className="open-composer-button"
									>
										+
									</button>
								)}
							</div>
						</div>
						{provided.placeholder}
					</div>
				)}
			</Draggable>
		);
	};
}

// const mapStateToProps = (state, ownProps) => ({
// 	cards: ownProps.list.cards.map((cardId) => state.cardsById[cardId])
// });

export default connect()(List);
