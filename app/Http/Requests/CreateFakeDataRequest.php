<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFakeDataRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'productsCount' => [
                'nullable',
                'integer',
                'min:0',
                'max:100',
                /** One of fields is require */
                function (string $attribute, mixed $value, \Closure $fail) {
                    if ($value <= 0 && $this->get('customersCount') <= 0) {
                        $fail('Slide either Number of Products or Customer to at least 5 to proceed.');
                    }
                }
            ],
            'customersCount' => ['nullable', 'integer', 'min:0', 'max:100']
        ];
    }
}
