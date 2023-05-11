import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  togleHowItWorks: false,
  toglePayoutSructure: false,
  togleTokenAndGovernance: false,
  togleIWantTheSameDApp: false,
  togleDisclaimer: false,
}

const adminSlice = createSlice({
  name: 'navigate',
  initialState,
  reducers: {
    checkHowItWorks: (state, action) => {
      state.togleHowItWorks =  action.payload;
      state.toglePayoutSructure = false;
      state.togleTokenAndGovernance = false;
      state.togleIWantTheSameDApp = false;
      state.togleDisclaimer = false;
      
    },

    checkPayoutSructure: (state, action)  => {
      state.togleHowItWorks = false;
      state.toglePayoutSructure =  action.payload;
      state.togleTokenAndGovernance = false;
      state.togleIWantTheSameDApp = false;
      state.togleDisclaimer = false;
    },

    checkTokenAndGovernance: (state, action) => {
      state.togleHowItWorks = false;
      state.toglePayoutSructure = false;
      state.togleTokenAndGovernance =  action.payload;
      state.togleIWantTheSameDApp = false;
      state.togleDisclaimer = false;
    },

    checkIWantTheSameDApp: (state, action) => {
      state.togleHowItWorks = false;
      state.toglePayoutSructure = false;
      state.togleTokenAndGovernance = false;
      state.togleIWantTheSameDApp =  action.payload;
      state.togleDisclaimer= false;
    },
    checkDisclaimer: (state, action)  => {
      state.togleHowItWorks = false;
      state.toglePayoutSructure = false;
      state.togleTokenAndGovernance = false;
      state.togleIWantTheSameDApp = false;
      state.togleDisclaimer =  action.payload;
    },   
   
  }
})

export const {
  checkHowItWorks,
  checkPayoutSructure,
  checkTokenAndGovernance,
  checkIWantTheSameDApp,
  checkDisclaimer,
} = adminSlice.actions

export default adminSlice.reducer
