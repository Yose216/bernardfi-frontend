// @ts-nocheck

import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@pancakeswap-libs/uikit'

export interface ExpandableSectionButtonProps {
  onClick?: () => void,
  expanded?: boolean
  color?: string
  hideText?: string
  showText?: string
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded, color, hideText, showText }) => {
  return (
    <Wrapper aria-label="Hide or show expandable content" role="button" onClick={() => onClick()}>
      <Text color={color} bold>
        {expanded ? hideText : showText}
      </Text>
      {expanded ? <ChevronUpIcon color={color} /> : <ChevronDownIcon color={color} />}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
  color: "primary",
  hideText: "Hide",
  showText: "Details",
}

export default ExpandableSectionButton
