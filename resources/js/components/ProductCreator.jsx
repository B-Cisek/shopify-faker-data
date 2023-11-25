import {Button, FormLayout, Layout, RangeSlider} from "@shopify/polaris";
import {useCallback, useState} from "react";
import useAxios from '../hooks/useAxios.js'
import ValidationErrorBanner from "./ValidationErrorBanner.jsx";

const ProductCreator = () => {
    const {axios} = useAxios()
    const [options, setOptions] = useState({count: 5})
    const [errors, setErrors] = useState([])
    const [creatingProducts, setCreatingProducts] = useState(false)

    const createFakeProduct = useCallback(() => {
        setCreatingProducts(true)

        axios.post('/products', options)
            .then(res => {
                setErrors([])
                console.log(res)
            })
            .catch(error => {
                if (error?.response?.status === 422) {
                    setErrors(Object.values(error.response.data.errors || {}).flatMap(errors => errors))
                }
            })
            .finally(() => {
                setCreatingProducts(false)
            })
    }, [options])

    const handleProductCountChange = useCallback(
        value => setOptions(prevOptions => ({...prevOptions, count: value})),
        []
    )

    return (
        <Layout>
            <Layout.Section>
                <FormLayout>
                    <RangeSlider
                        output
                        label="Number of Products"
                        min={5}
                        max={100}
                        step={5}
                        value={options.count}
                        onChange={handleProductCountChange}
                    />
                    <Button
                        variant="primary"
                        size="large"
                        loading={creatingProducts}
                        onClick={createFakeProduct}>Create {options.count} Products
                    </Button>
                    {
                        errors.length &&
                        <ValidationErrorBanner
                            title="Failed to Create Fake Products!"
                            errors={errors}
                            onDismiss={() => setErrors([])}
                        />
                    }
                </FormLayout>
            </Layout.Section>
        </Layout>
    )
}

export default ProductCreator;
