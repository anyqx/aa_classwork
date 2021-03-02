import React from 'react';
import { Route, Switch } from 'react-router-dom';
import EventIndexContainer from './events/event_index_container';
import EventShowContainer from './events/event_show_container';
import EditEventFormContainer from './events/edit_event_form_container';
import CreateEventFormContainer from './events/create_event_form_container';

// NB: this file is complete - you do not to write/edit anything!
const App = ({ children }) => (
  <div>
    <h2>Agenda</h2>
    <Switch>
      <Route exact path="/" component={EventIndexContainer} />
      <Route path="/events/new" component={CreateEventFormContainer} />
      <Route exact path="/events/:eventId" component={EventShowContainer} />
      <Route path="/events/:eventId/edit" component={EditEventFormContainer} />
    </Switch>
  </div>
);

export default App;
