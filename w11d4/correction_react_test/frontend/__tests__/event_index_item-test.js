/* globals jest */

import React from 'react';
import MockRouter from 'react-mock-router';
import EventIndexItem from '../components/events/event_index_item';
import { mount } from 'enzyme';

describe('event index item', () => {
  let event,
    eventIndexItemWrapper,
    deleteEvent,
    push;

  beforeEach(() => {
    event = {
      id: 1,
      description: "Description",
      date: "2017-01-11"
    };

    deleteEvent = jest.fn();
    push = jest.fn();

    const props = {
      deleteEvent,
      event
    };

    eventIndexItemWrapper = mount(
      <MockRouter push={push}>
        <EventIndexItem {...props} />
      </MockRouter>
    );
  });

  it('should be a function', () => {
    expect(typeof EventIndexItem).toEqual('function');
  });

  it('shows the event\'s description as a Link to the event\'s show page', () => {
    const showLink = eventIndexItemWrapper.find('Link').filterWhere(link =>
      link.props().to === `/events/${event.id}`
    );

    expect(showLink.props().children).toContain(`${event.description}`);
    expect(showLink.props().to).toEqual(`/events/${event.id}`);
  });

  it('has a link that links to the event edit page', () => {
    const editLink = eventIndexItemWrapper.find('Link').filterWhere(link =>
      link.props().to === `/events/${event.id}/edit`
    );

    expect(editLink.props().children).toEqual("Edit");
    expect(editLink.props().to).toEqual(`/events/${event.id}/edit`);
  });

  it('has a button to delete event', () => {
    const deleteButton = eventIndexItemWrapper.find('button')
    expect(deleteButton).toBeDefined();

    expect(deleteEvent).not.toHaveBeenCalled();
    deleteButton.simulate('click');
    expect(deleteEvent).toBeCalledWith(event.id);
  });
});
