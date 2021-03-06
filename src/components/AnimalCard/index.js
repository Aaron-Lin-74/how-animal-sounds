import React from 'react'
import { FcSpeaker } from 'react-icons/fc'
import styled from 'styled-components'
import { Fade } from 'react-awesome-reveal'
import useAudio from '../../hooks/useAudio'

function AnimalCard({ name, imageURL, audioURL, link, showMini }) {
  const { playing, toggle, stopPlaying } = useAudio(audioURL)

  return (
    <Fade>
      <Container
        role='button'
        onClick={toggle}
        onKeyDown={toggle}
        onMouseLeave={stopPlaying}
      >
        <img
          className={`${showMini ? 'animal-img-mini' : 'animal-img'}`}
          src={imageURL}
          alt={`Click ${name} to make sound`}
        />
        {!showMini && (
          <FooterContainer>
            <a
              className='animal-link'
              href={link}
              target='_blank'
              rel='noreferrer'
            >
              Learn
              {name}
              {playing && <FcSpeaker />}
            </a>
          </FooterContainer>
        )}
      </Container>
    </Fade>
  )
}

export default AnimalCard

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: var(--backgroundColor);
  font-size: 1rem;
  color: #fff;
  box-shadow: var(--lightShadow);
  height: 100%;
  width: 100%;
  border-radius: var(--mainBorderRadius);
  transition: all 500ms;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  animation: cardEntrance 1s ease-in;
  animation-fill-mode: backwards;

  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: scale(0.2);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:hover {
    box-shadow: 0 0.35em 1.75em rgba(2, 8, 20, 0.1),
      0 0.175em 0.5em rgba(2, 8, 20, 0.08);
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: #fff;
    text-decoration: none;
    text-transform: capitalize;
    margin: 0.5rem;
  }
`
