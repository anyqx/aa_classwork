/* globals jest */

import React from 'react';
import MockRouter from 'react-mock-router';
import { Route } from 'react-router-dom';
import EventShowContainer from '../components/events/event_show_container';
import EventShow from '../components/events/event_show';
import { mount } from 'enzyme';
import * as EventActions from '../actions/event_actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const event = {
  id: 1,
  description: "Description",
  date: "2017-01-11"
};
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore({ events: { [event.id]: event } });

describe('event show', () => {
  let eventShowWrapper;

  beforeEach(() => {
    EventActions.requestEvent = jest.fn(() => dispatch => {});
    const testParams = { eventId: event.id };

    eventShowWrapper = mount(
      <MockRouter params={{eventId: event.id}}>
        <Route render={(props) => (
          <EventShowContainer {...props} store={testStore} />
        )}/>
      </MockRouter>
    ).find(EventShow);
  });

  it('correctly maps state to props', () => {
    expect(eventShowWrapper.props().event).toEqual(event);
  });

  it('correctly maps dispatch to props', () => {
    expect(eventShowWrapper.props().requestEvent).toBeDefined();
    expect(eventShowWrapper.props().requestEvent).toBeInstanceOf(Function);
  });

  it('fetches the appropriate event after being mounted', () => {
    expect(EventActions.requestEvent).toBeCalledWith(event.id);
  });

  it('contains the event\'s description', () => {
    const renderedText = eventShowWrapper.text();
    expect(renderedText).toContain(event.description);
  });

  it('contains the event\'s date', () => {
    const renderedText = eventShowWrapper.text();
    expect(renderedText).toContain(event.date);
  });

  it('has a link to the event index page', () => {
   const indexLink = eventShowWrapper.find('Link');

   expect(indexLink).toBeDefined();
   expect(indexLink.props().to).toEqual(`/`);
  });
});
