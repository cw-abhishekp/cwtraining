import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import Filter from '../components/Filter';
import { changeCity } from '../redux/Filter/FilterActions';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/Filter/FilterActions', () => ({
  changeCity: jest.fn(),
}));

describe('City Checkbox Toggle', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);

    useSelector.mockImplementation(cb =>
      cb({
        cityData: {
          data: [
            { cityId: 1, cityName: 'Mumbai' },
            { cityId: 2, cityName: 'Delhi' },
          ],
        },
        filterData: { cityIds: [] },
        makeData: { data: [{ makeId: 1, makeName: 'BMW' }] },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches changeCity on click', () => {
    render(<Filter />);

    const mumbaiCheckbox = screen.getByLabelText('Mumbai');
    fireEvent.click(mumbaiCheckbox);

    expect(changeCity).toHaveBeenCalledWith([1]);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('removes cityId when unchecking', () => {
    useSelector.mockImplementation(cb =>
      cb({
        cityData: {
          data: [
            { cityId: 1, cityName: 'Mumbai' },
            { cityId: 2, cityName: 'Delhi' },
          ],
        },
        filterData: { cityIds: [1] },
        makeData: { data: [{ makeId: 1, makeName: 'BMW' }] },
      })
    );

    render(<Filter />);

    const mumbaiCheckbox = screen.getByLabelText('Mumbai');
    fireEvent.click(mumbaiCheckbox); // uncheck

    expect(changeCity).toHaveBeenCalledWith([]);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('shows correct checked state', () => {
    useSelector.mockImplementation(cb =>
      cb({
        cityData: {
          data: [
            { cityId: 1, cityName: 'Mumbai' },
            { cityId: 2, cityName: 'Delhi' },
          ],
        },
        filterData: { cityIds: [2] },
        makeData: { data: [{ makeId: 1, makeName: 'BMW' }] },
      })
    );

    render(<Filter />);

    const delhiCheckbox = screen.getByLabelText('Delhi');
    const mumbaiCheckbox = screen.getByLabelText('Mumbai');

    expect(delhiCheckbox.checked).toBe(true);
    expect(mumbaiCheckbox.checked).toBe(false);
  });
});
