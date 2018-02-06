import { pageSelector } from '../reducers/location.js';
import { updateMeta } from './meta.js';
import { currentItemSelector } from '../reducers/categories.js';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const REQUEST_CATEGORY_ITEMS = 'REQUEST_CATEGORY_ITEMS';
export const RECEIVE_CATEGORY_ITEMS = 'RECEIVE_CATEGORY_ITEMS';
export const FAIL_CATEGORY_ITEMS = 'FAIL_CATEGORY_ITEMS';

const INITIAL_CATEGORIES = {
  'mens_outerwear': {
    name: 'mens_outerwear',
    title: 'Men\'s Outerwear',
    image: 'images/mens_outerwear.jpg',
    placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAXAABAQEAAAAAAAAAAAAAAAAAAAIEAQEAAAAAAAAAAAAAAAAAAAACEAAAAwYHAQAAAAAAAAAAAAAAERMBAhIyYhQhkaEDIwUVNREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3dkr5e8tfpwuneJITOzIcmQpit037Bw4mnCVNOpAAQv/2Q=='
  },
  'ladies_outerwear': {
    name: 'ladies_outerwear',
    title: 'Ladies Outerwear',
    image: 'images/ladies_outerwear.jpg',
    placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAWQABAQAAAAAAAAAAAAAAAAAAAAEBAQEAAAAAAAAAAAAAAAAAAAIDEAABAwMFAQAAAAAAAAAAAAARAAEygRIDIlITMwUVEQEBAAAAAAAAAAAAAAAAAAAAQf/aAAwDAQACEQMRAD8Avqn5meQ0kwk1UyclmLtNj7L4PQoioFf/2Q=='
  },
  'mens_tshirts': {
    name: 'mens_tshirts',
    title: 'Men\'s T-Shirts',
    image: 'images/mens_tshirts.jpg',
    placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAWwABAQEAAAAAAAAAAAAAAAAAAAMEAQEAAAAAAAAAAAAAAAAAAAAAEAABAwEJAAAAAAAAAAAAAAARAAESEyFhodEygjMUBREAAwAAAAAAAAAAAAAAAAAAAEFC/9oADAMBAAIRAxEAPwDb7kupZU1MTGnvOCgxpvzEXTyRElCmf//Z'
  },
  'ladies_tshirts': {
    name: 'ladies_tshirts',
    title: 'Ladies T-Shirts',
    image: 'images/ladies_tshirts.jpg',
    placeholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAADAA4DASIAAhEBAxEB/8QAXwABAQEAAAAAAAAAAAAAAAAAAAMFAQEBAAAAAAAAAAAAAAAAAAABAhAAAQIDCQAAAAAAAAAAAAAAEQABITETYZECEjJCAzMVEQACAwAAAAAAAAAAAAAAAAAAATFBgf/aAAwDAQACEQMRAD8AzeADAZiFc5J7BC9Scek3VrtooilSNaf/2Q=='
  }
};

export const fetchCategories = () => (dispatch) => {
  // This can be dispatched async if needed (e.g. after a fetch() request).
  dispatch({
    type: RECEIVE_CATEGORIES,
    categories: INITIAL_CATEGORIES
  });
};

export const fetchCategoryItems = (category) => (dispatch) => {
  if (category && !category.items && !category.isFetching) {
    dispatch(requestCategoryItems(category.name));
    return fetch(`data/${category.name}.json`)
      .then(res => res.json())
      .then(items => dispatch(receiveCategoryItems(category.name, items)))
      .catch(() => dispatch(failCategoryItems(category.name)));
  }
};

const requestCategoryItems = (categoryId) => {
  return {
    type: REQUEST_CATEGORY_ITEMS,
    categoryId
  };
};

const receiveCategoryItems = (categoryId, items) => (dispatch, getState) => {
  dispatch({
    type: RECEIVE_CATEGORY_ITEMS,
    categoryId,
    items
  });

  // NOTE: The UPDATE_META action below needs to be created with the updated state (i.e.
  // the state with the new category.items), so it cannot be combined with
  // RECEIVE_CATEGORY_ITEMS.
  const state = getState();
  if (pageSelector(state) === 'detail') {
    const item = currentItemSelector(state);
    dispatch(updateMeta({
      title: item.title,
      description: item.description.substring(0, 100),
      image: document.baseURI + item.image
    }));
  }
};

const failCategoryItems = (categoryId) => {
  return {
    type: FAIL_CATEGORY_ITEMS,
    categoryId
  };
};
