const { createSlice } =  require("@reduxjs/toolkit")

const dataSlice = createSlice({

  name: "user",
  initialState: [], 
  reducers: {
    add(state, action) {
      const updatedUserList = action.payload;
      return updatedUserList;
    },
    remove(state, action){
      const updatedUserList = action.payload;
      return updatedUserList;
    }

  }

});

export const { add, remove } = dataSlice.actions;
export const userReducer =  dataSlice.reducer;