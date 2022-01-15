import React from 'react'
import { useGlobalContext } from '../context'
import styled from 'styled-components'
import load from '../resources/gifs/loading2.gif'
import Card from './Card'
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcProcess,
  FcGrid,
} from 'react-icons/fc'

const Gallery = () => {
  const {
    animals,
    sortAnimals,
    sortAnimalsDesc,
    shuffleAnimals,
    showMini,
    toggleMini,
    loading,
  } = useGlobalContext()

  return (
    <GalleryContainer>
      <BtnsContainer>
        <Button onClick={sortAnimals}>
          <FcAlphabeticalSortingAz />
          Sort A-Z{' '}
        </Button>
        <Button onClick={sortAnimalsDesc}>
          <FcAlphabeticalSortingZa />
          Sort Z-A{' '}
        </Button>
        <Button onClick={shuffleAnimals}>
          <FcProcess />
          Shuffle
        </Button>
        <Button onClick={toggleMini}>
          <FcGrid />
          {showMini ? 'Normal' : 'Mini'}
        </Button>
      </BtnsContainer>
      <div className={`${showMini ? 'card-grid-mini' : 'card-grid'}`}>
        {loading ? (
          <Loading>
            <ImgContainer>
              <Image src={load} alt='loading...' />
            </ImgContainer>
          </Loading>
        ) : (
          animals.map((animal) => {
            return (
              <Card
                key={Math.random()}
                name={animal.name}
                imageURL={animal.imageURL}
                audioURL={animal.audioURL}
                link={animal.link}
              />
            )
          })
        )}
      </div>
    </GalleryContainer>
  )
}

export default Gallery

const GalleryContainer = styled.div`
  position: relative;
  margin-top: 100px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  padding: 0 2rem;
  min-height: 100vh;
  background: var(--backgroundColor);
`
const BtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--backgroundColor);
`

const Button = styled.button`
  padding: 12px;
  font-size: 1.5rem;
  background: var(--backgroundColor);
  color: #fff;
  width: 150px;
  height: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;

  &:hover {
    background: rgb(19, 19, 19);
  }
`
const Loading = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  object-fit: cover;
  object-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(195, 195, 197, 0.6);
`
const ImgContainer = styled.div`
  width: 40vw;
  max-width: 300px;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
`
