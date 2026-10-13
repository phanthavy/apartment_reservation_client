import api from "@/config/axiosInstance";
import { apipath } from "@/constant/apiPath";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";

export type Apartment = {
  id: number;
  ownerId: number;
  title: string;
  area: string;
  type: "studio" | "one_bed" | "two_bed";
  beds: number;
  baths: number;
  sizeM2: number;
  // Prisma sends Decimal columns as strings
  rentMonth: string;
  deposit: string;
  amenities: string[];
  photos: string[];
  included: string[] | null;
  availableFrom: string | null;
  minStayMonths: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  isOpen: boolean;
  rating: number;
  createdAt: string;
};

export type ApartmentDraft = {
  // Cloudinary secure URLs
  photos: string[];
  title: string;
  area: string;
  sizeM2: string;
  beds: number;
  rentMonth: string;
  // ISO string, Redux state must stay serializable
  availableFrom: string | null;
  depositMonths: number | null;
  minStayMonths: number | null;
  included: string[];
  petsAllowed: boolean;
  smokingAllowed: boolean;
};

type ApartmentState = {
  draft: ApartmentDraft;
  myApartments: Apartment[];
  loading: boolean;
  publishing: boolean;
  error: string | null;
};

export const MAX_PHOTOS = 10;

const emptyDraft: ApartmentDraft = {
  photos: [],
  title: "",
  area: "",
  sizeM2: "",
  beds: 1,
  rentMonth: "",
  availableFrom: null,
  depositMonths: null,
  minStayMonths: null,
  included: [],
  petsAllowed: false,
  smokingAllowed: false,
};

const initialState: ApartmentState = {
  draft: emptyDraft,
  myApartments: [],
  loading: false,
  publishing: false,
  error: null,
};

const errorMessage = (error: any, fallback: string) =>
  error.response?.data?.message ?? fallback;

export const fetchMyApartments = createAsyncThunk(
  "apartment/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(apipath.myApartments);
      return res.data.data as Apartment[];
    } catch (error: any) {
      return rejectWithValue(errorMessage(error, "Failed to load apartments"));
    }
  },
);

export const publishApartment = createAsyncThunk(
  "apartment/publish",
  async (_, { getState, rejectWithValue }) => {
    const { draft } = (getState() as RootState).apartment;
    const rent = Number(draft.rentMonth);

    try {
      const res = await api.post(apipath.apartments, {
        title: draft.title,
        area: draft.area,
        beds: draft.beds,
        sizeM2: Number(draft.sizeM2) || 0,
        rentMonth: rent,
        deposit: (draft.depositMonths ?? 0) * rent,
        included: draft.included,
        availableFrom: draft.availableFrom,
        minStayMonths: draft.minStayMonths ?? 1,
        petsAllowed: draft.petsAllowed,
        smokingAllowed: draft.smokingAllowed,
        amenities: [],
        photos: draft.photos,
      });
      return res.data.data as Apartment;
    } catch (error: any) {
      return rejectWithValue(errorMessage(error, "Failed to publish apartment"));
    }
  },
);

export const setApartmentOpen = createAsyncThunk(
  "apartment/setOpen",
  async (
    { id, isOpen }: { id: number; isOpen: boolean },
    { rejectWithValue },
  ) => {
    try {
      const res = await api.patch(apipath.apartmentStatus(id), { isOpen });
      return res.data.data as Apartment;
    } catch (error: any) {
      return rejectWithValue(errorMessage(error, "Failed to update listing"));
    }
  },
);

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    updateDraft: (state, action: PayloadAction<Partial<ApartmentDraft>>) => {
      state.draft = { ...state.draft, ...action.payload };
    },
    addPhoto: (state, action: PayloadAction<string>) => {
      if (state.draft.photos.length < MAX_PHOTOS) {
        state.draft.photos.push(action.payload);
      }
    },
    removePhoto: (state, action: PayloadAction<string>) => {
      state.draft.photos = state.draft.photos.filter(
        (url) => url !== action.payload,
      );
    },
    resetDraft: (state) => {
      state.draft = emptyDraft;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.myApartments = action.payload;
      })
      .addCase(fetchMyApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(publishApartment.pending, (state) => {
        state.publishing = true;
        state.error = null;
      })
      .addCase(publishApartment.fulfilled, (state, action) => {
        state.publishing = false;
        state.myApartments = [action.payload, ...state.myApartments];
        state.draft = emptyDraft;
      })
      .addCase(publishApartment.rejected, (state, action) => {
        state.publishing = false;
        state.error = action.payload as string;
      })
      .addCase(setApartmentOpen.pending, (state, action) => {
        const { id, isOpen } = action.meta.arg;
        const apt = state.myApartments.find((a) => a.id === id);
        if (apt) apt.isOpen = isOpen;
      })
      .addCase(setApartmentOpen.rejected, (state, action) => {
        const { id, isOpen } = action.meta.arg;
        const apt = state.myApartments.find((a) => a.id === id);
        if (apt) apt.isOpen = !isOpen;
        state.error = action.payload as string;
      });
  },
});

export const { updateDraft, resetDraft, addPhoto, removePhoto } =
  apartmentSlice.actions;
export default apartmentSlice.reducer;
