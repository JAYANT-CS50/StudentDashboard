const { createSlice } =  require("@reduxjs/toolkit")

const dataSlice = createSlice({

  name: "user",
  initialState: {
    subList: []
  }, 
  reducers: {
    add(state, action) {
      const updatedSubList = state.subList.concat(action.payload);
      return {...state, subList: updatedSubList}
    },
    remove(state, action) {
      const updatedSubList = state.subList.filter(item => item.id !== action.payload.id);
      return {...state, subList: updatedSubList};

    },
    update(state, action) {
      const updatedSubList = state.subList.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload }; // Update the matching item with new data
        }
        return item; // Keep other items unchanged
      });
      return {...state, subList: updatedSubList};

      
    }
  }

});

export const { add, remove, update} = dataSlice.actions;
export const userReducer =  dataSlice.reducer;