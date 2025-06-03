<?php

namespace Tests\Unit;

use App\Models\Client;
use Tests\TestCase;

class ClientTest extends TestCase
{
    public function test_client_creation()
    {
        $client = Client::factory()->create([
            'name' => 'Client Test',
            'email' => 'client@test.com',
            'phone' => '11999999999'
        ]);

        $this->assertEquals('Client Test', $client->name);
        $this->assertMatchesRegularExpression('/^.+@\S+\.\S+$/', $client->email);
        $this->assertMatchesRegularExpression('/^\d{11}$/', $client->phone);
    }

    public function test_required_fields()
    {
        $this->expectException('Illuminate\Database\QueryException');

        Client::factory()->create([
            'name' => null,
            'email' => null
        ]);
    }
}
