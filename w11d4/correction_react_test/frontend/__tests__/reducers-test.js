/* globals jest */

import EventsReducer from '../reducers/events_reducer';
import RootReducer from '../reducers/root_reducer';
import * as EventActions from '../actions/event_actions';
import { createStore } from 'redux';

describe('Reducers', () => {
  describe('EventsReducer', () => {
    let oldState;

    beforeEach(() => {
      oldState = { 1: 'oldState' }
    })

    it('exports a function', () => {
      expect(typeof EventsReducer).toEqual('function');
    });

    it('should initialize with an empty object as the default state', () => {
      expect(EventsReducer(undefined, {})).toEqual({});
    });

    it('should return the previous state if an action is not matched', () => {
      const newState = EventsReducer(oldState, { type: 'unmatchedtype' });
      expect(newState).toBe(oldState);
    });

    describe('handling the RECEIVE_EVENTS action', () => {
      let action,
        testEvents;

      beforeEach(() => {
        testEvents = { 1: 'testEvent1', 2: 'testEvent2' };
        action = {
          type: EventActions.RECEIVE_EVENTS,
          events: testEvents
        };
      });

      it('should replace the state with the action\'s events', () => {
        const state = EventsReducer(undefined, action);
        expect(state).toEqual(testEvents);
      });

      it('should not modify the old state', () => {
        let oldState = { 1: 'oldState' };
        EventsReducer(oldState, action);
        expect(oldState).toEqual({ 1: 'oldState' });
      });
    });

    describe('handling the RECEIVE_EVENT action', () => {
      let action,
        testEvent;

      beforeEach(() => {
        testEvent = { id: 1, description: 'testEvent', date: '2017-02-04' };
        action = {
          type: EventActions.RECEIVE_EVENT,
          event: testEvent
        };
      });

      it('should add the event to the state using the event id as a key', () => {
        let state = EventsReducer(undefined, action);
        expect(state[1]).toEqual(testEvent);
      });

      it('should not affect the other events in the state', () => {
        let oldState = { 2: 'oldState' };
        let state = EventsReducer(oldState, action);
        expect(state[2]).toEqual('oldState');
      });

      it('should not modify the old state', () => {
        let oldState = { 1: 'oldState' };
        EventsReducer(oldState, action);
        expect(oldState).toEqual({ 1: 'oldState' });
      });
    });

    describe('handling the REMOVE_EVENT action', () => {
      let action,
        testEvent;

      beforeEach(() => {
        testEvent = { id: 1, date: '2017-06-15', description: 'Birthday!' };
        action = {
          type: EventActions.REMOVE_EVENT,
          eventId: testEvent.id
        };
      });

      it('should remove the correct event from the state', () => {
        let state = EventsReducer({ 1: testEvent }, action);
        expect(typeof state[1]).toEqual('undefined');
      });

      it('should not affect the other events in the state', () => {
        let oldState = { 1: testEvent, 2: 'oldState' };
        let state = EventsReducer(oldState, action);
        expect(state[2]).toEqual('oldState');
      });

      it('should not modify the old state', () => {
        let oldState = { 1: testEvent, 2: 'oldState' };
        EventsReducer(oldState, action);
        expect(oldState).toEqual({ 1: testEvent, 2: 'oldState' });
      });
    });
  });

  describe('RootReducer', () => {
    let testStore;

    beforeAll(() => {
      testStore = createStore(RootReducer);
    });

    it('exports a function', () => {
      expect(typeof RootReducer).toEqual('function');
    });

    it('includes the EventsReducer under the key `events`', () => {
      const event = { id: 1, description: 'Root Reducer testing', date: '2017-01-10' };
      const action = { type: EventActions.RECEIVE_EVENT, event };
      testStore.dispatch(action);

      expect(testStore.getState().events).toEqual(EventsReducer({ [event.id]: event }, action));
    });
  });
});
