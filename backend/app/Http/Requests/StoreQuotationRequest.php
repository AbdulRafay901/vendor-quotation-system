<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreQuotationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return  true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'date'         => 'nullable|date',
            'vendor_ids'   => 'required|array|min:1',
            'vendor_ids.*' => 'exists:vendors,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'       => 'Title is required.',
            'description.required' => 'Description is required.',
            'vendor_ids.required'  => 'Select at least one vendor.',
            'vendor_ids.min'       => 'Select at least one vendor.',
            'vendor_ids.*.exists'  => 'One or more selected vendors are invalid.',
        ];
    }
}
