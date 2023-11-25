import {Provider} from "@shopify/app-bridge-react";
import {useState} from 'react'

const App = () => {
    const [appBridgeConfig] = useState(() => {
        const host = new URLSearchParams(location.search).get('host') || window.__SHOPIFY_HOST

        window.__SHOPIFY_HOST = host

            return {
                host,
                apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
                forceRedirect: true
            }
        }
    )

    return (
        <Provider config={appBridgeConfig}>
            <div>Hello React</div>
        </Provider>
    )
}

export default App;
