<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Jobs\CreateProducts;
use App\Jobs\DeleteProducts;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function __construct(private readonly ResponseFactory $responseFactory)
    {
    }

    public function store(CreateProductRequest $request): Response
    {
        $data = $request->validated();

        CreateProducts::dispatch($data['count'], $request->user());

        return $this->responseFactory->noContent();
    }

    public function destroy(Request $request): Response
    {
        DeleteProducts::dispatch($request->user());

        return $this->responseFactory->noContent();
    }
}
