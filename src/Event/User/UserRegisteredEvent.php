<?php

namespace App\Event\User;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;

class UserRegisteredEvent extends Event
{
    public function __construct(public readonly User $user)
    {
    }
}
