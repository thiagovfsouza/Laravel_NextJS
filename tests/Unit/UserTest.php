<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_user_creation()
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]);
        
        $this->assertEquals('Test User', $user->name);
        $this->assertMatchesRegularExpression('/^.+@\S+\.\S+$/', $user->email);
    }
}