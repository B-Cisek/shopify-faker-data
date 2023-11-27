import {Button, FormLayout, Frame, Layout, Page, RangeSlider, Toast} from "@shopify/polaris"
import {useCallback, useState} from "react"
import ValidationErrorBanner from "./ValidationErrorBanner"
import DeleteFakeDataButton from "./DeleteFakeDataButton"
import useGenerateFakeData from "../hooks/useGenerateFakeData.js";

const FakeDataCreator = () => {
    const [options, setOptions] = useState({
        productsCount: 0,
        customersCount: 0
    })
    const {
        generate,
        loading,
        errors,
        toastMessage,
        dismissToast,
        dismissErrors
    } = useGenerateFakeData()

    const handleCountChange = useCallback(
        (value, name) => setOptions(prevOptions => ({...prevOptions, [name]: value})),
        []
    )

    return (
        <Frame>
            <Page title="Generate Fake Data" primaryAction={<DeleteFakeDataButton/>}>
                <Layout>
                    <Layout.Section>
                        <FormLayout>
                            <RangeSlider
                                output
                                label={`Number of Products (${options.productsCount})`}
                                min={0}
                                max={100}
                                step={5}
                                value={options.productsCount}
                                onChange={handleCountChange}
                                id="productsCount"
                            />
                            <RangeSlider
                                output
                                label={`Number of Customers (${options.customersCount})`}
                                min={0}
                                max={100}
                                step={5}
                                value={options.customersCount}
                                onChange={handleCountChange}
                                id="customersCount"
                            />
                            <Button
                                variant="primary"
                                size="large"
                                loading={loading}
                                onClick={() => generate(options)}>Generate</Button>
                            {toastMessage && <Toast content={toastMessage} onDismiss={dismissToast}/>}
                            {
                                errors.length &&
                                <ValidationErrorBanner
                                    title="Failed to Generate Fake Data!"
                                    errors={errors}
                                    onDismiss={dismissErrors}
                                />
                            }
                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    )
}

export default FakeDataCreator;
