import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Filter from '../components/Filter';

const mockStore = configureStore([thunk]);

describe('City Checkbox Toggle', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      makeData: {
        data: [
          { makeId: 1, makeName: 'BMW' }, 
          { makeId: 2, makeName: 'Audi' },
        ],
        loading: false,
        error: null
      },
      cityData: {
        data: [
          { CityId: 1, CityName: 'Mumbai' },
          { CityId: 2, CityName: 'Delhi' },
          { CityId: 3, CityName: 'Bangalore' },
        ],
        loading: false,
        error: null
      },
      filterData: {
        fuel: [],
        budget: '0-50',
        makeIds: [],
        cityIds: [1, 2],
      }
    });

    jest.clearAllMocks();
  });

  test('should dispatch changeCity with toggled cityId when checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    // Find the Bangalore checkbox (CityId: 3, not currently selected)
    const bangaloreCheckbox = screen.getByLabelText('Bangalore');

    // Verify it's not checked initially
    expect(bangaloreCheckbox).not.toBeChecked();

    // Click to select
    fireEvent.click(bangaloreCheckbox);

    // Get all dispatched actions
    const actions = store.getActions();

    // Verify an action was dispatched
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0].type).toBe('CHANGE_CITY');
    
    // Verify the payload includes the new cityId (1, 2, 3)
    expect(actions[0].payload).toContain(3);
    expect(actions[0].payload).toEqual(expect.arrayContaining([1, 2, 3]));
  });

  test('should remove cityId when unchecking', () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    // Find the Mumbai checkbox (CityId: 1, currently selected)
    const mumbaiCheckbox = screen.getByLabelText('Mumbai');

    // Verify it's checked initially
    expect(mumbaiCheckbox).toBeChecked();

    // Click to unselect
    fireEvent.click(mumbaiCheckbox);

    // Get all dispatched actions
    const actions = store.getActions();

    // Verify an action was dispatched
    expect(actions.length).toBeGreaterThan(0);
    expect(actions[0].type).toBe('CHANGE_CITY');
    
    // Verify the payload no longer includes cityId 1, only cityId 2 remains
    expect(actions[0].payload).not.toContain(1);
    expect(actions[0].payload).toEqual([2]);
  });

  test('should show checked state for selected cities', () => {
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

    // Mumbai and Delhi should be checked (cityIds: [1, 2])
    const mumbaiCheckbox = screen.getByLabelText('Mumbai');
    const delhiCheckbox = screen.getByLabelText('Delhi');
    const bangaloreCheckbox = screen.getByLabelText('Bangalore');

    expect(mumbaiCheckbox).toBeChecked();
    expect(delhiCheckbox).toBeChecked();
    expect(bangaloreCheckbox).not.toBeChecked();
  });
});