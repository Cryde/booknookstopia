<?php

namespace App\EventListener\User;

use App\Event\User\UserRegisteredEvent;
use App\Security\User\EmailVerifier;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Mime\Address;

#[AsEventListener]
readonly class UserRegisteredListener
{
    public function __construct(
        private EmailVerifier $emailVerifier
    ) {
    }

    public function __invoke(UserRegisteredEvent $event): void
    {
        $user = $event->user;

        $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
            (new TemplatedEmail())
                ->from(new Address('noreply@booknooks.com', 'Booknooks'))
                ->to((string) $user->getEmail())
                ->subject('Please Confirm your Email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );
    }
}
