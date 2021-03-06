import React from 'react'
import styled from 'styled-components'
import { setAnimalType, useGlobalContext } from '../../contexts/AppContext'

function Viewers() {
  const { dispatch } = useGlobalContext()
  return (
    <Container>
      <Wrap onClick={() => dispatch(setAnimalType(''))} aniType='all'>
        <img src='/images/all.png' alt='all animals' />
      </Wrap>
      <Wrap onClick={() => dispatch(setAnimalType('mammal'))} aniType='mammals'>
        <img src='/images/mammal.png' alt='mammal' />
      </Wrap>
      <Wrap onClick={() => dispatch(setAnimalType('bird'))} aniType='birds'>
        <img src='/images/bird.png' alt='bird' />
      </Wrap>
      <Wrap
        onClick={() => dispatch(setAnimalType('amphibian'))}
        aniType='amphibians'
      >
        <img src='/images/amphibian.png' alt='amphibian' />
      </Wrap>
      <Wrap
        onClick={() => dispatch(setAnimalType('reptile'))}
        aniType='reptiles'
      >
        <img src='/images/reptile.png' alt='reptile' />
      </Wrap>
      <Wrap onClick={() => dispatch(setAnimalType('insect'))} aniType='insects'>
        <img src='/images/insect.png' alt='insect' />
      </Wrap>
    </Container>
  )
}

export default Viewers

const Container = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-top: 35px;
  padding: 30px 0 25px;

  @media (max-width: 480px) {
    min-width: 320px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 5px;
    margin-top: 5px;
  }
`

const Wrap = styled.div`
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
    rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;
  transition: all 250ms ease-in;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
    transform: scale(0.8);
  }

  &:hover {
    transform: scale(1.05);
    border: 3px solid rgba(249, 249, 249, 0.8);
    box-shadow: rgba(229, 229, 229, 0.69) 0px 26px 30px -10px,
      rgba(229, 229, 229, 0.73) 0px 16px 10px -10px;

    img {
      opacity: 0.2;
    }
  }

  &:hover::after {
    content: '${(props) => props.aniType}';
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    bottom: 0;
    font-size: 25px;
    font-weight: 400;
    text-transform: uppercase;

    @media (max-width: 480px) {
      font-size: 15px;
      font-weight: 200;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: #fff;
    transform: skewX(45deg) translateX(280%);
    transition: all 250ms ease-in;
  }

  &:hover::before {
    transform: skewX(45deg) translateX(-280%);
  }
`
