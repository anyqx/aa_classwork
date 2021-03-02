/* globals jest */

jest.mock('../components/events/event_index_item', () => (
  () => ({ render: () => ( <div></div> ) })
));

import React from 'react';
import { mount } from 'enzyme';
import MockRouter from 'react-mock-router';
import EventIndexContainer from '../components/events/event_index_container';
import EventIndex from '../components/events/event_index';
import * as EventActions from '../actions/event_actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const events = {
  1: { id: 1, decription: "description1", date: "2016-01-17" },
  2: { id: 2, decription: "description2", date: "2016-01-18" },
  3: { id: 3, decription: "description3", date: "2016-01-19" }
};
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore({ events });

describe('event index', () => {
  let eventIndexWrapper;

  beforeEach(() => {
    EventActions.requestEvents = jest.fn(() => dispatch => {});

    eventIndexWrapper = mount(
      <MockRouter>
        <EventIndexContainer store={testStore} />
      </MockRouter>
    ).find(EventIndex);
  });

  it('correctly maps state to props', () => {
    expect(eventIndexWrapper.props().events).toEqual(Object.values(events));
  });

  it('correctly maps dispatch to props', () => {
    expect(eventIndexWrapper.props().requestEvents).toBeDefined();
    expect(eventIndexWrapper.props().deleteEvent).toBeDefined();
  });

  it('calls requestEvents', () => {
    expect(EventActions.requestEvents).toBeCalled();
  });

  it('renders a EventIndexItem for each event, passing in the `event` object and the `deleteEvent` action as props', () => {
    const eventsIndexItems = eventIndexWrapper.find('ul').children();
    expect(eventsIndexItems.getElements().length).toBe(3);

    eventsIndexItems.forEach( (element, idx) => {
      expect(element.props().event).toEqual(events[idx + 1]);
      expect(element.props().deleteEvent).toEqual(eventIndexWrapper.props().deleteEvent);
    });
  });

  it('Links to the new event page', () => {
    const newLink = eventIndexWrapper.find('Link');
    expect(newLink.props().children).toEqual("New Event")
    expect(newLink.props().to).toEqual(`/events/new`);
  });
});
