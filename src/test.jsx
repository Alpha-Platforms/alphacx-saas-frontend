import React, { useState } from 'react'
import Layout from './components/Layout'
export default function Index(props) {
    let BrowserRoter = props.history.push
    let CurrentRoute = props.location.pathname
    const [activeTab, setActiveTab] = useState("Deposit")
    return (
        <div>
            <Layout CurrentRoute={CurrentRoute} BrowserRoter={BrowserRoter} >
                <h1>Body Sec</h1>
            </Layout>

        </div>
    )
}
