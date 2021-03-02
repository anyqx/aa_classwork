/* globals jest */

import * as EventApiUtil from '../util/event_api_util';

import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  REMOVE_EVENT,
  requestEvents,
  requestEvent,
  createEvent,
  updateEvent,
  deleteEvent
} from '../actions/event_actions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('event actions', () => {
  describe('event constants', () => {
    it('should contain a RECEIVE_EVENTS constant', () => {
      expect(RECEIVE_EVENTS).toEqual('RECEIVE_EVENTS');
    });

    it('should contain a RECEIVE_EVENT constant', () => {
      expect(RECEIVE_EVENT).toEqual('RECEIVE_EVENT');
    });

    it('should contain a REMOVE_EVENT constant', () => {
      expect(REMOVE_EVENT).toEqual('REMOVE_EVENT');
    });
  });

  describe('thunks', () => {
    let store;

    beforeEach(() => {
      store = mockStore({ events: {} });
    });

    describe('requestEvents', () => {
      it('should export a requestEvents function', () => {
        expect(typeof requestEvents).toEqual('function');
      });

      it('dispatches RECEIVE_EVENTS when events have been requested', () => {
        const events = { 1: { id: 1, description: "Test", date: "2017-01-01"} };
        EventApiUtil.fetchEvents = jest.fn(() => (
          Promise.resolve(events)
        ));
        const expectedActions = [{ type: RECEIVE_EVENTS, events }];

        return store.dispatch(requestEvents()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('requestEvent', () => {
      it('should export a requestEvent function', () => {
        expect(typeof requestEvent).toEqual('function');
      });

      it('dispatches RECEIVE_EVENT when a single event has been requested', () => {
        const event = { id: 1, description: "Test", date: "2017-01-01" };
        EventApiUtil.fetchEvent = jest.fn(id => (Promise.resolve(event)));
        const expectedActions = [{ type: RECEIVE_EVENT, event }];

        return store.dispatch(requestEvent(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('createEvent', () => {
      it('should export a createEvent function', () => {
        expect(typeof createEvent).toEqual('function');
      });

      it('dispatches RECEIVE_EVENT when a event has been created', () => {
        const newEvent = { description: "Description", date: "2017-01-02" };
        EventApiUtil.createEvent = jest.fn((event) => (
          Promise.resolve(event)
        ));

        const returnedEvent = Object.assign(newEvent, { id: 1 });
        const expectedActions = [{ type: RECEIVE_EVENT, event: returnedEvent }];

        return store.dispatch(createEvent(newEvent)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('updateEvent', () => {
      it('should export an updateEvent function', () => {
        expect(typeof updateEvent).toEqual('function');
      });

      it('dispatches RECEIVE_EVENT when a event has been updated', () => {
        const updatedEvent = {
          description: "Updated Description",
          date: "2017-02-02",
          id: 2
        };
        EventApiUtil.updateEvent = jest.fn((updatedEvent) => (
          Promise.resolve(updatedEvent)
        ));

        const expectedActions = [{ type: RECEIVE_EVENT, event: updatedEvent }];

        return store.dispatch(updateEvent(updatedEvent)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });

    describe('deleteEvent', () => {
      it('should export a deleteEvent function', () => {
        expect(typeof deleteEvent).toEqual('function');
      });

      it('dispatches REMOVE_EVENT when a event has been deleted', () => {
        const event = { description: "Description", date: "2017-02-03", id: 3 };
        EventApiUtil.deleteEvent = jest.fn((eventId) => (
          Promise.resolve(event)
        ));
        const expectedActions = [{
          type: REMOVE_EVENT,
          eventId: event.id
        }];

        return store.dispatch(deleteEvent(event.id)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
