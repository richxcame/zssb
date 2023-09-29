import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TPartner, TPartners } from '@/types/partner';

type SliceState = {
	partners: TPartners;
	partner?: TPartner;
};

const initialState: SliceState = {
	partners: [],
	partner: undefined,
};

const partnerSlice = createSlice({
	name: 'partners',
	initialState,
	reducers: {
		setPartners(state, action: PayloadAction<TPartners>) {
			state.partners = action.payload;
		},
		setPartner(state, action: PayloadAction<TPartner>) {
			state.partner = action.payload;
		},
	},
});

export const { setPartners, setPartner } = partnerSlice.actions;
export default partnerSlice.reducer;
