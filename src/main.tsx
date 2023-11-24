import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AppProvider} from "@component/context";

ReactDOM.createRoot(document.getElementById('root')!).render(
        <AppProvider>
            <App/>
        </AppProvider>
)
