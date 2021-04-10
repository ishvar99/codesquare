import TextEditor from './components/TextEditor/TextEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import './App.css';
import CodeCell from './components/CodeCell/CodeCell';
import { Provider } from 'react-redux';
import store from './redux/store'
const App =()=> {

  return (
    <Provider store={store}>
    <div>
     {/* <CodeCell/> */}
     <TextEditor/>
    </div>
    </Provider>
  );
}

export default App;
