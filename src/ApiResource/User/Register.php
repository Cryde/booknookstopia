<?php

namespace App\ApiResource\User;

use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model\Operation;
use App\Entity\User;
use App\State\Processor\User\RegisterProcessor;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[Post(
    uriTemplate: '/users/register',
    openapi: new Operation(tags: ['Users']),
    name: 'api_users_register',
    processor: RegisterProcessor::class,
)]
#[UniqueEntity(fields: ['username'], message: 'Username already taken', entityClass: User::class)]
#[UniqueEntity(fields: ['email'], message: 'Email already used', entityClass: User::class)]
class Register
{
    #[Assert\NotBlank(message: 'Please provide an username')]
    #[Assert\Regex(pattern: '/^[a-zA-Z0-9\._]+$/', message: 'Invalid username: only letters, numbers, dots, and underscores are allowed.')]
    #[Assert\Length(min: 3, max: 40, minMessage: 'Username must be at least 3 characters', maxMessage: 'Username must be at most 40 characters')]
    public string $username;
    #[Assert\NotBlank(message: 'Please enter an email')]
    #[Assert\Email(message: 'Invalid email')]
    public string $email;
    #[Assert\NotBlank(message: 'Please enter a password')]
    #[Assert\Length(min: 6, minMessage: 'Password must be at least 6 characters')]
    public string $password;
}
