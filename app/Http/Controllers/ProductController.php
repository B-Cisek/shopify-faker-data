<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Models\FakeProduct;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Osiset\ShopifyApp\Contracts\ShopModel;

class ProductController extends Controller
{
    const PRODUCT_CREATE = '/admin/api/2023-10/products.json';

    public function __construct(private readonly ResponseFactory $responseFactory)
    {
    }

    public function store(CreateProductRequest $request): Response
    {
        $data = $request->validated();
        $count = $data['count'];
        $products = [];

        /** @var ShopModel $shop */
        $shop = $request->user();

        for ($i = 0; $i < $count; $i++) {
            $productResource = [
                'body_html' => 'Product Description ' . $i,
                'title' => 'Product Title ' . $i
            ];

            $response = $shop->api()->rest(
                'POST',
                self::PRODUCT_CREATE,
                ['product' => $productResource]
            );

            if (! empty($response['errors'])) {
                throw $response['exception'];
            }

            $products[] = ['product_id' => $response['body']['product']['id']];
        }

        $shop->fakeProducts()->createMany($products);

        return $this->responseFactory->noContent();
    }

    public function destroy(Request $request): Response
    {
        $shop = $request->user();

        $shop->fakeProducts()->each(function (FakeProduct $fakeProduct) use ($shop) {
            $response = $shop->api()->rest(
                'DELETE',
                '/admin/api/2023-10/products/' . $fakeProduct->product_id . '.json'
            );

            if (empty($response['errors']) || $response['status'] === 404) {
                $fakeProduct->delete();
            } else {
                report($response['exception']);
            }
        });

        return $this->responseFactory->noContent();
    }
}
