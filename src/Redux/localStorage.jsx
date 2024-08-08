// // src/utils/localStorage.js

// export const loadState = () => {
//     try {
//       const serializedState = localStorage.getItem('auth');
//       if (serializedState === null) {
//         return undefined;
//       }
//       return JSON.parse(serializedState);
//     } catch (err) {
//       console.error('Could not load state', err);
//       return undefined;
//     }
//   };
// src/utils/localStorage.js

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('auth');
      if (serializedState === null) {
        return undefined;
      }
      return { auth: JSON.parse(serializedState) }; // Return in the correct structure
    } catch (err) {
      console.error('Could not load state', err);
      return undefined;
    }
  };
  
  
//   export const saveState = (state) => {
//     try {
//       const serializedState = JSON.stringify(state);
//       localStorage.setItem('auth', serializedState);
//     } catch (err) {
//       console.error('Could not save state', err);
//     }
//   };

// src/utils/localStorage.js

export const saveState = (authState) => {
    try {
      const serializedState = JSON.stringify(authState);
      localStorage.setItem('auth', serializedState);
    } catch (err) {
      console.error('Could not save state', err);
    }
  };
  
  