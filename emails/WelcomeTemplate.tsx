import React from 'react'
import {
  Html,
  Body,
  Container,
  Text,
  Preview
} from '@react-email/components'

const WelcomeTemplate = ({name }: {name: string}) => {
  return <Html>
    <Preview>welcome abord</Preview>
    <Body>
        <Container>
            <Text>Hello World</Text>
        </Container>
    </Body>
  </Html>
}

export default WelcomeTemplate
