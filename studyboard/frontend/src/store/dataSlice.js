const { createSlice } =  require("@reduxjs/toolkit")

const dataSlice = createSlice({

  name: "user",
  initialState: {
    subList: [],
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

      
    },
    updateChapterCount(state, action) {
      const id = parseInt(action.payload, 10); // Convert to integer 
      const updatedSubList = state.subList.map(item => {
        if (item.id === id) {
        
          return { ...item, chapter_count: item.chapter_count + 1 };
        }
        return item;
      });
      return { ...state, subList: updatedSubList };
    },
    updateChapterCountDecrement(state, action) {
      const id = parseInt(action.payload, 10); // Convert to integer 
      
      const updatedSubList = state.subList.map(item => {
        if (item.id === id) {
          return { ...item, chapter_count: item.chapter_count - 1 };
        }
        return item;
      });
      return { ...state, subList: updatedSubList };
    }

    
  }

});

export const { add, remove, update, updateChapterCount, updateChapterCountDecrement  } = dataSlice.actions;
export const userReducer =  dataSlice.reducer;