<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateFakeDataRequest;
use App\Jobs\CreateCustomers;
use App\Jobs\CreateProducts;
use App\Jobs\DeleteCustomers;
use App\Jobs\DeleteProducts;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FakerController extends Controller
{
    public function __construct(private readonly ResponseFactory $responseFactory)
    {
    }

    public function store(CreateFakeDataRequest $request): Response
    {
        $data = $request->validated();
        $productsCount = $data['productsCount'] ?? 0;
        $customersCount = $data['customersCount'] ?? 0;
        $user = $request->user();

        if ($productsCount > 0) {
            CreateProducts::dispatch($productsCount, $user);
        }

        if ($customersCount > 0) {
            CreateCustomers::dispatch($customersCount, $user);
        }

        return $this->responseFactory->noContent();
    }

    public function destroy(Request $request): Response
    {
        $user = $request->user();

        DeleteProducts::dispatch($user);
        DeleteCustomers::dispatch($user);

        return $this->responseFactory->noContent();
    }
}
