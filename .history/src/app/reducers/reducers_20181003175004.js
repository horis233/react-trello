// @flow
type CardState = {
  [string]: {
    title: string,
    id: string
  }
};

type ListState = {
  [string]: {
    title: string,
    id: string,
    cards: Array<string>
  }
};

type BoardState = {
  [string]: {
    title: string,
    id: string,
    lists: Array<string>
  }
};

type Action = {
  type: string,
  payload: {
    listId: string,
    listTitle: string,
    cardId: string,
    cardTitle: string,
    sourceIndex: number,
    destinationIndex: number
  }
};

const initialCardState = {
  qwer: {
    title: "Inspect how trello deals with loading boards, images",
    id: "qwer"
  },
  asdf: {
    title: "Make skeleton structure of whatever",
    id: "asdf"
  },
  zxcv: {
    title: "Do some stuff",
    id: "zxcv"
  },
  lkjhag: {
    title: "Maybe a really really long one: How should I manage board state, and generally state for components that are the same but have different data?",
    id: "lkjhag"
  }
};

const initialListState = {
  lgrnrirgi: {
    title: "TODO Big picture",
    id: "lgrnrirgi",
    cards: ["qwer", "asdf"]
  },
  ogtpokpr: {
    title: "TODO details",
    id: "ogtpokpr",
    cards: ["zxcv", "lkjhag"]
  }
};

const initialBoardState = {
  abc123: {
    title: "Test Board: abc123",
    id: "abc123",
    lists: ["lgrnrirgi", "ogtpokpr"]
  }
};

const cards = (state : CardState = initialCardState, action : Action) => {
  switch (action.type) {
    case "ADD_CARD":
    case "EDIT_CARD_TITLE":
      {
        const {cardTitle, cardId} = action.payload;
        return {
          ...state,
          [cardId]: {
            title: cardTitle,
            id: cardId
          }
        };
      }
    default:
      return state;
  }
};

const lists = (state : ListState = initialListState, action : Action) => {
  switch (action.type) {
    case "ADD_CARD":
      {
        const {listId, cardId} = action.payload;
        return {
          ...state,
          [listId]: {
            ...state[listId],
            cards: [
              ...state[listId].cards,
              cardId
            ]
          }
        };
      }
    case "EDIT_LIST_TITLE":
      {
        const {listId, listTitle} = action.payload;
        return {
          ...state,
          [listId]: {
            ...state[listId],
            title: listTitle
          }
        };
      }
    case "REORDER_LIST":
      {
        const {sourceIndex, destinationIndex, listId} = action.payload;
        const newCards = Array.from(state[listId].cards);
        const [removedCard] = newCards.splice(sourceIndex, 1);
        newCards.splice(destinationIndex, 0, removedCard);
        return {
          ...state,
          [listId]: {
            ...state[listId],
            cards: newCards
          }
        };
      }
    default:
      return state;
  }
};

const boards = (state : BoardState = initialBoardState, action : Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default {cards, lists, boards};