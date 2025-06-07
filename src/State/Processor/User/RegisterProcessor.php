<?php

namespace App\State\Processor\User;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\ApiResource\User\Register;
use App\Entity\User;
use App\Event\User\UserRegisteredEvent;
use App\Exception\User\UserAlreadyLoggedException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

readonly class RegisterProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $userPasswordHasher,
        private Security $security,
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    /**
     * @param Register $data
     *
     * @throws UserAlreadyLoggedException
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($this->security->getUser()) {
            throw new UserAlreadyLoggedException('Already connected');
        }

        $user = new User()
            ->setUsername($data->username)
            ->setEmail($data->email)
            ->setPassword($data->password);

        $user->setPassword($this->userPasswordHasher->hashPassword($user, $data->password));

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        $this->eventDispatcher->dispatch(new UserRegisteredEvent($user));
    }
}
