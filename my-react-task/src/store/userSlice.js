import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return response.json();
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {
        deleteUser(state, action) {
            const id = action.payload;
            state.users = state.users.filter(user => user.id !== id);
        },
        updateUserDetails(state, action) {
            const { id, name, email } = action.payload;
            console.log(action.payload, 'aaaaa');
            const newUserList = state.users.map(user => {
                if (user.id === id) {
                  return { ...user, name, email };
                }
                return user;
              });
            state.users =  newUserList;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { updateUserDetails, deleteUser } = userSlice.actions;

export default userSlice.reducer;