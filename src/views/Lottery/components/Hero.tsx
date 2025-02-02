import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: #ffbd00;
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background-image: linear-gradient(139.73deg, #27262cb3 0%, #008611 100%);
  padding-bottom: 40px;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;

`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>

      <StyledContainer>
        <LeftWrapper>
          <Title>The Bernardo Lottery</Title>
          <Blurb>Buy tickets with $BONES</Blurb>
          <Blurb>{TranslateString(999, 'Win if 2, 3, or 4 of your ticket numbers match!')}</Blurb>
        </LeftWrapper>
        <RightWrapper>
          <LotteryProgress />
        </RightWrapper>
      </StyledContainer>
      <Wrapper>
        <img width="300px" src="/images/lottery_bernardo_swap.png" alt="ticket" />

      </Wrapper>
    </StyledHero>
  )
}

export default Hero
