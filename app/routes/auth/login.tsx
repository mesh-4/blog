import type { ActionFunction, LoaderFunction } from 'remix'
import { json, Form, useLoaderData, useTransition } from 'remix'
import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  Button,
  VStack,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'

import { authenticator, supabaseStrategy } from '~/utils/auth.server'
import { sessionStorage } from '~/utils/session.server'

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate('sb', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
}

interface LoaderData {
  error: { message: string } | null
}

export const loader: LoaderFunction = async ({ request }) => {
  await supabaseStrategy.checkSession(request, {
    successRedirect: '/dashboard',
  })

  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  const error = session.get(
    authenticator.sessionErrorKey
  ) as LoaderData['error']

  return json<LoaderData>({ error })
}

export default function Auth() {
  const transition = useTransition()
  const loaderData = useLoaderData<LoaderData>()

  return (
    <Flex
      w="95%"
      maxW="375px"
      h="100vh"
      mx="auto"
      align="center"
      justify="center"
      flexDir="column"
    >
      <VStack as={Form} w="full" method="post">
        <VStack as="fieldset" w="full" spacing={2}>
          <Heading as="legend" size="md">
            Welcome back
          </Heading>

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              w="full"
              id="email"
              size="sm"
              name="email"
              type="email"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              w="full"
              size="sm"
              name="password"
              type="password"
              required
              minLength={8}
            />
          </FormControl>

          <Button
            type="submit"
            w="full"
            size="sm"
            isLoading={
              transition.state === 'submitting' ||
              transition.state === 'loading'
            }
          >
            Login
          </Button>

          {loaderData.error && (
            <Box w="full" p={2} bg="red.100">
              <Text>{loaderData.error.message}</Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Flex>
  )
}
