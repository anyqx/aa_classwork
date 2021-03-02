/* globals jest */

import {
  fetchEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  createEvent
} from '../util/event_api_util';

describe('the api util', () => {
  beforeEach(() => {
    global.$ = require.requireMock('jquery');
    global.$.ajax = jest.fn(options => "ajax promise");
  });

  afterEach(() => {
    global.$.ajax.mockClear();
  });

  it('fetchEvents makes request and returns an ajax promise', () => {
    const returnValue = fetchEvents();
    expect($.ajax).toBeCalled();

    // This line gets the first argument of the first call to $.ajax
    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toMatch(/^\/?api\/events\/?$/);
    expect(returnValue).toEqual("ajax promise");
  });

  it('fetchEvent makes request and returns an ajax promise', () => {
    const returnValue = fetchEvent(1);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toMatch(/^\/?api\/events\/1\/?$/);
    expect(returnValue).toEqual("ajax promise");
  });

  it('createEvent makes request and returns an ajax promise', () => {
    const event = { date: '2017-01-09', decription: 'Time to test!' };
    const returnValue = createEvent(event);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toMatch(/^\/?api\/events\/?$/);
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/post/i);
    expect(ajaxCallArg.data).toEqual({ event });
    expect(returnValue).toEqual("ajax promise");
  });

  it('updateEvent makes request and returns an ajax promise', () => {
    const event = { id: 10, description: 'Existing Event', date: '2016-10-10' };
    const returnValue = updateEvent(event);
    expect($.ajax).toBeCalled();

    const ajaxCallArg = $.ajax.mock.calls[0][0];
    expect(ajaxCallArg.url).toMatch(/^\/?api\/events\/10\/?$/);
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/patch/i);
    expect(ajaxCallArg.data).toEqual({ event });
    expect(returnValue).toEqual("ajax promise");
  });

  it('deleteEvent makes request and returns an ajax promise', () => {
    const returnValue = deleteEvent(15);
    expect($.ajax).toBeCalled();
    const ajaxCallArg = $.ajax.mock.calls[0][0];

    expect(ajaxCallArg.url).toMatch(/^\/?api\/events\/15\/?$/);
    expect(ajaxCallArg.type || ajaxCallArg.method).toMatch(/delete/i);
    expect(returnValue).toEqual("ajax promise");
  });
});
