import { connect } from 'react-redux';

import OnlineUsers from '../components/OnlineUsers';
import * as OnlineUsersSelectors from '../selectors/onlineUsersSelectors';

const mapStateToProps = appState => ({
  users: OnlineUsersSelectors.getOnlineUsers(appState)
});

export default connect(
  mapStateToProps
)(OnlineUsers);
