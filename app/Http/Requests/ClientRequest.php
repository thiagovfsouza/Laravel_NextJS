<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        $client = $this->route('client');
        $emailRule = 'required|email|max:255';

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $emailRule .= "|unique:clients,email,{$client->id},id";
        } else {
            $emailRule .= '|unique:clients,email';
        }

        return [
            'name' => 'required|string|max:255',
            'email' => $emailRule,
            'phone' => 'required|string|max:20|regex:/^[0-9()\- ]+$/',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     */
    public function messages()
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo email deve ser um endereço válido.',
            'email.unique' => 'Este email já está sendo usado por outro cliente.',
            'telefone.required' => 'O campo telefone é obrigatório.',
            'telefone.regex' => 'O telefone deve conter apenas números, espaços, parênteses ou hífens.',
        ];
    }
}
