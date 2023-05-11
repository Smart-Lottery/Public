
import {
  checkHowItWorks,
  checkPayoutSructure,
  checkTokenAndGovernance,
  checkIWantTheSameDApp,
  checkDisclaimer,
} from './navigateSlice';

export const handleHowItWorks =  (event) => dispatch => dispatch(checkHowItWorks(event)); 
      
export const handlePayoutSructure =  (event) => dispatch => dispatch(checkPayoutSructure(event));

export const handleTokenAndGovernance =  (event) => dispatch => dispatch(checkTokenAndGovernance(event));

export const handleIWantTheSameDApp =  (event) => dispatch => dispatch(checkIWantTheSameDApp(event));

export const handleDisclaimer =  (event) => dispatch => dispatch(checkDisclaimer(event));
