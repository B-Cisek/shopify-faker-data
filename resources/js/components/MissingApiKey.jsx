import {Layout, Page, Banner} from "@shopify/polaris"

const MissingApiKey = () => {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Banner title="Shopify API Key Is Missing" tone="critical">
                        Shopify API key is missing form the application!
                    </Banner>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default MissingApiKey;
