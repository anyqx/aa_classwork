/* globals jest */

import * as EventActions from '../actions/event_actions';
import React from 'react';
import MockRouter from 'react-mock-router';
import { Route } from 'react-router-dom';
import CreateEventFormContainer from '../components/events/create_event_form_container';
import EditEventFormContainer from '../components/events/edit_event_form_container';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, configure } from 'enzyme';
import EventForm from '../components/events/event_form';

const testEvent = {
  id: 1,
  description: "apply to app academy",
  date: "2016-01-17"
};
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const testStore = mockStore({ events: { 1: testEvent } });

describe('event form container', () => {
  let eventFormWrapper,
      descriptionInput,
      newEvent,
      dateInput,
      push;

  beforeEach(() => {
    EventActions.updateEvent = jest.fn((updatedEvent) => dispatch => {
      return Promise.resolve(updatedEvent);
    });
    EventActions.createEvent = jest.fn(event => dispatch => {
      return Promise.resolve(event);
    })
    EventActions.requestEvent = jest.fn(id => dispatch => {});
    push = jest.fn();
  });

  describe('creating a new event', () => {
    beforeEach(() => {
      eventFormWrapper = mount(
          <MockRouter>
            <Route render={(props) => (
              <CreateEventFormContainer {...props} store={testStore} />
            )}/>
          </MockRouter>
      ).find(EventForm);

      descriptionInput = eventFormWrapper.find('input').filterWhere(input => (
        input.props().type === 'text'
      ));
      dateInput = eventFormWrapper.find('input').filterWhere(input => (
        input.props().type === 'date'
      ));
      newEvent = { description: "Walk cat", date: "2017-01-15" };
    });

    it('correctly maps state to props', () => {
      expect(eventFormWrapper.props().event).toEqual({
        description: '', date: ''
      });
      expect(eventFormWrapper.props().formType).toEqual('Create Event');
    });

    it('correctly maps dispatch to props', () => {
      expect(eventFormWrapper.props().submitEvent).toBeDefined();
      expect(eventFormWrapper.props().submitEvent).toBeInstanceOf(Function);
    });

    it('should contain text indicating it is the create form', () => {
      const renderedText = eventFormWrapper.text();
      expect(renderedText).toContain('Create Event');
    });

    it('pre-fills description and date input fields with empty string', () => {
      expect(descriptionInput.props().value).toEqual('');
      expect(dateInput.props().value).toEqual('');
    });


    it('updates the description field when it changes', () => {
      descriptionInput.prop('onChange')({
        currentTarget: { value: 'Call doctor' },
        target: { value: 'Call doctor' }
      });

      // Update wrapper and re-find description input
      let updatedWrapper = eventFormWrapper.update();
      descriptionInput = updatedWrapper.find('input').filterWhere(input => (
        input.props().type === 'text'
      ));

      // Assert that state was updated on component and that description input value changed
      expect(eventFormWrapper.state().description).toEqual('Call doctor');
      expect(descriptionInput.props().value).toEqual('Call doctor');
    });

    it('updates the date field when it changes', () => {
      dateInput.prop('onChange')({
        currentTarget: { value: '2019-10-31' },
        target: { value: '2019-10-31' }
      });

      // Update wrapper and re-find date input
      let updatedWrapper = eventFormWrapper.update();
      dateInput = updatedWrapper.find('input').filterWhere(input => (
        input.props().type === 'date'
      ));;

      // Assert that state was updated on component and that date input value changed
      expect(eventFormWrapper.state().date).toEqual('2019-10-31');
      expect(dateInput.props().value).toEqual('2019-10-31');
    });

    it('triggers the correct action when submitted', () => {
      descriptionInput.prop('onChange')({
        currentTarget: { value: newEvent.description },
        target: { value: newEvent.description }
      });
      dateInput.prop('onChange')({
        currentTarget: { value: newEvent.date },
        target: { value: newEvent.date }
      });

      eventFormWrapper.find('form').simulate('submit');
      expect(EventActions.createEvent).toBeCalledWith(newEvent);
    });
  });

  describe('updating an existing event', () => {
    beforeEach(() => {
      eventFormWrapper = mount(
          <MockRouter params={{eventId: 1}} >
            <Route render={(props) => (
              <EditEventFormContainer {...props} store={testStore} />
            )}/>
          </MockRouter>
      ).find(EventForm);

      descriptionInput = eventFormWrapper.find('input').filterWhere(input => (
        input.props().type === 'text'
      ));
      dateInput = eventFormWrapper.find('input').filterWhere(input => (
        input.props().type === 'date'
      ));
      newEvent = { description: "Walk cat", date: "2017-01-15", id: 1 };
    });

    it('correctly maps state to props', () => {
      expect(eventFormWrapper.props().event).toEqual(testEvent);
      expect(eventFormWrapper.props().formType).toEqual('Update Event');
    });

    it('correctly maps dispatch to props', () => {
      // Hint: fetch in EditEventForm!
      expect(eventFormWrapper.props().requestEvent).toBeUndefined();
      expect(eventFormWrapper.props().submitEvent).toBeDefined();
      expect(eventFormWrapper.props().submitEvent).toBeInstanceOf(Function);
    });

    it('should contain text indicating it is the edit form', () => {
      const renderedText = eventFormWrapper.text();
      expect(renderedText).toContain('Update Event');
    });

    it('fetches the appropriate event after being mounted', () => {
      expect(EventActions.requestEvent).toBeCalledWith(testEvent.id);
    });

    it('pre-fills description and date input fields with event data from the store', () => {
      expect(descriptionInput.props().value).toEqual(testEvent.description);
      expect(dateInput.props().value).toEqual(testEvent.date);
    });

    it('triggers the correct action when submitted', () => {
      descriptionInput.prop('onChange')({
        currentTarget: { value: newEvent.description },
        target: { value: newEvent.description }
      });

      dateInput.prop('onChange')({
        currentTarget: { value: newEvent.date },
        target: { value: newEvent.date }
      });

      eventFormWrapper.find('form').simulate('submit');
      expect(EventActions.updateEvent).toBeCalledWith(newEvent);
    });
  });
});
