export const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem("reduxStore")
      if (!serializedState) return undefined;
      else return JSON.parse(serializedState)
    } catch(err) {
      return undefined
    }
  };
  
  export const saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem("reduxStore", serializedState)
    } catch(err) {
      console.log(err)
    }
  }