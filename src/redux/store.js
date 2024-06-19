import { legacy_createStore as createStore} from 'redux'
import rootReducer from './reducer'

console.log(rootReducer)
const store = createStore(rootReducer)
export default store;