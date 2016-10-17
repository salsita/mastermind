import { connect } from 'react-redux';

import LoadingSpinner from '../components/LoadingSpinner';
import * as LoadingSpinnerSelectors from '../selectors/loadingSpinnerSelectors';

const mapStateToProps = appState => ({
  loading: LoadingSpinnerSelectors.isLoading(appState)
});

export default connect(
  mapStateToProps
)(LoadingSpinner);
